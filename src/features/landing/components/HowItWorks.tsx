import { cn } from "@/shared/lib/utils";
import { LANDING_COPY, STEP_TONES } from "../constants/LandingUi";

export default function HowItWorks() {
  return (
    <section className="grid gap-10 py-20 lg:grid-cols-[1fr_1.4fr]">
      <h2 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
        {LANDING_COPY.stepsTitle}
      </h2>
      <ol className="flex flex-col gap-8">
        {LANDING_COPY.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-full font-heading text-xl font-semibold",
                STEP_TONES[index],
              )}
            >
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-2xl font-semibold">{step.title}</h3>
              <p className="max-w-md text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}