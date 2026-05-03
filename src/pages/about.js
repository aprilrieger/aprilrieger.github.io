import Layout from "../components/layout";
import { SeoMeta } from "../components/seo";
import site from "../../content/site.json";

export const Head = () => (
  <SeoMeta title="About · FlyingSquirrel" description="FlyingSquirrel blends hands-on Kubernetes, cloud economics, and engineering empathy into focused consulting engagements." pathname="/about" />
);

export default function AboutPage() {
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">About</p>
        <h1 className="mt-2 text-3xl font-bold text-stone-900">FlyingSquirrel, in more detail</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-stone-700">
          <p>
            <strong>{site.brand.displayName}</strong> is a boutique infrastructure practice. We work with teams that must keep shipping while
            untangling sprawl: too many clusters, surprise AWS line items, pipelines that only one person understands, or upgrades that keep
            sliding every quarter.
          </p>
          <p>
            Our bias is toward <strong>integration</strong> — we read your docs, Terraform layout, Helm chart graph, and how humans actually
            deploy before proposing changes. The goal is infra that survives on-call nights, not slide decks nobody can operate.
          </p>
          <p>
            {site.principalNote}
          </p>
          <p>
            Typical modes include advisory spikes, remediation sprints alongside your engineers, or longer fractional platform leadership where
            the scope stays deliberately narrow until metrics move.
          </p>
        </div>
      </article>
    </Layout>
  );
}
