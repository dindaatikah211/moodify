import { cn } from "@/shared/lib/utils";

type TextBubbleProps = {
  text: string;
  isUser: boolean;
};

export default function TextBubble({ text, isUser }: TextBubbleProps) {
  return (
    <p
      className={cn(
        "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
      )}
    >
      {text}
    </p>
  );
}