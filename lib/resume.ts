// Flip to false if public/resume.pdf is ever pulled again — that disables
// all three résumé links (nav, hero, footer) instead of leaving them 404ing.
export const RESUME_AVAILABLE = true;
// Where the nav/hero/footer buttons point: the in-site résumé page, not
// the raw file, so the click lands on something styled rather than a
// browser's bare PDF viewer.
export const RESUME_HREF = "/resume";
// The file itself, for the download/open actions on that page.
export const RESUME_PDF_HREF = "/resume.pdf";
