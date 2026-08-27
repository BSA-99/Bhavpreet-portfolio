import Image from "next/image";

interface ImageSlotProps {
  label: string;
  /** When present the real asset renders and the placeholder is skipped. */
  src?: string;
  alt?: string;
  className?: string;
  /** CSS object-position, for screenshots wider than the 16/10 frame
   *  where a centred crop would cut into the content that matters. */
  objectPosition?: string;
}

/**
 * Placeholder for a real asset that has not been supplied yet.
 * Deliberately quiet: it should read as a reserved slot, not as
 * decoration pretending to be content.
 */
export default function ImageSlot({
  label,
  src,
  alt,
  className,
  objectPosition = "50% 50%",
}: ImageSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }

  /* The empty state used to print `label` — the image's description —
     as visible text. Next to a card that has a real screenshot that
     reads as stray body copy rather than as a reserved slot, and in the
     work galleries it repeated the caption printed directly beneath it.
     The description now names the slot for assistive tech only, and the
     visible text says what the slot is actually waiting for. */
  return (
    <div
      role="img"
      aria-label={`${label} — not published yet`}
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
      <span
        aria-hidden="true"
        className="relative font-body text-label uppercase text-muted opacity-70"
      >
        Preview coming soon
      </span>
    </div>
  );
}
