import Link from "next/link";
import CatMark from "@/shared/components/commons/CatMark";
import { buttonVariants } from "@/shared/components/ui/button";
import { LANDING_COPY } from "../constants/LandingUi";

export default function CallToAction() {
  const { title, text } = LANDING_COPY.closing;

  return (
    <section className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-primary p-8 sm:flex-row sm:items-center sm:p-12">
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-md">{text}</p>
        <Link
          href="/chat"
          className={buttonVariants({
            className:
              "mt-2 h-12 w-fit rounded-full bg-foreground px-6 text-base text-background hover:bg-foreground/85",
          })}
        >
          {LANDING_COPY.cta}
        </Link>
      </div>
      <CatMark size={120} />
    </section>
  );
}