import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { treatments } from "@/lib/site";

export const metadata: Metadata = { title: "Treatments" };

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Every gut & liver treatment,"
        accent="one expert team."
        crumbs={[{ label: "Treatments" }]}
        intro="From your first consultation to advanced endoscopic procedures — explore what we offer and what to expect."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t, i) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.slug}
                href={`/treatments/${t.slug}`}
                className="reveal group flex flex-col rounded-[2rem] border border-ink/8 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-xl hover:shadow-teal/10"
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-mist text-teal transition group-hover:bg-ink group-hover:text-mint">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-serif text-4xl text-ink/10 italic">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="mt-8 text-2xl font-semibold tracking-tight">{t.name}</h2>
                <p className="mt-1 font-serif text-lg text-teal italic">{t.tagline}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/60">{t.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.facts.slice(0, 2).map((f) => (
                    <span key={f.label} className="rounded-full bg-mist px-3 py-1 text-xs text-ink/65">
                      {f.label}: {f.value}
                    </span>
                  ))}
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
                  Learn more <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
