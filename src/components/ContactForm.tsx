"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

const reasons = ["New consultation", "Procedure enquiry", "Report review / second opinion", "Insurance & billing", "Something else"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [reason, setReason] = useState(reasons[0]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[26rem] flex-col items-center justify-center rounded-[2rem] bg-white p-10 text-center" style={{ animation: "fadeUp .5s ease" }}>
        <span className="grid h-16 w-16 place-items-center rounded-full bg-mint text-teal-deep">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold">Message received</h3>
        <p className="mt-2 max-w-sm text-ink/60">Our team typically replies within 30 minutes during clinic hours. (Demo — nothing was sent.)</p>
        <button onClick={() => setSent(false)} className="mt-6 rounded-full border border-ink/15 px-6 py-3 text-sm hover:border-teal hover:text-teal">
          Send another message
        </button>
      </div>
    );
  }

  const field = "w-full rounded-xl border border-ink/12 bg-paper px-4 py-3.5 focus:border-teal focus:bg-white focus:outline-none";

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 sm:p-9">
      <p className="text-sm font-medium">What can we help with?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {reasons.map((r) => (
          <button
            type="button"
            key={r}
            onClick={() => setReason(r)}
            aria-pressed={reason === r}
            className={`rounded-full px-4 py-2 text-sm transition ${
              reason === r ? "bg-teal text-white" : "border border-ink/12 text-ink/70 hover:border-teal/50"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-ink/60">Full name</span>
          <input required className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-ink/60">Mobile number</span>
          <input required type="tel" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm text-ink/60">Email (optional)</span>
          <input type="email" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm text-ink/60">Message</span>
          <textarea rows={4} className={field} placeholder="Tell us briefly about your symptoms or question" />
        </label>
      </div>
      <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 font-medium text-white transition hover:bg-teal">
        <Send className="h-4 w-4" /> Send message
      </button>
    </form>
  );
}
