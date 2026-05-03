import Layout from "../components/layout";
import { SeoMeta } from "../components/seo";

export const Head = () => (
  <SeoMeta
    title="Privacy · FlyingSquirrel"
    description="Privacy policy for the FlyingSquirrel website."
    pathname="/privacy"
    noIndex
  />
);

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-stone-900">Privacy policy</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-stone-700">
          <p>
            Your privacy matters. <strong>FlyingSquirrel</strong> respects your privacy regarding any information collected through this website
            (hosted at <strong>aprilrieger.github.io</strong>).
          </p>
          <p>
            Personal information is requested only when required to respond to inquiries or deliver a requested service — collected fairly and
            lawfully, and where appropriate with consent. The purpose of collection is explained at the point of asking.
          </p>
          <p>
            Collected information is retained only as long as needed for that purpose. Reasonable safeguards aim to reduce loss, theft, and
            unauthorized access, disclosure, or misuse.
          </p>
          <p>
            Personally identifying information is not sold. It is not shared publicly or with unrelated third parties except where required by
            law.
          </p>
          <p>
            This site may link to external content not operated by FlyingSquirrel; those destinations have their own policies and we do not
            control their practices.
          </p>
          <p>
            You may refuse or limit certain personal information requests, with the understanding that some services may become unavailable
            without it.
          </p>
          <p>
            Continued use of this site signifies acceptance of this policy in its then-current form. Questions may be addressed through the contact
            information on the site.
          </p>
          <p className="text-stone-500">Template basis: GetTerms.io (updated for FlyingSquirrel).</p>
        </div>
      </div>
    </Layout>
  );
}
