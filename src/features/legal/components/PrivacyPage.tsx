import Link from "next/link";
import CatMark from "@/shared/components/commons/CatMark";
import { APP_NAME } from "@/shared/constants/Site";
import { PRIVACY_COPY, PRIVACY_SECTIONS } from "../constants/PrivacyContent";

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16">
      <header className="py-5">
        <Link href="/" className="flex w-fit items-center gap-2">
          <CatMark size={40} />
          <span className="font-heading text-2xl font-semibold tracking-tight">{APP_NAME}</span>
        </Link>
      </header>
      <main className="flex flex-col gap-10 pt-8">
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {PRIVACY_COPY.title}
          </h1>
          <p className="text-sm text-muted-foreground">{PRIVACY_COPY.updatedAt}</p>
          <p className="max-w-prose leading-relaxed">{PRIVACY_COPY.intro}</p>
        </div>
        {PRIVACY_SECTIONS.map(({ title, text, items }) => (
          <section key={title} className="flex flex-col gap-3">
            <h2 className="font-heading text-2xl font-semibold">{title}</h2>
            {text && <p className="max-w-prose leading-relaxed">{text}</p>}
            {items && (
              <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 leading-relaxed">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <p className="max-w-prose leading-relaxed">
          {PRIVACY_COPY.contactLabel}{" "}
          <a
            href={`mailto:${PRIVACY_COPY.contactEmail}`}
            className="underline underline-offset-4"
          >
            {PRIVACY_COPY.contactEmail}
          </a>
        </p>
      </main>
    </div>
  );
}