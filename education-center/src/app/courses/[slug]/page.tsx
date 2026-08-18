import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Phone } from "lucide-react";
import { courses, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  return {
    title: course ? `${course.name} | ${site.name}` : site.name,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/#courses"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        <ArrowLeft className="size-4" />
        返回課程列表
      </Link>

      <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">
        {/* 課程相片 */}
        {course.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.image}
            alt={course.name}
            className="h-56 w-full object-cover sm:h-72"
          />
        ) : (
          <div
            className={cn(
              "flex h-56 w-full items-center justify-center bg-gradient-to-br sm:h-72",
              course.gradient
            )}
          >
            <span className="text-8xl drop-shadow-sm">{course.emoji}</span>
          </div>
        )}

        <div className="p-6 sm:p-10">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {course.tag}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {course.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {course.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 rounded-2xl bg-slate-50 p-5">
            <div>
              <p className="text-sm text-slate-500">課程收費</p>
              <p className="text-2xl font-extrabold text-indigo-600">
                {course.price}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">堂數</p>
              <p className="flex items-center gap-1.5 text-2xl font-extrabold text-slate-900">
                <Clock className="size-5 text-slate-400" />
                {course.duration}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-800">
            📌 課程詳情頁正在製作中，敬請期待！如需查詢開班時間、名額或任何
            課程問題，歡迎直接聯絡我們。
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-colors hover:bg-indigo-700"
            >
              <Phone className="size-4" />
              {site.phone}
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition-colors hover:ring-indigo-300"
            >
              聯絡我們
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
