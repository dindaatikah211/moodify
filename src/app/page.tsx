import CallToAction from "@/features/landing/components/CallToAction";
import DemoConversation from "@/features/landing/components/DemoConversation";
import HowItWorks from "@/features/landing/components/HowItWorks";
import LandingFooter from "@/features/landing/components/LandingFooter";
import LandingHeader from "@/features/landing/components/LandingHeader";
import LandingHero from "@/features/landing/components/LandingHero";
import InstallApp from "@/features/pwa/components/InstallApp";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-x-clip px-4">
      <LandingHeader />
      <main className="flex flex-col gap-8">
        <LandingHero />
        <DemoConversation />
        <HowItWorks />
        <CallToAction />
        <InstallApp />
      </main>
      <LandingFooter />
    </div>
  );
}