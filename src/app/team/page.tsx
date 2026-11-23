import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { team } from "@/lib/site";

export const metadata: Metadata = { title: "Our Team" };

const tones = [
  "from-teal to-ink",
  "from-coral/70 to-teal-deep",
  "from-mint/80 to-teal",
  "from-ink-2 to-teal",
  "from-teal-deep to-coral/60",
  "from-mint/70 to-ink",
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people behind"
        accent="your care."
        crumbs={[{ label: "Doctor", href: "/doctor" }, { label: "Our team" }]}
        intro="Specialists, nurses, dietitians and coordinators — working as one team so your visit feels effortless."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <article key={m.name} className="reveal group" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br ${tones[i % tones.length]}`}>
                <span className="absolute inset-0 grid place-items-center font-serif text-8xl text-white/20 italic transition duration-500 group-hover:scale-110">
                  {m.initials}
                </span>
                <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur">
                  Photo placeholder
                </span>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
                  <p className="text-lg font-semibold">{m.name}</p>
                  <p className="text-sm text-teal">{m.role}</p>
                  <p className="mt-1 text-xs text-ink/50">{m.focus}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-20 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-ink p-8 text-white sm:p-12 md:flex-row md:items-center">
          <p className="max-w-xl font-serif text-3xl italic sm:text-4xl">One team. One plan. One point of contact.</p>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 font-medium text-ink hover:bg-white">
            Book a consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
