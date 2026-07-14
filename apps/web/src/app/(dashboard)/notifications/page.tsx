import { Metadata } from "next";
import { NotificationsPage } from "@/components/notifications/notifications-page";

export const metadata: Metadata = { title: "Notificări" };

export default function Notifications() {
  return <NotificationsPage />;
}
