/** Use inside export const Head = () => … */
export function SeoMeta({
  title,
  description,
  pathname = `/`,
  noIndex = false,
}) {
  const fullTitle =
    title || `FlyingSquirrel · Infrastructure & Kubernetes consulting`;
  const desc =
    description ||
    `FlyingSquirrel helps engineering teams stabilize Kubernetes, tame cloud bills, and ship with confidence — without vanity rewrites.`;
  const siteUrl = `https://aprilrieger.github.io`;
  const pathSuffix =
    pathname === `/` ? `` : pathname.endsWith(`/`) ? pathname : `${pathname}/`;
  const canonical = `${siteUrl}${pathSuffix}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={canonical} />
    </>
  );
}
