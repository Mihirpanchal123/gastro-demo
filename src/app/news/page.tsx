import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import PageHero from "@/components/PageHero";
import { formatDate, news } from "@/lib/site";

export const metadata: Metadata = { title: "News & Events" };

export default function NewsPage() {
  const [lead, ...rest] = news;
  return (
    <>
      <PageHero
        eyebrow="News & events"
        title="What's happening"
        accent="at Lumen."
        crumbs={[{ label: "Patients" }, { label: "News & events" }]}
        intro="Health camps, community talks, new technology and clinic updates."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        {/* Featured item */}
        <article className="reveal grid overflow-hidden rounded-[2rem] bg-white md:grid-cols-2">
          <div className="relative min-h-64 bg-gradient-to-br from-coral/80 via-teal to-ink">
            <span className="absolute top-6 left-6 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur">Latest</span>
            <span className="absolute bottom-6 left-6 font-serif text-7xl text-white/30 italic">
              {new Date(lead.date + "T00:00:00").getDate()}
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="flex items-center gap-2 text-sm text-teal">
              <CalendarDays className="h-4 w-4" /> {formatDate(lead.date)} · {lead.type}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{lead.title}</h2>
            <p className="mt-4 leading-relaxed text-ink/65">{lead.text}</p>
            <Link href="/contact" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-white hover:bg-teal">
              Register interest <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        {/* Timeline */}
        <ol className="mt-16 space-y-4">
          {rest.map((n, i) => (
            <li
              key={n.title}
              className="reveal grid gap-4 rounded-[1.75rem] border border-ink/8 bg-white p-6 sm:grid-cols-[10rem_1fr] sm:p-8"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div>
                <p className="text-sm text-ink/50">{formatDate(n.date)}</p>
                <span className="mt-2 inline-block rounded-full bg-mist px-3 py-1 text-xs text-teal">{n.type}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{n.title}</h3>
                <p className="mt-2 text-ink/65">{n.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
