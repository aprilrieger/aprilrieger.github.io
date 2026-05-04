export const siteConfig = {
  name: "April Rieger",
  role: "Senior Software Engineer",
  /** Default <title> and OG site name */
  title: "April Rieger · Senior Software Engineer",
  description:
    "Senior engineer focused on platform reliability, backend architecture, and shipping measurable outcomes in complex product environments.",
  url: "https://aprilrieger.github.io",
  language: "en",
  /** Hero: one line, specific */
  oneLiner:
    "I lead delivery of resilient platforms and backend systems where scale, ownership, and tradeoffs matter.",
  /** Hero: 2 sentences */
  summary:
    "I have operated in cross-functional teams modernizing legacy stacks, tightening SLOs, and turning ambiguous product goals into shippable architecture. Recent impact spans performance work, operational maturity, and full-stack product delivery on Rails and cloud-native stacks.",
  resumePdfPath: "/april_rieger_resume.pdf",
  social: {
    github: "https://github.com/aprilrieger",
    linkedin: "https://www.linkedin.com/in/aprilrieger1",
    /** display + mailto */
    emailDisplay: "april.rieger@yahoo.com",
    emailMailto: "mailto:april.rieger@yahoo.com",
    medium: "https://medium.com/@aprilrieger",
  },
  /** Optional: set to your scheduling URL */
  calendlyUrl: "" as string | undefined,
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
  /** One line above featured work on home */
  selectedWorkLead:
    "Depth over noise: problem, constraints, what shipped, and what I’d do differently next time.",
  /** Blog index: hero lead + meta description for /blog */
  blogLead:
    "Technical notes on system design, tradeoffs, and lessons from production.",
  /** Credibility strip on home */
  credibility: [
    { label: "Focus", detail: "Backend platforms, reliability, distributed systems" },
    { label: "Scale", detail: "Production services, throughput, and operational load" },
    { label: "Stack", detail: "Ruby on Rails, cloud infra, APIs, full-stack delivery" },
  ],
  footerNote:
    "Open to senior IC or lead-engineer roles and selective technical consulting where ownership and impact are explicit.",
} as const;

export type SiteConfig = typeof siteConfig;
