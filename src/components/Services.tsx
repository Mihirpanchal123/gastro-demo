"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { treatments } from "@/lib/site";

const marqueeItems = [
  "Upper GI Endoscopy",
  "Colonoscopy",
  "ERCP",
  "Endoscopic Ultrasound",
  "Capsule Endoscopy",
  "Fibroscan",
  "Liver Clinic",
  "Polypectomy",
  "Variceal Banding",
  "Manometry",
];

function onMove(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Services() {
  return (
    <>
      {/* Procedure marquee */}
      <div className="relative overflow-hidden py-10" aria-label="Procedures offered">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
        <div className="marquee flex w-max gap-3">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-3 rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm whitespace-nowrap text-ink/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              {m}
            </span>
          ))}
        </div>
      </div>

      <section id="services" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium tracking-widest text-teal uppercase">What we treat</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Complete gut &amp; liver care,{" "}
              <span className="font-serif font-normal text-teal italic">under one roof.</span>
            </h2>
          </div>
          <Link href="/treatments" className="group inline-flex items-center gap-2 text-teal">
            All treatments <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.map((t, i) => {
            const Icon = t.icon;
            const featured = i === 0;
            return (
              <Link
                key={t.slug}
                href={`/treatments/${t.slug}`}
                onMouseMove={onMove}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
                className={`reveal spotlight group flex min-h-60 flex-col justify-between rounded-3xl p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10 ${
                  featured ? "bg-ink text-white sm:col-span-2" : "border border-ink/8 bg-white"
                }`}
              >
                <div className="relative flex items-start justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${
                      featured ? "bg-mint text-ink" : "bg-mist text-teal"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight
                    className={`h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      featured ? "text-white/50" : "text-ink/30"
                    }`}
                  />
                </div>
                <div className="relative mt-10">
                  <h3 className="text-xl font-semibold tracking-tight">{t.name}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${featured ? "text-white/65" : "text-ink/60"}`}>
                    {t.summary}
                  </p>
                </div>
              </Link>
            );
          })}

          {/* CTA tile that completes the bento grid */}
          <a
            href="#symptoms"
            className="reveal group relative flex min-h-60 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-teal to-teal-deep p-7 text-white sm:col-span-2"
          >
            <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-mint/30 blur-3xl" aria-hidden />
            <p className="relative text-sm font-medium tracking-widest text-mint uppercase">Not sure where to start?</p>
            <div className="relative flex items-end justify-between gap-6">
              <p className="max-w-sm font-serif text-3xl leading-tight italic sm:text-4xl">
                Tell us your symptoms — we&apos;ll point you the right way.
              </p>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-mint text-ink transition group-hover:scale-110">
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
