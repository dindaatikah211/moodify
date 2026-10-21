import CallToAction from "@/features/landing/components/CallToAction";
import DemoConversation from "@/features/landing/components/DemoConversation";
import HowItWorks from "@/features/landing/components/HowItWorks";
import LandingFooter from "@/features/landing/components/LandingFooter";
import LandingHeader from "@/features/landing/components/LandingHeader";
import LandingHero from "@/features/landing/components/LandingHero";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-clip px-4">
      <LandingHeader />
      <main>
        <LandingHero />
        <DemoConversation />
        <HowItWorks />
        <CallToAction />
      </main>
      <LandingFooter />
    </div>
  );
}