"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";

const symptoms = [
  { id: "acidity", label: "Acidity / heartburn", area: "Esophagus & stomach" },
  { id: "bloating", label: "Bloating & gas", area: "Small intestine" },
  { id: "pain", label: "Abdominal pain", area: "General GI" },
  { id: "constipation", label: "Constipation", area: "Colon" },
  { id: "diarrhoea", label: "Loose motions > 2 weeks", area: "Small intestine & colon" },
  { id: "nausea", label: "Nausea / vomiting", area: "Stomach" },
  { id: "jaundice", label: "Yellow eyes or skin", area: "Liver", flag: true },
  { id: "blood", label: "Blood in stool or vomit", area: "GI bleeding", flag: true },
  { id: "swallow", label: "Difficulty swallowing", area: "Esophagus", flag: true },
  { id: "weight", label: "Unexplained weight loss", area: "General GI", flag: true },
];

const durations = ["A few days", "1–4 weeks", "1–6 months", "Longer"];

export default function SymptomCheck() {
  const [picked, setPicked] = useState<string[]>([]);
  const [duration, setDuration] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const chosen = symptoms.filter((s) => picked.includes(s.id));
  const urgent = chosen.some((s) => s.flag);
  const areas = Array.from(new Set(chosen.map((s) => s.area)));
  const reset = () => {
    setPicked([]);
    setDuration(null);
    setDone(false);
  };

  return (
    <section id="symptoms" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <p className="text-sm font-medium tracking-widest text-teal uppercase">Symptom check</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Not sure if you need{" "}
            <span className="font-serif font-normal text-teal italic">a gastroenterologist?</span>
          </h2>
          <p className="mt-5 max-w-md text-ink/60">
            Answer two quick questions and we&apos;ll suggest how soon you should be seen. It takes
            about 20 seconds.
          </p>
          <p className="mt-8 max-w-md rounded-2xl bg-sand px-5 py-4 text-sm text-ink/70">
            This tool gives general guidance only and is not a diagnosis. In an emergency, call
            your nearest hospital immediately.
          </p>
        </div>

        <div className="reveal glass-light rounded-[2rem] p-6 shadow-xl shadow-ink/5 sm:p-9">
          {!done ? (
            <>
              <p className="text-sm font-medium">
                <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-ink text-xs text-white">1</span>
                What are you experiencing?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {symptoms.map((s) => {
                  const on = picked.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggle(s.id)}
                      aria-pressed={on}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        on
                          ? "border-teal bg-teal text-white"
                          : "border-ink/12 bg-white text-ink/75 hover:border-teal/50"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-9 text-sm font-medium">
                <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-ink text-xs text-white">2</span>
                How long has this been going on?
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    aria-pressed={duration === d}
                    className={`rounded-2xl border px-3 py-3 text-sm transition ${
                      duration === d
                        ? "border-ink bg-ink text-white"
                        : "border-ink/12 bg-white text-ink/75 hover:border-ink/40"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <button
                disabled={!picked.length || !duration}
                onClick={() => setDone(true)}
                className="group mt-9 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 font-medium text-white transition enabled:hover:bg-teal disabled:cursor-not-allowed disabled:opacity-30"
              >
                See my recommendation
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </>
          ) : (
            <div style={{ animation: "fadeUp .5s ease" }}>
              <div
                className={`flex items-start gap-4 rounded-2xl p-5 ${
                  urgent ? "bg-coral/12 text-[#9a3412]" : "bg-mint/35 text-teal-deep"
                }`}
              >
                {urgent ? <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0" /> : <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0" />}
                <div>
                  <p className="text-lg font-semibold">
                    {urgent ? "Please be seen within 24–48 hours" : "A routine consultation is a good next step"}
                  </p>
                  <p className="mt-1 text-sm opacity-80">
                    {urgent
                      ? "One or more of your symptoms should be checked by a specialist soon. We keep priority slots open every day."
                      : `Symptoms present for ${duration?.toLowerCase()} are worth a proper evaluation — most can be managed simply once the cause is clear.`}
                  </p>
                </div>
              </div>

              <p className="mt-7 text-xs tracking-widest text-ink/45 uppercase">Likely area of focus</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <span key={a} className="rounded-full bg-mist px-4 py-2 text-sm">
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#book"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-4 font-medium text-white transition hover:bg-teal"
                >
                  {urgent ? "Book a priority slot" : "Book a consultation"}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-4 text-ink/70 hover:border-ink/40"
                >
                  <RotateCcw className="h-4 w-4" /> Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
