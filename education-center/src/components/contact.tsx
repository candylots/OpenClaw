import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { contact, site } from "@/lib/site";

export function Contact() {
  const cards = [
    {
      icon: Phone,
      label: "電話",
      value: site.phone,
      href: `tel:${site.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: site.whatsapp,
      href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`,
    },
    {
      icon: Mail,
      label: "電郵",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MapPin,
      label: "地址",
      value: site.address,
      href: undefined,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={contact.title}
          title={contact.heading}
          description={contact.intro}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const content = (
              <>
                <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <card.icon className="size-5" />
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  {card.label}
                </p>
                <p className="mt-1 break-all text-sm font-bold text-slate-900">
                  {card.value}
                </p>
              </>
            );
            return card.href ? (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-100"
              >
                {content}
              </a>
            ) : (
              <div
                key={card.label}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* 營業時間 */}
        <div className="mx-auto mt-8 max-w-md rounded-3xl bg-slate-900 p-6 text-white">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="size-5 text-amber-400" />
            <h3 className="font-bold">營業時間</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {site.hours.map((h) => (
              <li
                key={h.days}
                className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-slate-300">{h.days}</span>
                <span className="font-semibold">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
