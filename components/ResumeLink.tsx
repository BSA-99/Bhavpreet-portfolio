import { ArrowUpRight } from "lucide-react";
import { RESUME_AVAILABLE, RESUME_HREF } from "@/lib/resume";

type Tone = "solid" | "glass";

interface ResumeLinkProps {
  tone: Tone;
  className?: string;
  /** The nav's pill is compact and carries no arrow. */
  showArrow?: boolean;
  onNavigate?: () => void;
}

/**
 * The résumé call to action, in its two skins.
 *
 * The unavailable state used to be a `<span aria-disabled title="Coming
 * soon">`. A span is not focusable, so `aria-disabled` was never
 * announced and the `title` never reached anyone navigating by keyboard
 * or touch — the explanation existed only for a mouse hovering in
 * place. It is now a real focusable button whose accessible name
 * carries the state, so the reason is available to everyone who can
 * reach it.
 */

const ENABLED: Record<Tone, string> = {
  solid:
    "bg-text text-bg transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0",
  glass: "glass btn-ghost text-text",
};

/* Disabled skins carry their contrast deliberately. The old nav pill
   was white on `bg-text/45`, which lands near 2.5:1 over the light
   chrome — below AA even for a control that is only there to explain
   itself. Muted ink on the page ground clears 5.5:1. */
const DISABLED: Record<Tone, string> = {
  solid: "text-muted",
  glass: "glass text-muted",
};

const RING: Record<Tone, { on: string; off: string }> = {
  solid: { on: "", off: "inset 0 0 0 1px var(--color-border-strong)" },
  glass: { on: "", off: "" },
};

export default function ResumeLink({
  tone,
  className = "",
  showArrow = true,
  onNavigate,
}: ResumeLinkProps) {
  const shared = `inline-flex items-center gap-2 whitespace-nowrap rounded-chip font-body font-medium ${className}`;

  if (RESUME_AVAILABLE) {
    return (
      <a
        href={RESUME_HREF}
        onClick={onNavigate}
        className={`${shared} ${ENABLED[tone]}`}
        style={RING[tone].on ? { boxShadow: RING[tone].on } : undefined}
      >
        Résumé
        {showArrow && <ArrowUpRight size={15} strokeWidth={2} />}
      </a>
    );
  }

  return (
    /* No onClick: a type="button" with no handler already does nothing,
       and adding one would force this into a client component for no
       behaviour. `aria-disabled` rather than `disabled` keeps it
       focusable, so the reason is reachable by keyboard. */
    <button
      type="button"
      aria-disabled="true"
      aria-label="Résumé — coming soon"
      className={`${shared} ${DISABLED[tone]} cursor-not-allowed`}
      style={RING[tone].off ? { boxShadow: RING[tone].off } : undefined}
    >
      Résumé
      <span aria-hidden="true" className="opacity-70">
        · soon
      </span>
    </button>
  );
}
