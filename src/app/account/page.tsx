import type { Metadata } from "next";
import AccountPage from "@/features/auth/components/AccountPage";

export const metadata: Metadata = { title: "Akun" };

export default function AccountRoute() {
  return <AccountPage />;
}