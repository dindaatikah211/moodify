import CatMark from "@/shared/components/commons/CatMark";

type StatusNoteProps = {
  label: string;
  pending?: boolean;
};

export default function StatusNote({ label, pending = false }: StatusNoteProps) {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      {pending && <CatMark size={28} wiggle />}
      {label}
    </p>
  );
}