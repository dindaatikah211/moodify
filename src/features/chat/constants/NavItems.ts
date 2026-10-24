import { History, MessageCircle, Smile, User, type LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/chat", label: "Obrolan", icon: MessageCircle },
  { href: "/history", label: "Riwayat", icon: History },
  { href: "/mood", label: "Mood", icon: Smile },
  { href: "/account", label: "Akun", icon: User },
];

const SIDEBAR_HREFS: readonly string[] = ["/mood", "/account"];

export const SIDEBAR_LINKS = NAV_ITEMS.filter(({ href }) => SIDEBAR_HREFS.includes(href));