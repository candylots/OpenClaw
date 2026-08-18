import { CheckCircle2, School } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { about } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {/* TODO: 放入中心環境相片後改為 <Image src={about.image} .../> */}
          <div className="flex aspect-[4/3] items-center justify-center rounded-[2rem] bg-gradient-to-br from-indigo-100 via-violet-50 to-amber-100 ring-1 ring-indigo-100">
            <School className="size-20 text-indigo-300" strokeWidth={1.2} />
            <span className="sr-only">中心環境相片（待提供）</span>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow={about.title}
            title={about.heading}
          />
          {about.body.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
          <ul className="mt-6 space-y-3">
            {about.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
