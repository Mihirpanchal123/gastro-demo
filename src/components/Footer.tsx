import Link from "next/link";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Nav";
import { AskAIButton } from "./ChatWidget";
import { clinic, treatments } from "@/lib/site";

const columns = [
  {
    title: "Treatments",
    links: treatments.slice(0, 6).map((t) => ({ label: t.name, href: `/treatments/${t.slug}` })),
  },
  {
    title: "Clinic",
    links: [
      { label: "Doctor profile", href: "/doctor" },
      { label: "Our team", href: "/team" },
      { label: "Locations", href: "/locations" },
      { label: "Gallery", href: "/gallery" },
      { label: "Videos", href: "/videos" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Book appointment", href: "/book" },
      { label: "Patient education", href: "/patient-education" },
      { label: "Brochure", href: "/brochure" },
      { label: "News & events", href: "/news" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = ["Instagram", "YouTube", "Facebook", "LinkedIn"];

export default function Footer() {
  return (
    <>
      <footer className="mt-24 rounded-t-[2.5rem] bg-ink pt-20 pb-28 text-white sm:pb-12 print:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <p className="max-w-3xl font-serif text-5xl leading-[1.05] italic sm:text-7xl">
              Feel lighter. <span className="text-mint">Live better.</span>
            </p>
            <Link
              href="/book"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-mint px-7 py-4 font-medium text-ink transition hover:bg-white"
            >
              <CalendarCheck className="h-5 w-5" /> Book a consultation
            </Link>
          </div>

          <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm text-white/50">
                Gastroenterology, hepatology &amp; advanced endoscopy.
              </p>
              <div className="mt-6 space-y-1.5 text-sm text-white/75">
                <p>{clinic.phone}</p>
                <p>{clinic.email}</p>
                <p className="text-white/50">{clinic.hours}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a key={s} href="#" className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-mint hover:text-mint">
                    {s}
                  </a>
                ))}
              </div>
            </div>
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm text-white/40">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-white/75 transition hover:text-mint">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
            <p>© Lumen Digestive Care · Design concept</p>
            <p>All names, figures, reviews and contact details are placeholders.</p>
          </div>
        </div>
      </footer>

      {/* Mobile quick-action bar (desktop floating buttons live in ChatWidget) */}
      <div className="glass fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 gap-1 rounded-2xl bg-ink/85 p-1.5 text-white sm:hidden print:hidden">
        <a href={clinic.phoneHref} className="flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] hover:bg-white/10">
          <Phone className="h-5 w-5" /> Call
        </a>
        <Link href="/book" className="flex flex-col items-center gap-1 rounded-xl bg-mint py-2 text-[11px] font-medium text-ink">
          <CalendarCheck className="h-5 w-5" /> Book
        </Link>
        <AskAIButton className="flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] text-mint hover:bg-white/10" />
        <a href={clinic.whatsapp} className="flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] hover:bg-white/10">
          <MessageCircle className="h-5 w-5" /> WhatsApp
        </a>
      </div>
    </>
  );
}
