import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Sparkles } from "lucide-react";
import { site, withBasePath } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景：柔和漸層（之後可換成公司背景相片 public/images/hero-bg.jpg） */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-amber-50" />
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-amber-200/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-indigo-100">
            <Sparkles className="size-4" />
            {site.ageGroup}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            讓孩子從小
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              愛上學習
            </span>
            ，贏在起跑線！
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            結合學術基礎與科技啟發，透過有趣、互動及生活化的教學方式，
            讓 5 至 9 歲的孩子在輕鬆愉快中成長與進步。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              瀏覽課程
            </Link>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-0.5 hover:ring-indigo-300"
            >
              <GraduationCap className="size-5 text-indigo-600" />
              {site.phone}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-violet-600 opacity-20 blur-2xl" />
          <div className="flex aspect-square items-center justify-center rounded-[2rem] bg-white/70 p-10 shadow-xl shadow-indigo-900/5 ring-1 ring-white/60 backdrop-blur">
            <Image
              src={withBasePath(site.logo)}
              alt={`${site.name} 標誌`}
              width={320}
              height={320}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
