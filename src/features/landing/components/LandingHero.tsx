import HeroSection from "@/shared/components/commons/HeroSection";
import { LANDING_COPY } from "../constants/LandingUi";
import CtaLink from "./CtaLink";

export default function LandingHero() {
  return (
    <div className="py-4 sm:py-8">
      <HeroSection headline={LANDING_COPY.headline} tagline={LANDING_COPY.tagline}>
        <CtaLink className="h-12 rounded-full px-6 text-base" />
      </HeroSection>
    </div>
  );
}