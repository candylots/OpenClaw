import Image from "next/image";
import Link from "next/link";
import { nav, site, withBasePath } from "@/lib/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={withBasePath(site.logo)}
            alt={`${site.name} 標誌`}
            width={40}
            height={40}
            className="size-10 rounded-xl object-contain"
          />
          <span className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="主選單">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-colors hover:bg-indigo-700"
        >
          立即查詢
        </a>
      </div>
    </header>
  );
}
