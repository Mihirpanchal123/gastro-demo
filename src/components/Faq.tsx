import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal">
          <p className="text-sm font-medium tracking-widest text-teal uppercase">FAQ</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Questions, <span className="font-serif font-normal text-teal italic">answered.</span>
          </h2>
          <p className="mt-5 max-w-sm text-ink/60">
            Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — a real person replies
            within minutes.
          </p>
        </div>
        <div className="reveal divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition group-open:rotate-45 group-open:border-teal group-open:bg-teal group-open:text-white">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink/65">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
