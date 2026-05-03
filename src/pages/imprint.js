import Layout from "../components/layout";
import { SeoMeta } from "../components/seo";
import site from "../../content/site.json";

export const Head = () => (
  <SeoMeta
    title="Imprint · FlyingSquirrel"
    description="Legal imprint for FlyingSquirrel."
    pathname="/imprint"
    noIndex
  />
);

export default function ImprintPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-stone-900">Imprint</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-700">
          <section>
            <h2 className="text-lg font-semibold text-stone-900">Information pursuant to § 5 TMG</h2>
            <p className="mt-3">
              FlyingSquirrel
              <br />
              <span className="text-stone-500">[Street and city]</span>
              <br />
              <span className="text-stone-500">[Country]</span>
            </p>
            <p className="mt-3">
              E-mail:{" "}
              <a className="font-medium text-brand-800 underline" href={`mailto:${site.contactLead.emailDisplay}`}>
                {site.contactLead.emailDisplay}
              </a>
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Replace bracketed placeholders with your registered business address once confirmed with counsel.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-900">Liability for contents</h2>
            <p className="mt-3">
              As service providers, we are liable for own contents of these websites according to Sec. 7, paragraph 1 German Telemedia Act (TMG).
              However, according to Sec. 8 to 10 German Telemedia Act (TMG), service providers are not obligated to permanently monitor submitted
              or stored information or to search for evidences that indicate illegal activities.
            </p>
            <p className="mt-3">
              Legal obligations to removing information or to blocking the use of information remain unchallenged. Liability is only possible at the
              time of knowledge about a specific violation of law. Illegal contents will be removed immediately at the time we get knowledge of
              them.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-900">Liability for links</h2>
            <p className="mt-3">
              Our offer includes links to external third-party websites over whose contents we have no influence and for which we cannot guarantee.
              Providers or administrators of linked websites are always responsible for their own contents. Illegal contents were not detected at
              the time of linking; we will remove links immediately upon becoming aware of violations.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-900">Copyright</h2>
            <p className="mt-3">
              Contents published on these websites are subject to applicable copyright laws. Reproduction, editing, distribution, or any use outside
              the scope of copyright law requires written permission. Downloads and copies are permitted for private use only; commercial use
              without permission is prohibited.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
