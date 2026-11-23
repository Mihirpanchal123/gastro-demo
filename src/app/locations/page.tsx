import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Navigation } from "lucide-react";
import PageHero from "@/components/PageHero";
import MapArt from "@/components/MapArt";
import { areas, locations } from "@/lib/site";

export const metadata: Metadata = { title: "Locations" };

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Two clinics,"
        accent="close to you."
        crumbs={[{ label: "Patients" }, { label: "Locations" }]}
        intro="Visit our main clinic for procedures and full diagnostics, or the east branch for evening consultations and follow-ups."
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <MapArt className="reveal aspect-[16/10] sm:aspect-[21/9]" />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {locations.map((l, i) => (
            <article key={l.name} className="reveal rounded-[2rem] border border-ink/8 bg-white p-8" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm ${i ? "text-coral" : "text-teal"}`}>{l.area}</p>
                  <h2 className="mt-1 text-3xl font-semibold tracking-tight">{l.name}</h2>
                </div>
                <span className={`h-3 w-3 shrink-0 rounded-full ${i ? "bg-coral" : "bg-teal"}`} />
              </div>
              <ul className="mt-6 space-y-3 text-ink/70">
                <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-teal" />{l.address}</li>
                <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-teal" />{l.hours}</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {l.services.map((s) => (
                  <span key={s} className="rounded-full bg-mist px-3 py-1.5 text-xs">{s}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-white hover:bg-teal">
                  <Navigation className="h-4 w-4" /> Get directions
                </a>
                <Link href="/book" className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm hover:border-teal hover:text-teal">
                  Book here
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Areas served — local landing pages */}
        <div className="reveal mt-24">
          <p className="text-sm font-medium tracking-widest text-teal uppercase">Areas we serve</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Find a gastroenterologist <span className="font-serif font-normal text-teal italic">near you.</span>
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/locations/${a.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-ink/8 bg-white px-6 py-5 transition hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5"
              >
                <span>
                  <span className="block font-medium">{a.name}</span>
                  <span className="text-sm text-ink/50">~{a.minutes} min to {a.clinic}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-ink/30 transition group-hover:text-teal" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
