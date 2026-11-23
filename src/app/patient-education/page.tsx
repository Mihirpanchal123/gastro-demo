import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, FileDown, FileText } from "lucide-react";
import PageHero from "@/components/PageHero";
import { guides, posts } from "@/lib/site";

export const metadata: Metadata = { title: "Patient Education" };

const downloads = [
  { title: "Clinic services brochure", meta: "All treatments, fees & locations", href: "/brochure" },
  { title: "Colonoscopy prep sheet", meta: "Printable, step-by-step", href: "/brochure" },
  { title: "Weight-loss programme guide", meta: "Endoscopic options explained", href: "/brochure" },
];

export default function PatientEducationPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient education"
        title="Know what to expect,"
        accent="every step."
        crumbs={[{ label: "Patients" }, { label: "Patient education" }]}
        intro="Simple preparation guides, aftercare checklists and downloads — so you arrive confident and recover well."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-5 md:grid-cols-2">
          {guides.map((g, i) => (
            <article key={g.title} className="reveal rounded-[2rem] border border-ink/8 bg-white p-8" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <span className="font-serif text-5xl text-teal/25 italic">0{i + 1}</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{g.title}</h2>
              <ul className="mt-6 space-y-3">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-ink/75">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Downloads */}
        <div id="brochures" className="reveal mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium tracking-widest text-teal uppercase">Downloads</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              Guides you can <span className="font-serif font-normal text-teal italic">keep.</span>
            </h2>
            <p className="mt-4 max-w-sm text-ink/60">Print them, save them, or share them with family.</p>
          </div>
          <div className="space-y-3">
            {downloads.map((d) => (
              <Link key={d.title} href={d.href} className="group flex items-center gap-5 rounded-2xl bg-white p-5 transition hover:shadow-lg hover:shadow-teal/5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-coral/15 text-coral">
                  <FileText className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{d.title}</span>
                  <span className="text-sm text-ink/50">{d.meta}</span>
                </span>
                <FileDown className="h-5 w-5 text-ink/30 transition group-hover:text-teal" />
              </Link>
            ))}
          </div>
        </div>

        {/* Related reading */}
        <div className="reveal mt-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-tight">Helpful reading</h2>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-teal">
              All articles <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-ink/8 bg-white p-6 transition hover:border-teal/40">
                <p className="text-xs tracking-wider text-teal uppercase">{p.category}</p>
                <p className="mt-2 font-medium">{p.title}</p>
                <p className="mt-2 text-sm text-ink/50">{p.read} min read</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
