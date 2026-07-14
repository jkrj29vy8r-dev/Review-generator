import { Metadata } from "next";
import { SettingsPage } from "@/components/settings/settings-page";

export const metadata: Metadata = { title: "Setări" };

export default function Settings() {
  return <SettingsPage />;
}
