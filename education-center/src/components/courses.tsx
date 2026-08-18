import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { courses } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Courses() {
  return (
    <section id="courses" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="精選課程"
          title="為孩子挑選最合適的課程"
          description="小班互動教學，每班名額有限，歡迎查詢開班時間。"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <article
              key={course.slug}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100"
            >
              {/* 課程相片：有相片用相片，否則用漸層佔位 */}
              {course.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={course.image}
                  alt={course.name}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div
                  className={cn(
                    "flex h-40 items-center justify-center bg-gradient-to-br",
                    course.gradient
                  )}
                >
                  <span className="text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {course.emoji}
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 inline-flex w-fit rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600">
                  {course.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {course.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {course.intro}
                </p>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xl font-extrabold text-indigo-600">
                      {course.price}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="size-3.5" />
                      {course.duration}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-indigo-600"
                >
                  Learn More
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
