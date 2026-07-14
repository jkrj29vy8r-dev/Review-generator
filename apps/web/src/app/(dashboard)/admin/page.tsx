import { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = { title: "Admin Panel" };

export default function AdminPage() {
  return <AdminDashboard />;
}
