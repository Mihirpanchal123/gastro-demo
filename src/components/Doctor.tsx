import Link from "next/link";
import { ArrowRight, Award, GraduationCap, Languages, Stethoscope } from "lucide-react";

const creds = [
  { icon: GraduationCap, label: "MD, DM Gastroenterology" },
  { icon: Award, label: "Fellowship in Advanced Endoscopy" },
  { icon: Stethoscope, label: "15+ years clinical experience" },
  { icon: Languages, label: "English · हिंदी · ગુજરાતી" },
];

const expertise = ["Therapeutic ERCP", "Endoscopic Ultrasound", "Liver Disease", "IBD", "GI Oncology Screening"];

export default function Doctor() {
  return (
    <section id="doctor" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Portrait placeholder */}
        <div className="reveal relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal via-teal-deep to-ink">
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-mint/30 blur-3xl" aria-hidden />
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-serif text-[10rem] leading-none text-white/15 italic select-none">AM</span>
            </div>
            <p className="absolute top-6 left-6 rounded-full bg-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur">
              Doctor photo goes here
            </p>
          </div>
          <div className="glass-light absolute -right-3 -bottom-8 w-64 rounded-3xl p-5 shadow-2xl shadow-ink/10 sm:-right-8">
            <p className="font-serif text-5xl text-teal italic">25,000+</p>
            <p className="mt-1 text-sm text-ink/60">endoscopic procedures performed with a focus on safety and comfort</p>
          </div>
        </div>

        {/* Bio */}
        <div className="reveal">
          <p className="text-sm font-medium tracking-widest text-teal uppercase">Meet your specialist</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Dr. Aarav Mehta</h2>
          <p className="mt-2 font-serif text-2xl text-ink/60 italic">Consultant Gastroenterologist &amp; Hepatologist</p>

          <p className="mt-7 leading-relaxed text-ink/70">
            Dr. Mehta believes great care starts with a conversation. He takes the time to understand
            your history, explains every finding in plain language, and only recommends procedures
            when they will genuinely change your treatment.
          </p>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {creds.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-4 text-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-teal">
                  <Icon className="h-5 w-5" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            {expertise.map((e) => (
              <span key={e} className="rounded-full bg-ink px-4 py-2 text-sm text-white">
                {e}
              </span>
            ))}
          </div>

          <Link
            href="/doctor"
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-medium transition hover:border-teal hover:text-teal"
          >
            Read full profile
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
