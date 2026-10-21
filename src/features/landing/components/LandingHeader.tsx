import Link from "next/link";
import CatMark from "@/shared/components/commons/CatMark";
import { buttonVariants } from "@/shared/components/ui/button";
import { LANDING_COPY } from "../constants/LandingUi";

export default function LandingHeader() {
  return (
    <header className="flex items-center justify-between py-5">
      <div className="flex items-center gap-2">
        <CatMark size={40} />
        <span className="font-heading text-2xl font-semibold tracking-tight">
          {LANDING_COPY.brand}
        </span>
      </div>
      <Link
        href="/chat"
        className={buttonVariants({
          variant: "outline",
          className: "rounded-full border-foreground/50",
        })}
      >
        {LANDING_COPY.cta}
      </Link>
    </header>
  );
}