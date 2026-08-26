"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import ImageSlot from "@/components/ImageSlot";
import { lockScroll, unlockScroll } from "@/lib/lenis";

/**
 * GitHub's mark is a brand logo, not a UI icon. Lucide dropped brand
 * glyphs in v1, so this is the official mark inlined rather than a
 * hand-drawn approximation.
 */
function GithubMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  year: string;
  status: string;
  imageLabel: string;
  /** Real screenshot. When absent the media frame is an inert placeholder
   *  rather than a zoom target, so there is nothing to expand into. */
  image?: string;
  /** Crop bias for screenshots wider than the 16/10 frame. */
  imagePosition?: string;
  githubUrl: string;
  accent?: "orange" | "blue";
  isActive: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function ProjectCard({
  title,
  description,
  tags,
  year,
  status,
  imageLabel,
  image,
  imagePosition,
  githubUrl,
  accent = "orange",
  isActive,
  onToggle,
  onClose,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  /* One node plays both parts: the zoom trigger when collapsed, the
     dialog when expanded. */
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Cursor spotlight. Written straight to the node's CSS custom
     properties inside rAF so the card never re-renders on move. */
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let pending: { x: number; y: number } | null = null;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      pending = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      };
      if (frame.current === null) {
        frame.current = requestAnimationFrame(() => {
          frame.current = null;
          if (!pending) return;
          node.style.setProperty("--mx", `${pending.x}%`);
          node.style.setProperty("--my", `${pending.y}%`);
        });
      }
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      node.removeEventListener("pointermove", onMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const zoomable = Boolean(image);
  const hasRepo = Boolean(githubUrl && githubUrl !== "#");

  /* The expanded preview is a modal in every way that matters: it
     covers the viewport and sits over a scrim. So it has to behave
     like one — take focus on open, keep Tab inside itself, and hand
     focus back to the trigger on close. Without this the keyboard is
     still walking the page behind the overlay. */
  useEffect(() => {
    if (!isActive) return;

    const dialog = frameRef.current;
    if (!dialog) return;

    lockScroll();
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      /* Deferred: the node only regains its tabIndex once React has
         re-rendered it as the collapsed trigger, and focus() on an
         element without one is a no-op. */
      requestAnimationFrame(() => dialog.focus());
    };
  }, [isActive]);

  return (
    <article
      ref={cardRef}
      className={`glass glass-lift glass-spot glass-materialize flex h-full flex-col ${
        isActive ? "overflow-visible" : "overflow-hidden"
      }`}
      style={
        {
          "--spot":
            accent === "blue" ? "var(--color-accent-2)" : "var(--color-accent)",
        } as React.CSSProperties
      }
    >
      {(() => {
        const frame = (
          <div
            ref={frameRef}
            className={`media-frame group border-b border-border ${
              isActive
                ? "fixed inset-0 z-[200] cursor-zoom-out border-0 bg-bg p-6"
                : `relative z-[2] aspect-[16/10] overflow-hidden ${zoomable ? "cursor-zoom-in" : ""}`
            }`}
            onClick={zoomable ? onToggle : undefined}
            onKeyDown={
              zoomable && !isActive
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onToggle();
                    }
                  }
                : undefined
            }
            role={isActive ? "dialog" : zoomable ? "button" : undefined}
            aria-modal={isActive ? true : undefined}
            tabIndex={zoomable && !isActive ? 0 : undefined}
            aria-label={
              isActive
                ? `Preview of ${title}`
                : zoomable
                  ? `Expand preview of ${title}`
                  : undefined
            }
          >
            <ImageSlot
              label={imageLabel}
              src={image}
              alt={title}
              className="h-full w-full"
              objectPosition={imagePosition}
            />

            {zoomable && !isActive && (
              <div className="expand-hint pointer-events-none absolute bottom-3.5 right-3.5 flex translate-y-1.5 items-center gap-2 rounded-chip bg-text/90 px-3.5 py-2 font-body text-[0.625rem] tracking-[0.1em] text-bg opacity-0 backdrop-blur-sm transition-all duration-300">
                EXPAND
              </div>
            )}

            {isActive && (
              <button
                ref={closeRef}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close preview"
                className="glass fixed right-5 top-5 z-[210] flex h-11 w-11 items-center justify-center rounded-chip text-text"
              >
                <X size={19} strokeWidth={2} />
              </button>
            )}
          </div>
        );

        /* `.glass` puts a backdrop-filter on this card, and a
           backdrop-filter establishes a new containing block for any
           `position: fixed` descendant — so without a portal, the
           expanded frame's "fixed inset-0" resolves against the card's
           own box instead of the viewport, and the "full-screen"
           preview never grows past the thumbnail. Escaping to
           document.body sidesteps that entirely. */
        return isActive && typeof document !== "undefined"
          ? createPortal(frame, document.body)
          : frame;
      })()}

      <div className="relative z-[2] flex flex-1 flex-col p-7 sm:p-9">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className={accent === "blue" ? "chip chip-blue" : "chip"}>
            {status}
          </span>
          <span className="font-body text-[0.75rem] tabular-nums text-muted">
            {year}
          </span>
        </div>

        <h3 className="mb-3 font-display text-heading font-bold">
          {title}
        </h3>

        <p className="mb-6 max-w-[54ch] font-body text-copy text-muted">
          {description}
        </p>

        <div className="mb-7 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="chip chip-neutral">
              {tag}
            </span>
          ))}
        </div>

        {hasRepo ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-2.5 rounded-chip bg-text px-5 py-2.5 font-body text-[0.8125rem] font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <GithubMark />
            View on GitHub
          </a>
        ) : (
          /* A primary CTA pointing at "#" is worse than no CTA: it
             looks live, and spends the click. Until a real URL exists
             it says so instead. */
          <button
            type="button"
            aria-disabled="true"
            aria-label="Repository link coming soon"
            onClick={(event) => event.preventDefault()}
            className="mt-auto inline-flex w-fit cursor-not-allowed items-center gap-2.5 rounded-chip px-5 py-2.5 font-body text-[0.8125rem] font-medium text-muted"
            style={{ boxShadow: "inset 0 0 0 1px var(--color-border-strong)" }}
          >
            <GithubMark />
            Repo coming soon
          </button>
        )}
      </div>
    </article>
  );
}
