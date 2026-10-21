import Link from "next/link";
import HeroSection from "@/shared/components/commons/HeroSection";
import { buttonVariants } from "@/shared/components/ui/button";
import { LANDING_COPY } from "../constants/LandingUi";

export default function LandingHero() {
  return (
    <div className="py-12 sm:py-20">
      <HeroSection headline={LANDING_COPY.headline} tagline={LANDING_COPY.tagline}>
        <Link
          href="/chat"
          className={buttonVariants({ className: "h-12 rounded-full px-6 text-base" })}
        >
          {LANDING_COPY.cta}
        </Link>
      </HeroSection>
    </div>
  );
}