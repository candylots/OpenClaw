import { Gamepad2, Rocket, Sparkles, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { philosophy } from "@/lib/site";

const iconMap = {
  users: Users,
  gamepad: Gamepad2,
  sparkles: Sparkles,
  rocket: Rocket,
} as const;

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="scroll-mt-20 bg-gradient-to-b from-indigo-50/60 to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={philosophy.title}
          title={philosophy.heading}
          description={philosophy.intro}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {philosophy.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div
                key={item.title}
                className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100"
              >
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
