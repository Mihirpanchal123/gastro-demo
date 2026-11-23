import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Plus, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { clinic, getTreatment, treatments } from "@/lib/site";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const t = getTreatment(slug);
  return t ? { title: t.name, description: t.summary } : {};
}

export default async function TreatmentPage(props: PageProps<"/treatments/[slug]">) {
  const { slug } = await props.params;
  const t = getTreatment(slug);
  if (!t) notFound();

  const Icon = t.icon;
  const others = treatments.filter((x) => x.slug !== t.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Treatment"
        title={t.name}
        crumbs={[{ label: "Treatments", href: "/treatments" }, { label: t.name }]}
        intro={t.summary}
      >
        {/* Quick facts */}
        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {t.facts.map((f) => (
            <div key={f.label} className="glass rounded-2xl p-4">
              <dt className="text-xs text-white/50">{f.label}</dt>
              <dd className="mt-1 font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Main column */}
          <div>
            <div className="reveal">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-mint">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-serif text-4xl leading-tight italic sm:text-5xl">{t.tagline}</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/70">
                {t.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="reveal mt-16">
              <h3 className="text-2xl font-semibold tracking-tight">Who is it for?</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.indications.map((x) => (
                  <li key={x} className="flex items-start gap-3 rounded-2xl border border-ink/8 bg-white p-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint/60 text-teal-deep">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-ink/75">{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal mt-16">
              <h3 className="text-2xl font-semibold tracking-tight">What to expect</h3>
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                {t.process.map((s, i) => (
                  <li key={s.title} className="relative rounded-3xl bg-sand/70 p-6">
                    <span className="font-serif text-5xl text-teal/30 italic">0{i + 1}</span>
                    <p className="mt-3 text-lg font-semibold">{s.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="reveal mt-16">
              <h3 className="text-2xl font-semibold tracking-tight">Common questions</h3>
              <div className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {t.faqs.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 transition group-open:rotate-45 group-open:border-teal group-open:bg-teal group-open:text-white">
                        <Plus className="h-4 w-4" />
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-ink/65">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="reveal rounded-[2rem] bg-ink p-8 text-white">
              <p className="text-sm text-mint">Ready to talk?</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">Talk to us about {t.name}</p>
              <Link href="/book" className="mt-7 flex items-center justify-center gap-2 rounded-full bg-mint py-4 font-medium text-ink hover:bg-white">
                Book now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={clinic.phoneHref} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/15 py-4 text-sm hover:bg-white/10">
                <Phone className="h-4 w-4" /> {clinic.phone}
              </a>
            </div>
            <div className="reveal mt-4 rounded-[2rem] border border-ink/8 bg-white p-6">
              <p className="text-sm font-medium text-ink/50">Related treatments</p>
              <ul className="mt-3 space-y-1">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/treatments/${o.slug}`} className="group flex items-center justify-between rounded-xl px-3 py-3 hover:bg-mist">
                      {o.name}
                      <ArrowRight className="h-4 w-4 text-ink/30 transition group-hover:translate-x-1 group-hover:text-teal" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
