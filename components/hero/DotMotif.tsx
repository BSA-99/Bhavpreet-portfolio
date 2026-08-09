interface DotGridProps {
  rows: number;
  cols: number;
  opacity: number;
  className?: string;
}

function DotGrid({ rows, cols, opacity, className }: DotGridProps) {
  return (
    <div
      className={`grid gap-1.5 ${className ?? ""}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          className="h-[3px] w-[3px] rounded-full"
          style={{ backgroundColor: "rgba(255, 255, 255, 1)", opacity }}
        />
      ))}
    </div>
  );
}

export default function DotMotif() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
    >
      <DotGrid rows={3} cols={5} opacity={0.35} className="absolute left-[8%] top-[10%]" />
      <DotGrid rows={3} cols={4} opacity={0.3} className="absolute right-[10%] top-[14%]" />
    </div>
  );
}
