import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/** Dark header used at the top of every inner page (keeps the white nav readable). */
export default function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] bg-ink pt-36 pb-16 text-white sm:pb-20 lg:pt-40">
      <div className="aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              {c.href ? (
                <Link href={c.href} className="hover:text-white">{c.label}</Link>
              ) : (
                <span className="text-white/80">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <p className="mt-8 text-sm font-medium tracking-widest text-mint uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)] leading-[1] font-semibold tracking-[-0.035em]">
          {title}{" "}
          {accent && <span className="text-gradient font-serif font-normal tracking-[-0.01em] italic">{accent}</span>}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
