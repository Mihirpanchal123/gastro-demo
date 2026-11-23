import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PrintButton from "@/components/PrintButton";
import { clinic, doctor, locations, pricing, treatments } from "@/lib/site";

export const metadata: Metadata = { title: "Clinic Brochure" };

export default function BrochurePage() {
  return (
    <>
      <div className="print:hidden">
        <PageHero
          eyebrow="Brochure"
          title="Our services,"
          accent="at a glance."
          crumbs={[{ label: "Patients" }, { label: "Brochure" }]}
          intro="Preview the clinic brochure below, then save it as a PDF to keep or share."
        >
          <div className="mt-9">
            <PrintButton />
          </div>
        </PageHero>
      </div>

      {/* The printable brochure "sheet" */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 print:max-w-none print:p-0">
        <article className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-ink/10 print:rounded-none print:shadow-none">
          <header className="bg-ink p-10 text-white print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-mint to-teal">
                <span className="h-4 w-4 rounded-full border-2 border-ink" />
              </span>
              <span className="text-lg font-semibold">{clinic.name}</span>
            </div>
            <p className="mt-10 font-serif text-5xl leading-tight italic">Digestive health, reimagined.</p>
            <p className="mt-3 text-white/65">{doctor.name} · {doctor.title}</p>
          </header>

          <div className="p-10">
            <h2 className="text-sm font-medium tracking-widest text-teal uppercase">Treatments</h2>
            <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {treatments.map((t) => (
                <div key={t.slug} className="break-inside-avoid">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-ink/60">{t.summary}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-sm font-medium tracking-widest text-teal uppercase">Indicative fees</h2>
            <table className="mt-4 w-full text-sm">
              <tbody>
                {pricing.map((p) => (
                  <tr key={p.name} className="border-b border-ink/8">
                    <td className="py-2.5">{p.name}</td>
                    <td className="py-2.5 text-right font-medium">{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="mt-12 text-sm font-medium tracking-widest text-teal uppercase">Visit us</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {locations.map((l) => (
                <div key={l.name} className="text-sm">
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-ink/60">{l.address}</p>
                  <p className="text-ink/60">{l.hours}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-between gap-4 rounded-2xl bg-mist p-6 text-sm">
              <span><strong>Appointments:</strong> {clinic.phone}</span>
              <span><strong>Email:</strong> {clinic.email}</span>
              <span><strong>Emergency:</strong> 24×7</span>
            </div>
            <p className="mt-6 text-center text-xs text-ink/40">Design concept — all details are placeholders.</p>
          </div>
        </article>
      </section>
    </>
  );
}
