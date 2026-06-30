import NoticesClient from "./NoticesClient";
import { getDbNotices } from "@/lib/notices";

// Fallback revalidation cache of 5 minutes (300 seconds) for notices board
export const revalidate = 300;

export default async function NoticesPage() {
  const notices = await getDbNotices();
  return <NoticesClient initialNotices={notices as any[]} />;
}
