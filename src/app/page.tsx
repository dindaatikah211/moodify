import CallToAction from "@/features/landing/components/CallToAction";
import DemoConversation from "@/features/landing/components/DemoConversation";
import HowItWorks from "@/features/landing/components/HowItWorks";
import LandingFooter from "@/features/landing/components/LandingFooter";
import LandingHeader from "@/features/landing/components/LandingHeader";
import LandingHero from "@/features/landing/components/LandingHero";
import InstallApp from "@/features/pwa/components/InstallApp";
import { PAGE_CONTAINER } from "@/shared/constants/Layout";
import { cn } from "@/shared/lib/utils";

export default function HomePage() {
  return (
    <>
      <LandingHeader />
      <div className={cn(PAGE_CONTAINER, "overflow-x-clip")}>
        <main className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <LandingHero />
            <DemoConversation />
          </div>
          <HowItWorks />
          <div className="flex flex-col gap-6">
            <CallToAction />
            <InstallApp />
          </div>
        </main>
        <LandingFooter />
      </div>
    </>
  );
}