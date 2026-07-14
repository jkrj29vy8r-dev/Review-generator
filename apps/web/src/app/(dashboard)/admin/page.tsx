import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = { title: "Admin Panel" };

const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS || "").split(",").filter(Boolean);

export default async function AdminPage() {
  const { userId } = auth();
  if (!userId || !ADMIN_USER_IDS.includes(userId)) {
    redirect("/dashboard");
  }
  return <AdminDashboard />;
}
