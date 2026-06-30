import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

/**
 * Handles POST requests to /api/contact.
 * Validates form input data, then forwards the message details to EmailJS
 * REST API to deliver an email notification to seecopowerltd@gmail.com.
 *
 * @param request - The incoming HTTP Request object containing JSON data.
 * @returns A NextResponse representing success or failure of the email transmission.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, mobile, subject, title, message } = data;

    // Support both subject and title to match frontend and EmailJS naming variations
    const finalSubject = subject || title;

    // Server-side validation: ensure all required fields are present
    // to prevent empty or malicious submissions.
    if (!name || !email || !finalSubject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Save submission to database if configured
    try {
      await executeQuery(
        "INSERT INTO inquiries (name, email, mobile, subject, message) VALUES (?, ?, ?, ?, ?)",
        [name, email, mobile || null, finalSubject, message]
      );
      console.log("Contact submission logged to MySQL database.");
    } catch (dbErr) {
      console.error("Failed to log contact submission to MySQL database:", dbErr);
    }

    // Email format validation: verify address structure conforms to standard patterns.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Retrieve credentials from environment variables.
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    // Log a warning if credentials are unset or are placeholders, but do not crash.
    // This allows the server to run locally during development even before configuration.
    const isConfigMissingOrPlaceholder =
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId.includes("placeholder") ||
      templateId.includes("placeholder") ||
      publicKey.includes("placeholder");

    if (isConfigMissingOrPlaceholder) {
      console.warn(
        "WARNING: EmailJS environment variables are not configured. Submission logged to console instead:",
        {
          name,
          email,
          mobile: mobile || "Not provided",
          subject,
          message,
        }
      );

      // Return a 200 status during development/testing with placeholders,
      // informing the caller that the mock step succeeded.
      return NextResponse.json(
        {
          message: "Contact form submitted successfully (development mock). Please configure environment variables for real email dispatch.",
        },
        { status: 200 }
      );
    }

    // Prepare payload matching EmailJS REST API requirements.
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey, // Optional but highly recommended for backend REST calls to authenticate private templates
      template_params: {
        name: name,
        email: email,
        mobile: mobile || "Not provided",
        subject: finalSubject,
        title: finalSubject, // Support both {{subject}} and {{title}} in the EmailJS template
        message: message,
        to_email: "seecopowerltd@gmail.com", // Hardcoded target recipient as requested by user
      },
    };

    // Helper to resolve sleep delay promise
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    let emailJsSuccess = false;
    let lastErrorMsg = "";
    let statusCode = 200;
    const maxRetries = 3;

    // Perform a retry loop with exponential backoff and timeout handling (Goal 12)
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      if (attempt > 0) {
        // Backoff delay: 500ms, 1000ms, 2000ms
        const backoffDelay = 500 * Math.pow(2, attempt - 1);
        console.warn(`Retrying EmailJS dispatch. Attempt ${attempt} of ${maxRetries} after ${backoffDelay}ms delay...`);
        await delay(backoffDelay);
      }

      // Send POST request to EmailJS REST API with a 5-second timeout limit.
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (emailJsResponse.ok) {
          emailJsSuccess = true;
          break;
        } else {
          statusCode = emailJsResponse.status;
          lastErrorMsg = await emailJsResponse.text();
          console.error(`EmailJS API responded with error (status: ${statusCode}):`, lastErrorMsg);
          
          // If it's a client error (e.g. invalid credentials 400-499), retry is futile, fail early.
          if (statusCode >= 400 && statusCode < 500) {
            break;
          }
        }
      } catch (fetchErr: any) {
        clearTimeout(timeoutId);
        lastErrorMsg = fetchErr.name === "AbortError" ? "Timeout after 5000ms" : (fetchErr.message || String(fetchErr));
        console.error(`EmailJS attempt ${attempt} failed with exception:`, lastErrorMsg);
      }
    }

    if (!emailJsSuccess) {
      return NextResponse.json(
        { error: `Failed to dispatch email: ${lastErrorMsg || "Unknown provider issue"}` },
        { status: statusCode >= 400 && statusCode < 500 ? statusCode : 502 }
      );
    }

    console.log("Contact email successfully sent via EmailJS to seecopowerltd@gmail.com.");
    return NextResponse.json(
      { message: "Contact form submitted and email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
