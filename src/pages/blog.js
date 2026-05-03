import { Link } from "gatsby";
import Layout from "../components/layout";
import { SeoMeta } from "../components/seo";
import site from "../../content/site.json";

export const Head = () => (
  <SeoMeta
    title="Blog · FlyingSquirrel"
    description="Long-form notes on Kubernetes, cloud economics, and delivery infrastructure from FlyingSquirrel."
    pathname="/blog/"
  />
);

export default function BlogPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Blog</p>
        <h1 className="mt-2 text-3xl font-bold text-stone-900">Technical notes</h1>
        <p className="mt-4 text-stone-600">
          We are wiring up MDX publishing as part of this site refresh. Until then, find us on{" "}
          {site.social.medium ? (
            <a className="font-semibold text-brand-800 hover:underline" href={site.social.medium}>
              Medium
            </a>
          ) : (
            "Medium"
          )}{" "}
          and{" "}
          {site.social.github ? (
            <a className="font-semibold text-brand-800 hover:underline" href={site.social.github}>
              GitHub
            </a>
          ) : (
            "GitHub"
          )}
          .
        </p>
        <p className="mt-8">
          <Link className="font-semibold text-brand-800 hover:underline" to="/">
            ← Back home
          </Link>
        </p>
      </div>
    </Layout>
  );
}
