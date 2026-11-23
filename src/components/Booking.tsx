"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { Building2, Video, CheckCircle2, Clock, MapPin, Phone } from "lucide-react";

const slots = ["10:00", "10:30", "11:00", "11:30", "12:00", "16:30", "17:00", "17:30", "18:00", "18:30"];

type Day = { key: string; dow: string; date: number; month: string };

const noopSubscribe = () => () => {};

function nextSevenDays(): Day[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      key: d.toDateString(),
      dow: i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
    };
  });
}

export default function Booking() {
  const [mode, setMode] = useState<"clinic" | "video">("clinic");
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  // Only build the calendar in the browser, so server and client never disagree on "today"
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const days = useMemo(() => (mounted ? nextSevenDays() : []), [mounted]);

  // Deterministically mark some slots as taken so the demo feels real
  const taken = (i: number) => (i * 7 + day * 3) % 5 === 0;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (slot && name && phone) setBooked(true);
  };

  const selected = days[day];

  return (
    <section id="book" className="scroll-mt-24 px-4 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink text-white">
        <div className="aurora opacity-50" aria-hidden>
          <span />
          <span />
          <span />
        </div>

        <div className="relative grid gap-12 p-6 py-14 sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:p-16">
          <div className="reveal">
            <p className="text-sm font-medium tracking-widest text-mint uppercase">Book an appointment</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Your slot, <span className="text-gradient font-serif font-normal italic">confirmed instantly.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/65">
              Choose in-clinic or video, pick a time that suits you, and you&apos;re done. We&apos;ll
              send a confirmation and reminder on WhatsApp.
            </p>

            <ul className="mt-10 space-y-4 text-sm text-white/75">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-mint" /> Sample address, Ahmedabad, Gujarat
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-mint" /> Mon–Sat · 10:00 AM – 1:00 PM, 4:30 – 7:30 PM
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-mint" /> +91 00000 00000 (24×7 emergencies)
              </li>
            </ul>
          </div>

          <div className="reveal glass rounded-[2rem] p-5 sm:p-8">
            {booked ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" style={{ animation: "fadeUp .5s ease" }}>
                <span className="grid h-20 w-20 place-items-center rounded-full bg-mint text-ink">
                  <CheckCircle2 className="h-10 w-10" />
                </span>
                <h3 className="mt-6 text-3xl font-semibold">You&apos;re booked, {name.split(" ")[0]}!</h3>
                <p className="mt-3 text-white/65">
                  {mode === "clinic" ? "In-clinic visit" : "Video consultation"} · {selected?.dow} {selected?.date}{" "}
                  {selected?.month} · {slot}
                </p>
                <p className="mt-1 text-sm text-white/45">A confirmation has been sent to {phone} (demo — nothing was actually sent).</p>
                <button
                  onClick={() => {
                    setBooked(false);
                    setSlot(null);
                  }}
                  className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm hover:bg-white/10"
                >
                  Book another
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                {/* Mode toggle */}
                <div className="grid grid-cols-2 gap-1 rounded-full bg-white/8 p-1">
                  {(
                    [
                      { id: "clinic", label: "In-clinic", icon: Building2 },
                      { id: "video", label: "Video consult", icon: Video },
                    ] as const
                  ).map(({ id, label, icon: Icon }) => (
                    <button
                      type="button"
                      key={id}
                      onClick={() => setMode(id)}
                      aria-pressed={mode === id}
                      className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm transition ${
                        mode === id ? "bg-white text-ink" : "text-white/70 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" /> {label}
                    </button>
                  ))}
                </div>

                {/* Days */}
                <p className="mt-7 text-xs tracking-widest text-white/45 uppercase">Choose a day</p>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                  {days.map((d, i) => (
                    <button
                      type="button"
                      key={d.key}
                      onClick={() => {
                        setDay(i);
                        setSlot(null);
                      }}
                      aria-pressed={day === i}
                      className={`flex min-w-[4.5rem] flex-col items-center rounded-2xl border py-3 transition ${
                        day === i ? "border-mint bg-mint text-ink" : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <span className="text-xs opacity-70">{d.dow}</span>
                      <span className="text-xl font-semibold">{d.date}</span>
                      <span className="text-[11px] opacity-60">{d.month}</span>
                    </button>
                  ))}
                </div>

                {/* Slots */}
                <p className="mt-7 text-xs tracking-widest text-white/45 uppercase">Available times</p>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {slots.map((s, i) => {
                    const off = taken(i);
                    return (
                      <button
                        type="button"
                        key={s}
                        disabled={off}
                        onClick={() => setSlot(s)}
                        aria-pressed={slot === s}
                        className={`rounded-xl border py-2.5 text-sm transition ${
                          off
                            ? "cursor-not-allowed border-transparent text-white/20 line-through"
                            : slot === s
                              ? "border-mint bg-mint text-ink"
                              : "border-white/10 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Details */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="sr-only">Full name</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-mint focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Mobile number</span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile number"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-mint focus:outline-none"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!slot}
                  className="mt-6 w-full rounded-full bg-mint py-4 font-medium text-ink transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {slot ? `Confirm ${selected?.dow ?? ""} at ${slot}` : "Select a time to continue"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
