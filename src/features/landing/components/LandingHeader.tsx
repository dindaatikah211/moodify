import Navbar from "@/shared/components/commons/Navbar";
import CtaLink from "./CtaLink";

export default function LandingHeader() {
  return (
    <Navbar>
      <CtaLink variant="outline" className="rounded-full border-foreground/50" />
    </Navbar>
  );
}