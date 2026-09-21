export interface WorkBullet {
  /** Short title for the bullet, used only on the detail page where
   *  each point gets its own block. The list on the home page renders
   *  `text` alone. */
  heading: string;
  text: string;
  bold?: string[];
}

export interface WorkPhoto {
  /** Caption doubles as the placeholder label until a real file exists,
   *  so an empty slot still says what belongs in it. */
  caption: string;
  src?: string;
  alt?: string;
  /** Crop bias for photos taller than the 16/10 gallery frame — full-body
   *  portrait shots lose more than half their height to a centred crop,
   *  so this keeps the subject's face in frame instead of their torso. */
  imagePosition?: string;
  /** CSS aspect-ratio matching the source file's own pixel dimensions
   *  ("width / height"), so the gallery frame fits the photo exactly
   *  instead of cropping it or letterboxing empty space around it. */
  aspectRatio?: string;
}

export interface WorkEntry {
  id: string;
  /** URL segment for /work/[slug]. */
  slug: string;
  index: string;
  role: string;
  company: string;
  location: string;
  dates: string;
  /** Two or three words for the meta rail and the detail-page eyebrow. */
  focus: string;
  accent: "blue" | "orange";
  stack: string[];
  /** Lead paragraphs on the detail page. */
  summary: string[];
  bullets: WorkBullet[];
  photos: WorkPhoto[];
}

export const workEntries: WorkEntry[] = [
  {
    id: "cloud-coe-coop",
    slug: "cloud-centre-of-excellence-coop",
    /* Numbering is chronological, not list order: 01 is the earliest
       term. The list below runs newest-first, so these read 03, 02, 01
       down the page — which is the point. Numbering by list position
       put "01" on the most recent term, whose own summary opens "My
       third co-op term". */
    index: "03",
    role: "Cloud Administrator",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "May 2026 - Aug 2026",
    focus: "Governance & Identity",
    accent: "blue",
    stack: [
      "Azure Resource Graph",
      "KQL",
      "Azure Policy",
      "Databricks",
      "SCIM",
      "IAM / RBAC",
    ],
    summary: [
      "My third co-op term on the Cloud Centre of Excellence team, spent making governance automatic rather than manual. The work centred on identity, policy, and visibility: connecting Databricks to central identity so access maintains itself, writing policy that protects resources the moment they exist, and querying the estate to find what had quietly drifted out of it.",
      "Alongside the build work, I coordinated the retirement of outdated infrastructure across teams that each owned a different slice of the environment — the part of cloud cleanup that is less about tooling than about getting the right people to agree on what can safely go.",
    ],
    bullets: [
      {
        heading: "Automated identity sync for Databricks",
        text: "Connected Databricks to the company's central identity system using SCIM — creating and nesting 5 identity groups — so user and group access updates automatically instead of being added and removed by hand.",
        bold: ["SCIM"],
      },
      {
        heading: "Policy-enforced deletion protection",
        text: "Built an Azure Policy that automatically protects new resources from accidental deletion the moment they're created, rather than relying on someone to remember to do it.",
        bold: ["Azure Policy"],
      },
      {
        heading: "Fleet-wide resource discovery",
        text: "Wrote Azure Resource Graph and KQL queries that swept 10 subscriptions for unused, untracked, and misconfigured resources — surfacing ~1,800 VMs for assessment and 137 stale diagnostic settings still pointed at a workspace that no longer existed.",
        bold: ["Azure Resource Graph", "KQL"],
      },
      {
        heading: "Cross-team infrastructure retirement",
        text: "Coordinated the retirement of outdated infrastructure across multiple teams, mapping 10 monitoring tests back to their owning teams to drive each to a confirmed decision.",
        bold: ["retirement of outdated infrastructure"],
      },
    ],
    photos: [
      {
        caption: "Award recognition",
        src: "/images/work/cloud-coe-2026-award.jpg",
        alt: "Bhavpreet receiving an award in front of the Sobeys sign",
        aspectRatio: "572 / 751",
      },
      {
        caption: "Team retirement sync",
        src: "/images/work/cloud-coe-2026-signage.jpg",
        alt: "Bhavpreet outside the Sobeys office entrance",
        aspectRatio: "1050 / 1400",
      },
    ],
  },
  {
    id: "it-ops-transformation",
    slug: "it-ops-transformation-student",
    index: "02",
    role: "IT Ops Transformation Student",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "Sept 2025 - Dec 2025",
    focus: "IT Operations",
    accent: "orange",
    stack: [
      "ServiceNow",
      "Incident Management",
      "Store Systems",
      "Process Documentation",
    ],
    summary: [
      "A term inside IT operations rather than cloud engineering, working the support side of retail store systems. Most days started with a ticket and ended with either a fix or a clear handoff to whoever could make one.",
      "The through-line was reducing repeat work: documenting what kept coming back, rewriting the workflow guides around it, and learning how operational data actually moves between stores and the central servers behind them.",
    ],
    bullets: [
      {
        heading: "End-to-end ticket resolution",
        text: "Resolved support tickets end to end for retail store systems, restoring access and functionality for staff across the store network.",
        bold: ["end to end"],
      },
      {
        heading: "Vendor and store coordination",
        text: "Worked with external vendors and store teams to investigate incidents and coordinate fixes between the people reporting problems and the people able to solve them.",
        bold: ["external vendors"],
      },
      {
        heading: "Documentation that cut repeat work",
        text: "Documented recurring issues and rewrote workflow guides so the same problems could be resolved faster the next time they appeared.",
        bold: ["workflow guides"],
      },
      {
        heading: "Tracing operational data flows",
        text: "Traced how operational data moves between store systems and central servers, learning where enterprise data breaks down and how it gets repaired.",
        bold: ["operational data"],
      },
    ],
    photos: [
      {
        caption: "Store systems support",
        src: "/images/work/it-ops-store-systems.jpg",
        alt: "Bhavpreet in front of the Sobeys Inc. sign",
        aspectRatio: "1316 / 1195",
      },
      {
        caption: "Workflow documentation",
        src: "/images/work/it-ops-workflow.jpg",
        alt: "Bhavpreet in the Sobeys Stellarton office",
        aspectRatio: "1050 / 1400",
      },
    ],
  },
  {
    id: "cloud-devops-intern",
    slug: "cloud-devops-intern",
    index: "01",
    role: "Cloud & DevOps Intern",
    company: "Sobeys Inc.",
    location: "Stellarton, NS",
    dates: "May 2025 - Aug 2025",
    focus: "Provisioning & FinOps",
    accent: "blue",
    stack: [
      "Azure",
      "RBAC",
      "Key Vault",
      "PowerShell",
      "Azure Data Factory",
      "Databricks",
      "SQL",
      "FinOps",
    ],
    summary: [
      "My first term on the Cloud Centre of Excellence team, spent largely on the provisioning and security side of Azure — setting environments up for internal teams and making sure access and credentials were handled properly from the start rather than patched later.",
      "The second half leaned toward data and cost: reporting pipelines in Azure Data Factory and Databricks, and FinOps work alongside architects to find spend that wasn't buying anything.",
    ],
    bullets: [
      {
        heading: "Secure environment provisioning",
        text: "Set up and secured 4 Azure environments for internal teams, controlling who has access to what using RBAC and storing credentials safely in Azure Key Vault.",
        bold: ["RBAC", "Azure Key Vault"],
      },
      {
        heading: "Secretless pipeline authentication",
        text: "Replaced stored passwords in deployment pipelines with Workload Identity Federation, so systems authenticate without any long-lived secret existing to be leaked.",
        bold: ["Workload Identity Federation"],
      },
      {
        heading: "PowerShell automation",
        text: "Wrote PowerShell scripts to automate setup tasks that were previously done manually every time they were needed.",
        bold: ["PowerShell scripts"],
      },
      {
        heading: "Cost reporting pipelines",
        text: "Built reporting pipelines in Azure Data Factory and Databricks, using SQL to turn large volumes of usage data into cost insights for the team — work that included inventorying ~50 self-hosted integration runtimes and flagging 2 that were orphaned.",
        bold: ["Azure Data Factory", "Databricks"],
      },
      {
        heading: "FinOps and cost reduction",
        text: "Worked with architects on FinOps initiatives to find and reduce unnecessary cloud spend across Azure and GCP.",
        bold: ["FinOps"],
      },
    ],
    photos: [
      {
        caption: "Azure environment setup",
        src: "/images/work/cloud-coe-2025-office.jpg",
        alt: "Bhavpreet outside the Sobeys office entrance",
        aspectRatio: "1400 / 1050",
      },
    ],
  },
];

export function getWorkEntry(slug: string) {
  return workEntries.find((entry) => entry.slug === slug);
}

/**
 * Previous and next terms, for the pager at the foot of a detail page.
 *
 * `workEntries` is ordered newest-first, so array order runs backwards
 * through time: the entry at `i + 1` is the *earlier* term. "Previous"
 * and "next" here mean earlier and later chronologically, which is what
 * the pager labels claim — indexing them the other way round is what
 * made "Next term" point at the term that came before.
 */
export function getWorkNeighbours(slug: string) {
  const i = workEntries.findIndex((entry) => entry.slug === slug);
  if (i === -1) return { previous: undefined, next: undefined };
  return {
    previous: i < workEntries.length - 1 ? workEntries[i + 1] : undefined,
    next: i > 0 ? workEntries[i - 1] : undefined,
  };
}
