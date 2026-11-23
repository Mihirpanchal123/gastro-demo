import { CalendarCheck, ClipboardList, ScanLine, Smartphone } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book in 60 seconds",
    text: "Pick a slot online or on WhatsApp. Instant confirmation, no phone queues.",
  },
  {
    icon: ClipboardList,
    title: "Unhurried consultation",
    text: "A full history, examination and a clear plan — explained in your language.",
  },
  {
    icon: ScanLine,
    title: "Same-day procedures",
    text: "Most tests and endoscopies done on the same visit under gentle sedation.",
  },
  {
    icon: Smartphone,
    title: "Reports on your phone",
    text: "Digital reports, images and follow-up reminders sent straight to WhatsApp.",
  },
];

export default function Journey() {
  return (
    <section className="bg-sand/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-widest text-teal uppercase">Your visit</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple, from <span className="font-serif font-normal text-teal italic">first click</span> to follow-up.
          </h2>
        </div>

        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent lg:block" aria-hidden />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="reveal relative rounded-3xl bg-white p-7 shadow-sm"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-mint">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-serif text-5xl text-ink/10 italic">0{i + 1}</span>
              </div>
              <h3 className="mt-8 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
