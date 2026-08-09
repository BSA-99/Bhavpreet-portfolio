import Image from "next/image";

interface PhotoCardProps {
  src: string;
  alt: string;
  size?: number;
}

const CIRCLE_MASK = "radial-gradient(circle at 50% 42%, #000 60%, transparent 78%)";

export default function PhotoCard({ src, alt, size = 590 }: PhotoCardProps) {
  return (
    <div
      className="relative h-[220px] w-[220px] lg:h-[var(--card-size)] lg:w-[var(--card-size)] min-[1600px]:h-[650px] min-[1600px]:w-[650px]"
      style={{ "--card-size": `${size}px` } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[42%] -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div
        className="relative h-full w-full"
        style={{ filter: "drop-shadow(0 20px 30px rgba(10,10,25,0.30))" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-contain"
          style={{
            maskImage: CIRCLE_MASK,
            WebkitMaskImage: CIRCLE_MASK,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
          }}
          priority
        />
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="sparkle-accent absolute bottom-[-26px] right-[-30px] h-6 w-6 text-white/90"
      >
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
