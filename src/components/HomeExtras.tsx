import Link from "next/link";
import { ArrowUpRight, Play, FileDown, ShieldCheck, Clock3, CreditCard, Smartphone } from "lucide-react";
import { pricing, videos, posts, formatDate } from "@/lib/site";
import PostCover from "./PostCover";

/** Transparent, indicative pricing table */
export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal">
          <p className="text-sm font-medium tracking-widest text-teal uppercase">Transparent pricing</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            No surprises, <span className="font-serif font-normal text-teal italic">ever.</span>
          </h2>
          <p className="mt-5 max-w-sm text-ink/60">
            Indicative fees for our most common services. Your exact estimate is shared before any procedure.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {[
              { icon: CreditCard, t: "Cashless insurance" },
              { icon: ShieldCheck, t: "Sterile single-use kits" },
              { icon: Clock3, t: "24×7 emergencies" },
              { icon: Smartphone, t: "Digital reports" },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5">
                <Icon className="h-5 w-5 shrink-0 text-teal" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal overflow-hidden rounded-[2rem] border border-ink/8 bg-white">
          {pricing.map((p, i) => (
            <div
              key={p.name}
              className={`flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-mist/60 sm:px-8 ${
                i ? "border-t border-ink/8" : ""
              }`}
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-ink/50">{p.note}</p>
              </div>
              <p className="text-right font-semibold whitespace-nowrap text-teal">{p.price}</p>
            </div>
          ))}
          <p className="border-t border-ink/8 bg-mist/50 px-6 py-4 text-xs text-ink/50 sm:px-8">
            Sample prices for demonstration only.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Horizontal strip of video cards */
export function VideoStrip() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium tracking-widest text-teal uppercase">Watch &amp; learn</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Real stories, <span className="font-serif font-normal text-teal italic">clear answers.</span>
            </h2>
          </div>
          <Link href="/videos" className="group inline-flex items-center gap-2 text-teal">
            All videos <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
      <div className="mt-12 flex snap-x gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        {videos.slice(0, 6).map((v) => (
          <Link
            key={v.title}
            href="/videos"
            className="group relative aspect-[4/5] w-64 shrink-0 snap-start overflow-hidden rounded-[1.75rem] sm:w-72"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${v.hue} transition duration-500 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <span className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-mint group-hover:text-ink">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
            <span className="absolute top-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">{v.kind}</span>
            <div className="absolute right-5 bottom-5 left-5 text-white">
              <p className="text-lg leading-snug font-medium">{v.title}</p>
              <p className="mt-1 text-xs text-white/60">{v.duration}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Latest blog posts */
export function LatestUpdates() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium tracking-widest text-teal uppercase">From the blog</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Gut health, <span className="font-serif font-normal text-teal italic">made simple.</span>
          </h2>
        </div>
        <Link href="/blog" className="group inline-flex items-center gap-2 text-teal">
          Read the blog <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="reveal group block"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <PostCover post={p} className="aspect-[4/3]" />
            <p className="mt-5 text-xs tracking-wider text-ink/50 uppercase">
              {p.category} · {formatDate(p.date)}
            </p>
            <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight transition group-hover:text-teal">{p.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Brochure download banner */
export function BrochureCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] bg-sand p-8 sm:p-12 md:flex-row md:items-center">
        <div className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-coral/25 blur-3xl" aria-hidden />
        <div className="relative">
          <p className="text-sm font-medium tracking-widest text-teal uppercase">Clinic brochure</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything we offer, <span className="font-serif font-normal italic">in one guide.</span>
          </h2>
        </div>
        <Link
          href="/brochure"
          className="relative inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-medium text-white transition hover:bg-teal"
        >
          <FileDown className="h-5 w-5" /> Download brochure
        </Link>
      </div>
    </section>
  );
}
