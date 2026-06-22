import { NextResponse } from "next/server";

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
    const { name, email, mobile, subject, message } = data;

    // Server-side validation: ensure all required fields are present
    // to prevent empty or malicious submissions.
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
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
        from_name: name,
        from_email: email,
        mobile: mobile || "Not provided",
        subject: subject,
        message: message,
        to_email: "seecopowerltd@gmail.com", // Hardcoded target recipient as requested by user
      },
    };

    // Send POST request to EmailJS REST API.
    // Fetch is natively available on the server context in Node.js 18+ and Next.js.
    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!emailJsResponse.ok) {
      const errorText = await emailJsResponse.text();
      console.error("EmailJS API responded with error:", errorText);
      return NextResponse.json(
        { error: "Failed to dispatch email via provider." },
        { status: 502 } // Bad Gateway from external API
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

