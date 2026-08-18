import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Baby,
  CalendarDays,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Sparkles,
  Trophy,
} from "lucide-react";
import { courses, site, withBasePath } from "@/lib/site";
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

  const waMessage = encodeURIComponent(
    `你好！我想查詢「${course.name}」課程報名 🙋`
  );
  const waLink = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${waMessage}`;

  const infoChips = [
    { icon: Baby, label: "適合年齡", value: course.age },
    { icon: Clock, label: "上堂時數", value: course.classLength },
    { icon: CalendarDays, label: "課程堂數", value: course.duration },
    { icon: Trophy, label: "課程收費", value: course.price },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      {/* 返回 */}
      <Link
        href="/#courses"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        <ArrowLeft className="size-4" />
        返回課程列表
      </Link>

      {/* Hero 卡片 */}
      <div className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">
        <div className="relative">
          {/* 課程相片：有相片用相片，否則用漸層 + emoji 佔位 */}
          {course.image ? (
            <div className="relative h-56 w-full sm:h-80">
              <Image
                src={withBasePath(course.image)}
                alt={course.name}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
          ) : (
            <div
              className={cn(
                "flex h-56 w-full items-center justify-center bg-gradient-to-br sm:h-80",
                course.gradient
              )}
            >
              <span className="text-9xl drop-shadow-md">{course.emoji}</span>
            </div>
          )}

          {/* 浮動標籤 */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-indigo-600 shadow-sm backdrop-blur">
              {course.tag}
            </span>
            <span className="rounded-full bg-amber-400/90 px-3 py-1 text-xs font-bold text-amber-900 shadow-sm backdrop-blur">
              小班教學 👧👦
            </span>
          </div>

          {/* 名稱區塊 */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow sm:text-4xl">
              {course.emoji} {course.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow sm:text-base">
              {course.intro}
            </p>
          </div>
        </div>

        {/* 課程資訊 chips */}
        <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4 sm:p-6">
          {infoChips.map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <chip.icon className="size-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-500">
                  {chip.label}
                </p>
                <p className="truncate text-sm font-bold text-slate-900">
                  {chip.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 課程特色 */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
          <Sparkles className="size-6 text-amber-400" />
          課程特色
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {course.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 p-4 ring-1 ring-indigo-100"
            >
              <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
              <span className="font-semibold text-slate-800">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 課程大綱 */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
          📖 課程大綱
        </h2>
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <ol className="space-y-3">
            {course.syllabus.map((item, i) => (
              <li key={item} className="flex items-start gap-4">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-extrabold text-white shadow-sm",
                    course.gradient
                  )}
                >
                  {i + 1}
                </span>
                <span className="pt-1.5 text-slate-700">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 報名 CTA */}
      <section className="mt-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-center text-white shadow-lg shadow-indigo-600/30 sm:p-10">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          心動不如行動，即刻報名！
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-indigo-100 sm:text-base">
          「{course.name}」小班名額有限，歡迎查詢開班時間同剩餘名額。
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-extrabold text-indigo-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <MessageCircle className="size-5" />
            WhatsApp 報名
          </a>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3.5 text-base font-bold text-white ring-1 ring-white/40 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/25"
          >
            <Phone className="size-5" />
            {site.phone}
          </a>
        </div>
        <p className="mt-4 text-xs text-indigo-200">
          或直接到訪：{site.address}
        </p>
      </section>
    </div>
  );
}
