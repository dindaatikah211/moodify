export const ACTION_BUTTON_STYLE = {
  variant: "outline",
  size: "sm",
  className: "rounded-full border-foreground/50",
} as const;

export const STICKY_BAR_CLASS =
  "sticky top-0 z-10 -mx-4 flex items-center justify-between bg-background px-4 py-4 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-4 after:bg-linear-to-b after:from-background after:to-transparent after:content-['']";