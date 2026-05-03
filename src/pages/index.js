import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import { SeoMeta } from "../components/seo";
import { GhostButton, PageSection, PrimaryButton } from "../components/ui";
import site from "../../content/site.json";
import services from "../../content/services.json";
import projects from "../../content/projects.json";
import testimonials from "../../content/testimonials.json";

export const Head = () => <SeoMeta />;

export default function IndexPage() {
  const { social, contactLead, hero, brand, principalNote } = site;

  return (
    <Layout>
      <section className="border-b border-stone-200/80 bg-gradient-to-b from-white to-stone-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
              {brand.tagline}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
              {hero.headline}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">{hero.subline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/#contact">{hero.ctaLabel}</PrimaryButton>
              <GhostButton href="/blog">Technical notes →</GhostButton>
            </div>
            <div className="mt-10 flex gap-5 text-sm text-stone-500">
              {social.github ? (
                <a className="hover:text-brand-700" href={social.github}>
                  GitHub
                </a>
              ) : null}
              {social.linkedin ? (
                <a className="hover:text-brand-700" href={social.linkedin}>
                  LinkedIn
                </a>
              ) : null}
              {social.medium ? (
                <a className="hover:text-brand-700" href={social.medium}>
                  Medium
                </a>
              ) : null}
            </div>
          </div>
          <div className="mx-auto flex shrink-0 justify-center sm:mx-0 sm:justify-end">
            <StaticImage
              src="../../content/images/fs_logo.png"
              alt={`${brand.displayName} logo`}
              className="max-h-56 w-auto max-w-[min(18rem,85vw)] -translate-y-1 object-contain drop-shadow-2xl sm:max-h-64 sm:max-w-[22rem] sm:-translate-y-2"
              imgClassName="object-contain object-center"
              placeholder="none"
            />
          </div>
        </div>
      </section>

      <PageSection
        id="services"
        eyebrow="Consulting lenses"
        title="How FlyingSquirrel helps"
        subtitle="We focus where platform work pays off fastest: spend you can reclaim, outages you can prevent, and automation your team will actually run."
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.services.map((s) => (
            <li
              key={s.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <div className="text-2xl">{s.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-stone-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.description}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="testimonials"
        eyebrow="Signal from the field"
        title="What teams say"
        subtitle="Representative feedback from recent platform and cloud engagements."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.quotes.map((q) => (
            <blockquote
              key={q.quote.slice(0, 40)}
              className="rounded-2xl border-l-4 border-brand-600 bg-brand-50/60 p-6 text-stone-800"
            >
              <p className="text-sm italic leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
              <footer className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-800">
                {q.attribution}
              </footer>
            </blockquote>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="about"
        eyebrow="Who we are"
        title="FlyingSquirrel in practice"
        subtitle="We are a boutique infrastructure consultancy: small by design, senior by default, opinionated about outcomes over theatre."
      >
        <div className="max-w-3xl space-y-4 text-stone-700">
          <p className="leading-relaxed">
            FlyingSquirrel partners with product engineering orgs that outgrew ad-hoc scripts but are not looking for a multi-year “boil the ocean”
            platform program. We deliver sharp diagnostics, concrete runbooks, and automation that fits your repo graph and on-call reality.
          </p>
          <p className="leading-relaxed">
            {principalNote}
          </p>
          <p>
            <Link className="font-semibold text-brand-800 underline-offset-4 hover:underline" to="/about">
              Read the longer story →
            </Link>
          </p>
        </div>
      </PageSection>

      <PageSection
        id="work"
        eyebrow="Selected outcomes"
        title="Work we are proud of"
        subtitle="High-level snapshots — happy to go deeper under NDA when there is a fit."
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {projects.projects.map((p) => (
            <li
              key={p.title}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-stone-900">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        eyebrow="Blog"
        title="Technical notes"
        subtitle="Longer write-ups on migrations, edge cases, and lessons from production will land here first."
      >
        <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-stone-300 bg-stone-50/80 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-600">
            We are standing up a fresh publishing pipeline with this site refresh — watch this space.
          </p>
          <Link
            className="inline-flex items-center justify-center rounded-lg border border-brand-700 bg-white px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            to="/blog"
          >
            Go to blog →
          </Link>
        </div>
      </PageSection>

      <PageSection
        id="contact"
        eyebrow="Next step"
        title={contactLead.title}
        subtitle={contactLead.body}
        className="border-b-0"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <PrimaryButton href={contactLead.email}>Email {contactLead.emailDisplay}</PrimaryButton>
          <span className="text-sm text-stone-500">
            Typical response within one business day for serious inquiries.
          </span>
        </div>
      </PageSection>
    </Layout>
  );
}
