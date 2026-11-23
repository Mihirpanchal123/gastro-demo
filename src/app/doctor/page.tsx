import type { Metadata } from "next";
import Link from "next/link";
import { Award, BadgeCheck, CalendarCheck, Languages, Video } from "lucide-react";
import PageHero from "@/components/PageHero";
import { doctor, treatments } from "@/lib/site";

export const metadata: Metadata = { title: "Doctor Profile" };

export default function DoctorPage() {
  return (
    <>
      <PageHero
        eyebrow="Doctor profile"
        title={doctor.name}
        crumbs={[{ label: "Doctor profile" }]}
        intro={`${doctor.title} · ${doctor.degrees}`}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 font-medium text-ink hover:bg-white">
            <CalendarCheck className="h-4 w-4" /> Book with {doctor.name.split(" ")[1]}
          </Link>
          <Link href="/book" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium text-white hover:bg-white/15">
            <Video className="h-4 w-4 text-mint" /> Video consult
          </Link>
        </div>
      </PageHero>

      {/* Portrait + bio */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal via-teal-deep to-ink">
              <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-mint/30 blur-3xl" aria-hidden />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-serif text-[9rem] leading-none text-white/15 italic select-none">{doctor.initials}</span>
              </div>
              <p className="absolute top-6 left-6 rounded-full bg-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur">
                Doctor photo goes here
              </p>
            </div>
            <dl className="mt-4 grid grid-cols-4 gap-2">
              {doctor.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white p-3 text-center">
                  <dd className="text-2xl font-semibold tracking-tight">{s.value}</dd>
                  <dt className="mt-0.5 text-[11px] leading-tight text-ink/50">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <div className="reveal">
              <h2 className="font-serif text-4xl leading-tight italic sm:text-5xl">
                &ldquo;Understand the person first, then the problem.&rdquo;
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/70">
                {doctor.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-ink/60">
                <Languages className="h-4 w-4 text-teal" /> Consults in English, हिंदी and ગુજરાતી
              </p>
            </div>

            {/* Education timeline */}
            <div className="reveal mt-16">
              <p className="text-sm font-medium tracking-widest text-teal uppercase">Education &amp; training</p>
              <ol className="relative mt-8 space-y-8 border-l border-ink/10 pl-8">
                {doctor.education.map((e) => (
                  <li key={e.title} className="relative">
                    <span className="absolute top-1.5 -left-[2.3rem] h-3 w-3 rounded-full border-2 border-paper bg-teal ring-4 ring-mint/40" />
                    <p className="text-sm text-teal">{e.year}</p>
                    <p className="mt-1 text-lg font-semibold">{e.title}</p>
                    <p className="text-ink/55">{e.place}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Awards & memberships */}
            <div className="reveal mt-16 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-ink p-7 text-white">
                <Award className="h-7 w-7 text-mint" />
                <p className="mt-5 text-lg font-semibold">Awards</p>
                <ul className="mt-3 space-y-2.5 text-sm text-white/70">
                  {doctor.awards.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-ink/8 bg-white p-7">
                <BadgeCheck className="h-7 w-7 text-teal" />
                <p className="mt-5 text-lg font-semibold">Memberships</p>
                <ul className="mt-3 space-y-2.5 text-sm text-ink/65">
                  {doctor.memberships.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Areas of expertise */}
            <div className="reveal mt-16">
              <p className="text-sm font-medium tracking-widest text-teal uppercase">Areas of expertise</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {treatments.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/treatments/${t.slug}`}
                    className="rounded-full border border-ink/12 bg-white px-4 py-2 text-sm transition hover:border-teal hover:text-teal"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
