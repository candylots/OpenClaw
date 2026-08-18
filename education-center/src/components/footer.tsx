import Image from "next/image";
import Link from "next/link";
import { nav, site, withBasePath } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-2.5">
              <Image
                src={withBasePath(site.logo)}
                alt={`${site.name} 標誌`}
                width={36}
                height={36}
                className="size-9 rounded-lg object-contain"
              />
              <span className="font-bold text-slate-900">{site.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-500">
              {site.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="頁尾選單">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-center text-sm text-slate-500 md:text-right">
            <p>{site.address}</p>
            <p className="mt-1">
              {site.phone} · {site.email}
            </p>
            <p className="mt-1">{site.website}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {site.name} 版權所有
        </div>
      </div>
    </footer>
  );
}
