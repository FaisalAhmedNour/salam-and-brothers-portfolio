import ServicesClient from "./ServicesClient";
import { getServicesData } from "@/lib/services";

// Fallback revalidation cache of 5 minutes (300 seconds) for services page queries
export const revalidate = 300;

export default async function ServicesPage() {
  const { items, settings } = await getServicesData();
  return <ServicesClient initialItems={items as any[]} initialSettings={settings} />;
}
