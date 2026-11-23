import { ArrowRight, CalendarCheck, Star, Video, ShieldCheck, Sparkles } from "lucide-react";

const stats = [
  { value: "15+", label: "Years of practice" },
  { value: "25k", label: "Procedures done" },
  { value: "4.9", label: "Patient rating" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden rounded-b-[2.5rem] bg-ink pt-36 pb-20 text-white sm:pb-28 lg:pt-44">
      <div className="aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="grid-lines absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div>
          <div className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-sm text-white/80">
            <span className="relative flex h-2.5 w-2.5 text-mint">
              <span className="pulse-dot relative h-2.5 w-2.5 rounded-full bg-mint" />
            </span>
            Accepting new patients this week
          </div>

          <h1 className="mt-7 text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
            Digestive health,
            <br />
            <span className="text-gradient font-serif text-[1.08em] font-normal tracking-[-0.02em] italic">
              reimagined.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            Advanced gastroenterology, hepatology and painless endoscopy — delivered with the
            clarity, speed and warmth you&apos;d expect from modern care.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 font-medium text-ink transition hover:bg-white"
            >
              Book a consultation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#symptoms"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 font-medium text-white transition hover:bg-white/15"
            >
              <Sparkles className="h-4 w-4 text-mint" />
              Check your symptoms
            </a>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-sm text-white/55">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual composition */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-2 via-teal-deep to-ink">
            {/* Orbiting rings */}
            <div className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 400 400" className="spin-slow h-full w-full opacity-60" aria-hidden>
                <circle cx="200" cy="200" r="150" fill="none" stroke="rgb(159 231 210 / 0.25)" strokeDasharray="2 8" />
                <circle cx="200" cy="200" r="110" fill="none" stroke="rgb(255 255 255 / 0.12)" />
                <circle cx="200" cy="50" r="5" fill="#9fe7d2" />
                <circle cx="310" cy="200" r="3.5" fill="#ff7a59" />
              </svg>
            </div>
            {/* Glowing core */}
            <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-mint via-teal to-coral/70 opacity-90 blur-[2px]" />
            <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.7),transparent_45%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />
            <p className="absolute right-6 bottom-6 left-6 font-serif text-2xl leading-tight text-white/90 italic">
              &ldquo;Care that listens before it treats.&rdquo;
            </p>
          </div>

          {/* Floating cards */}
          <div className="glass float-slow absolute top-8 -left-4 w-60 rounded-2xl bg-ink/40 p-4 shadow-2xl sm:-left-10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint/20 text-mint">
                <CalendarCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-white/55">Next available</p>
                <p className="text-sm font-medium">Today · 5:30 PM</p>
              </div>
            </div>
          </div>

          <div className="glass float-slower absolute top-1/3 -right-3 w-52 rounded-2xl bg-ink/40 p-4 shadow-2xl sm:-right-8">
            <div className="flex items-center gap-1 text-coral">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-2 text-2xl font-semibold">4.9 / 5</p>
            <p className="text-xs text-white/55">from 2,400+ patient reviews</p>
          </div>

          <div className="glass float-slow absolute bottom-24 -left-3 w-56 rounded-2xl bg-ink/40 p-4 shadow-2xl sm:-left-12">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral/20 text-coral">
                <Video className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">Video consult</p>
                <p className="text-xs text-white/55">Connect in ~10 minutes</p>
              </div>
            </div>
          </div>

          <div className="glass absolute -right-2 bottom-28 hidden items-center gap-2 rounded-full bg-ink/40 py-2 pr-4 pl-2 text-xs shadow-2xl sm:flex">
            <ShieldCheck className="h-5 w-5 text-mint" />
            Painless sedation endoscopy
          </div>
        </div>
      </div>
    </section>
  );
}
