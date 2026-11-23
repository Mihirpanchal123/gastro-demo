import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Car, Clock, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import MapArt from "@/components/MapArt";
import { areas, getArea, locations, treatments } from "@/lib/site";

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata(props: PageProps<"/locations/[area]">): Promise<Metadata> {
  const { area } = await props.params;
  const a = getArea(area);
  return a ? { title: `Gastroenterologist near ${a.name}` } : {};
}

export default async function AreaPage(props: PageProps<"/locations/[area]">) {
  const { area } = await props.params;
  const a = getArea(area);
  if (!a) notFound();
  const clinicInfo = locations.find((l) => l.name === a.clinic) ?? locations[0];

  return (
    <>
      <PageHero
        eyebrow={`Serving ${a.name}`}
        title={`Gastroenterologist near`}
        accent={`${a.name}.`}
        crumbs={[{ label: "Locations", href: "/locations" }, { label: a.name }]}
        intro={`Expert gut and liver care is about ${a.minutes} minutes away from ${a.name}, at our ${a.clinic.toLowerCase()}.`}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 font-medium text-ink hover:bg-white">
            Book a visit <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm">
            <Car className="h-4 w-4 text-mint" /> ~{a.minutes} min drive
          </span>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <MapArt pins={1} className="reveal min-h-80" />
          <div className="reveal rounded-[2rem] bg-white p-8">
            <p className="text-sm text-teal">Nearest clinic</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">{clinicInfo.name}</h2>
            <ul className="mt-6 space-y-3 text-ink/70">
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-teal" />{clinicInfo.address}</li>
              <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-teal" />{clinicInfo.hours}</li>
            </ul>
            <p className="mt-6 leading-relaxed text-ink/65">
              Patients from {a.name} visit us for everything from first consultations about acidity and
              bloating to advanced endoscopic procedures. Video consultations are also available if you&apos;d
              prefer not to travel for a follow-up.
            </p>
          </div>
        </div>

        <div className="reveal mt-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Popular treatments for patients in <span className="font-serif font-normal text-teal italic">{a.name}</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.slice(0, 6).map((t) => {
              const Icon = t.icon;
              return (
                <Link key={t.slug} href={`/treatments/${t.slug}`} className="group flex items-center gap-4 rounded-2xl border border-ink/8 bg-white p-5 transition hover:border-teal/40">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist text-teal group-hover:bg-ink group-hover:text-mint">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium">{t.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="reveal mt-16 flex flex-wrap gap-2">
          <span className="mr-2 self-center text-sm text-ink/50">Other areas:</span>
          {areas.filter((x) => x.slug !== a.slug).map((x) => (
            <Link key={x.slug} href={`/locations/${x.slug}`} className="rounded-full border border-ink/12 bg-white px-4 py-2 text-sm hover:border-teal hover:text-teal">
              {x.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
