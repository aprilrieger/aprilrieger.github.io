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
    { label: "Talks", href: "/talks" },
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
  talksLead:
    "Conference presentations on platform engineering, Kubernetes, and developer experience.",
  talks: [
    {
      year: 2026,
      venue: "Samvera Connect",
      title: "From Whack-a-Mole to Edge Protection: Mitigating AI Scraping in Shared Repository Infrastructure",
      topics: ["Cloudflare", "Kubernetes", "Terraform/OpenTofu", "DevEx", "Reliability", "Platform Engineering"],
      links: {
        video: "https://www.youtube.com/watch?v=H89E_KHrK9Q",
        slides: "https://github.com/notch8/cloudflare-iac-example/releases/download/fedora-showcase-april-2026/n8-from-whack-a-mole-to-edge-protection.pdf",
        repo: "https://github.com/notch8/cloudflare-iac-example",
      },
    },
    {
      year: 2023,
      venue: "Samvera Developer Training",
      title: "Helm Mastery: Transform Your Hyku Deployments with Confidence",
      topics: ["Helm", "Kubernetes", "Platform Engineering", "Developer Education", "Deployment Automation"],
      links: {
        video: "https://drive.google.com/file/d/1P0yL-e2chqWQW8srMlA-jfIYFNz6cHLT/view",
        slides: "https://drive.google.com/file/d/1o0FnPvy3fHfG7EzYOE_Jlrv1vtpAIjqW/view",
        notes: "https://drive.google.com/file/d/1QxNnRqxv6Rq0a06fntdB4VMKPf4Y_wv3/view",
        repo: "https://github.com/notch8/softserv-training-workshops-2023",
      },
    },
    {
      year: 2022,
      venue: "Samvera Connect",
      title: "A Tour of the New Hyrax Analytics Features",
      topics: ["Analytics", "Product Education", "Hyrax", "Developer Enablement"],
      links: {
        video: "https://www.youtube.com/watch?v=nJAt3SWb144",
      },
    },
    {
      year: 2021,
      venue: "Samvera Connect",
      title: "Expanding Hyku's Versatility with Custom Themes",
      topics: ["Frontend Customization", "UX", "Platform Flexibility", "Product Education"],
      links: {
        video: "https://www.youtube.com/live/F3G1IIZwGNc?si=P4VUQE6w_KXfWI0I&t=8504",
      },
    },
    {
      year: 2020,
      venue: "Samvera Connect",
      title: "A Samvera Internship: New to Coding, New to the Community",
      topics: ["Onboarding", "Mentorship", "Open Source", "Community", "Developer Education"],
      links: {
        video: "https://www.youtube.com/watch?v=w42d5LguF4s",
      },
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
