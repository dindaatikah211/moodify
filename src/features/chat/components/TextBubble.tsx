import { cn } from "@/shared/lib/utils";

type TextBubbleProps = {
  text: string;
  isUser: boolean;
};

export default function TextBubble({ text, isUser }: TextBubbleProps) {
  return (
    <p
      className={cn(
        "max-w-[85%] whitespace-pre-wrap text-base leading-relaxed",
        isUser
          ? "rounded-3xl rounded-br-md bg-primary px-4 py-2.5 font-medium text-primary-foreground"
          : "text-foreground",
      )}
    >
      {text}
    </p>
  );
}