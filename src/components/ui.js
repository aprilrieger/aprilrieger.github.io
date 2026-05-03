/** Wrap repeated Tailwind section spacing / width */
export function PageSection({ id, eyebrow, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-28 border-b border-stone-200/80 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <header className="mb-10 max-w-2xl">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{eyebrow}</p>
            ) : null}
            {title ? <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">{title}</h2> : null}
            {subtitle ? <p className="mt-3 text-base leading-relaxed text-stone-600">{subtitle}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function PrimaryButton({ href, children }) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      href={href}
    >
      {children}
    </a>
  );
}

export function GhostButton({ href, children }) {
  return (
    <a
      className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-brand-600 hover:text-brand-800"
      href={href}
    >
      {children}
    </a>
  );
}
