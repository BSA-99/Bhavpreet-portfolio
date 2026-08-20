import Image from "next/image";

interface ImageSlotProps {
  label: string;
  /** When present the real asset renders and the placeholder is skipped. */
  src?: string;
  alt?: string;
  className?: string;
}

/**
 * Placeholder for a real asset that has not been supplied yet.
 * Deliberately quiet: it should read as a reserved slot, not as
 * decoration pretending to be content.
 */
export default function ImageSlot({ label, src, alt, className }: ImageSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image src={src} alt={alt ?? ""} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden p-6 text-center ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(140deg, color-mix(in srgb, var(--color-surface) 70%, transparent) 0%, color-mix(in srgb, var(--color-accent-2) 7%, transparent) 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-inner"
        style={{
          border: "1px dashed color-mix(in srgb, var(--color-text) 16%, transparent)",
        }}
      />
      <span className="relative font-body text-label uppercase text-muted">
        {label}
      </span>
    </div>
  );
}
