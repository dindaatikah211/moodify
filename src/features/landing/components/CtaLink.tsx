import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { CTA_HOVER } from "../constants/LandingMotion";
import { LANDING_COPY } from "../constants/LandingUi";

type CtaLinkProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

export default function CtaLink({ variant, className }: CtaLinkProps) {
  return (
    <Link href="/chat" className={cn(buttonVariants({ variant }), CTA_HOVER, className)}>
      {LANDING_COPY.cta}
    </Link>
  );
}