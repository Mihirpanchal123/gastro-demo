import type { Metadata } from "next";
import { ClipboardList, FileText, Pill, UserRound } from "lucide-react";
import PageHero from "@/components/PageHero";
import Booking from "@/components/Booking";

export const metadata: Metadata = { title: "Book an Appointment" };

const bring = [
  { icon: FileText, t: "Previous reports & scans" },
  { icon: Pill, t: "List of current medicines" },
  { icon: ClipboardList, t: "Insurance card, if any" },
  { icon: UserRound, t: "A companion for procedures" },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Book in"
        accent="under a minute."
        crumbs={[{ label: "Book an appointment" }]}
        intro="Pick in-clinic or video, choose a time, and you're done. Confirmation arrives on WhatsApp."
      />

      <div className="py-16 sm:py-20">
        <Booking />
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal rounded-[2rem] bg-sand/70 p-8 sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What to bring <span className="font-serif font-normal text-teal italic">on the day</span>
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bring.map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-teal">
                  <Icon className="h-5 w-5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
