import { Award, HeartHandshake, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { teachers } from "@/lib/site";

export function Teachers() {
  const { principal } = teachers;
  return (
    <section
      id="teachers"
      className="scroll-mt-20 bg-gradient-to-b from-amber-50/60 to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={teachers.title}
          title={teachers.heading}
          description={teachers.intro}
        />

        <div className="mx-auto max-w-md">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <div className="flex flex-col items-center text-center">
              {/* TODO: 放入校長相片後改為 <Image src={principal.image} .../> */}
              <div className="mb-5 flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 ring-4 ring-indigo-50">
                <UserRound className="size-14 text-indigo-400" strokeWidth={1.3} />
                <span className="sr-only">校長相片（待提供）</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                <Award className="size-3.5" />
                {principal.badge}
              </span>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {principal.name}
              </h3>
              <p className="text-sm font-semibold text-indigo-600">
                {principal.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {principal.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-3xl bg-white/70 p-5 ring-1 ring-slate-100 backdrop-blur">
          <HeartHandshake className="size-8 shrink-0 text-rose-400" />
          <p className="text-sm leading-relaxed text-slate-600">
            教學團隊：所有導師均具備教育熱誠及相關經驗，並經專業培訓，懂得如何與小朋友溝通及引導學習。我們重視耐心與鼓勵，讓每位孩子都能安心學習。
          </p>
        </div>
      </div>
    </section>
  );
}
