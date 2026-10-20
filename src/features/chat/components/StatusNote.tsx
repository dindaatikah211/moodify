import { Loader2 } from "lucide-react";

type StatusNoteProps = {
  label: string;
  pending?: boolean;
};

export default function StatusNote({ label, pending = false }: StatusNoteProps) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      {pending && <Loader2 className="size-4 animate-spin" />}
      {label}
    </p>
  );
}