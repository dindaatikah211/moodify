type SquiggleProps = {
  className?: string;
};

export default function Squiggle({ className }: SquiggleProps) {
  return (
    <svg viewBox="0 -4 244 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2 8c10-12 20-12 30 0c10 12 20 12 30 0c10-12 20-12 30 0c10 12 20 12 30 0c10-12 20-12 30 0c10 12 20 12 30 0c10-12 20-12 30 0c10 12 20 12 30 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}