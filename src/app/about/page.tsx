import AboutClient from "./AboutClient";
import { getDbCertificates } from "@/lib/certificates";

// Fallback revalidation interval of 5 minutes (300 seconds) for about page queries
export const revalidate = 300;

export default async function AboutUsPage() {
  const certs = await getDbCertificates();
  return <AboutClient initialCerts={certs as any} />;
}
