export const siteConfig = {
  name: "April Rieger",
  role: "Senior Software Engineer",
  /** Default <title> and OG site name */
  title: "April Rieger · Senior Software Engineer",
  description:
    "Senior software engineer specializing in IaC and Kubernetes provisioning—proven impact on AWS cost, operational efficiency, multi-environment ops, and GitOps-driven delivery.",
  url: "https://aprilrieger.github.io",
  language: "en",
  /** Hero: one line, specific */
  oneLiner:
    "I design and operate Kubernetes platforms, IaC, and GitOps workflows where reliability, cost, and multi-environment operations matter.",
  /** Hero: 2 sentences */
  summary:
    "Dynamic senior engineer specializing in IaC and Kubernetes provisioning—recent wins include roughly 20% AWS cost reduction alongside stronger operational efficiency. I thrive owning multi-environment platforms, automated deployment pipelines, and collaboration that turns infrastructure into something teams can ship on safely.",
  resumePdfPath: "/April_Rieger_Software_Engineer_Resume_2026.pdf",
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
    {
      label: "Focus",
      detail: "Kubernetes engineering, container orchestration, GitOps and continuous delivery",
    },
    {
      label: "Platform",
      detail: "IaC provisioning, observability and reliability, multi-environment management",
    },
    {
      label: "Stack",
      detail: "AWS EKS, Terraform/OpenTofu, Argo CD, Cloudflare edge (DNS, WAF, rate limiting)",
    },
  ],
  footerNote:
    "Open to senior software engineering roles focused on platform, cloud infrastructure, Kubernetes, and IaC—plus selective consulting—where ownership and measurable impact are explicit.",
} as const;

export type SiteConfig = typeof siteConfig;
