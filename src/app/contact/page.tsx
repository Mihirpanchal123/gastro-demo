import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone, Siren } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import MapArt from "@/components/MapArt";
import Faq from "@/components/Faq";
import { clinic, locations } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

const channels = [
  { icon: Phone, label: "Call us", value: clinic.phone, href: clinic.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: clinic.whatsapp },
  { icon: Mail, label: "Email", value: clinic.email, href: `mailto:${clinic.email}` },
  { icon: Siren, label: "Emergency", value: clinic.emergency, href: clinic.phoneHref },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're here"
        accent="to help."
        crumbs={[{ label: "Contact" }]}
        intro="Call, message or drop by. A real person from our team will get back to you quickly."
      >
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} className="glass group rounded-2xl p-5 transition hover:bg-white/15">
              <Icon className="h-5 w-5 text-mint" />
              <p className="mt-4 text-sm text-white/55">{label}</p>
              <p className="font-medium">{value}</p>
            </a>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Send us a <span className="font-serif font-normal text-teal italic">message.</span>
            </h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <div className="reveal space-y-4">
            <MapArt className="aspect-[4/3]" />
            {locations.map((l) => (
              <div key={l.name} className="rounded-2xl bg-white p-6">
                <p className="font-semibold">{l.name}</p>
                <p className="mt-2 flex gap-2.5 text-sm text-ink/65"><MapPin className="h-4 w-4 shrink-0 text-teal" />{l.address}</p>
                <p className="mt-1.5 flex gap-2.5 text-sm text-ink/65"><Clock className="h-4 w-4 shrink-0 text-teal" />{l.hours}</p>
              </div>
            ))}
            <Link href="/locations" className="block text-center text-sm text-teal hover:underline">
              View all locations &amp; areas served
            </Link>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
