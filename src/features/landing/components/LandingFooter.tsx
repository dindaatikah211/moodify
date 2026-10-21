import Link from "next/link";
import { PRIVACY_COPY } from "@/features/legal/constants/PrivacyContent";
import { LANDING_COPY } from "../constants/LandingUi";

export default function LandingFooter() {
  return (
    <footer className="mt-16 flex flex-col gap-2 border-t border-border py-8 text-sm text-muted-foreground">
      <span>{LANDING_COPY.footer}</span>
      <Link href="/privacy" className="w-fit underline underline-offset-4 hover:text-foreground">
        {PRIVACY_COPY.linkLabel}
      </Link>
    </footer>
  );
}