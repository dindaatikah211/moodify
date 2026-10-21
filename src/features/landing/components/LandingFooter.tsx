import { LANDING_COPY } from "../constants/LandingUi";

export default function LandingFooter() {
  return (
    <footer className="mt-16 flex flex-col gap-1 border-t border-border py-8 text-sm text-muted-foreground">
      <span>{LANDING_COPY.footer}</span>
    </footer>
  );
}