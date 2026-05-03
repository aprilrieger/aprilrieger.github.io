import { Link } from "gatsby";
import site from "../../content/site.json";

const NAV = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            className="text-lg font-bold tracking-tight text-brand-800 transition hover:text-brand-700"
            to="/"
          >
            {site.brand.displayName}
          </Link>
          <nav aria-label="Main" className="hidden md:flex md:items-center md:gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                className="text-sm font-medium text-stone-600 transition hover:text-brand-700"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="rounded-lg bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 md:hidden"
            href="/#contact"
          >
            Contact
          </a>
        </div>
        <div className="border-t border-stone-100 md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-wrap gap-3 px-4 py-3 text-xs font-medium uppercase tracking-wide text-stone-600 sm:px-6">
            {NAV.map((item) => (
              <a key={item.href} className="hover:text-brand-700" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-stone-200 bg-stone-100/70">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm text-stone-600">
            © {new Date().getFullYear()} {site.brand.displayName}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-stone-600">
            <Link className="hover:text-brand-700" to="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-brand-700" to="/imprint">
              Imprint
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
