import { Fragment, type ReactNode } from "react";

/**
 * Emphasises the named terms inside a bullet.
 *
 * Shared by the list on the home page and the detail pages, so a term
 * that reads as bold in one place reads as bold in the other.
 */
export function renderBoldText(text: string, bold?: string[]): ReactNode {
  if (!bold || bold.length === 0) return text;

  const escaped = bold.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");

  return text.split(pattern).map((part, i) =>
    bold.includes(part) ? (
      <b key={i} className="font-semibold text-text">
        {part}
      </b>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
