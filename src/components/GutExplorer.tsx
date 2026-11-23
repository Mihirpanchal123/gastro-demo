"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type OrganId = "esophagus" | "stomach" | "liver" | "pancreas" | "small" | "colon";

const organs: Record<
  OrganId,
  { name: string; blurb: string; conditions: string[]; procedures: string[] }
> = {
  esophagus: {
    name: "Esophagus",
    blurb: "The food pipe. Trouble here often shows up as heartburn, chest discomfort or difficulty swallowing.",
    conditions: ["GERD / reflux", "Barrett's esophagus", "Achalasia", "Strictures"],
    procedures: ["Upper GI endoscopy", "Manometry", "Dilatation"],
  },
  stomach: {
    name: "Stomach",
    blurb: "Where digestion begins in earnest. Persistent acidity, pain or nausea deserve a closer look.",
    conditions: ["Gastritis", "Peptic ulcers", "H. pylori infection", "Gastric polyps"],
    procedures: ["Endoscopy & biopsy", "H. pylori testing", "Polypectomy"],
  },
  liver: {
    name: "Liver",
    blurb: "Your body's silent workhorse. Liver disease often has no symptoms until it's advanced.",
    conditions: ["Fatty liver (NAFLD)", "Hepatitis B & C", "Cirrhosis", "Jaundice"],
    procedures: ["Fibroscan", "Liver function panel", "Variceal banding"],
  },
  pancreas: {
    name: "Pancreas & Gallbladder",
    blurb: "Small organs, big jobs — producing enzymes and storing bile to break down fats.",
    conditions: ["Gallstones", "Pancreatitis", "Bile duct blockage", "Pancreatic cysts"],
    procedures: ["ERCP", "Endoscopic ultrasound (EUS)", "Stenting"],
  },
  small: {
    name: "Small Intestine",
    blurb: "Six metres of absorption. Problems here can cause bloating, diarrhoea and nutrient loss.",
    conditions: ["Celiac disease", "Crohn's disease", "Malabsorption", "SIBO"],
    procedures: ["Capsule endoscopy", "Enteroscopy", "Breath tests"],
  },
  colon: {
    name: "Colon",
    blurb: "The large bowel. Regular screening after 45 is one of the best things you can do for your health.",
    conditions: ["IBS", "Ulcerative colitis", "Colon polyps", "Piles & fissures"],
    procedures: ["Colonoscopy", "Polypectomy", "Banding"],
  },
};

const order: OrganId[] = ["esophagus", "stomach", "liver", "pancreas", "small", "colon"];

export default function GutExplorer() {
  const [active, setActive] = useState<OrganId>("stomach");
  const o = organs[active];

  // Stroke/fill helpers for the stylised anatomy
  const isOn = (id: OrganId) => active === id;
  const stroke = (id: OrganId) => (isOn(id) ? "#9fe7d2" : "rgba(255,255,255,0.22)");
  const fill = (id: OrganId) => (isOn(id) ? "rgba(159,231,210,0.28)" : "rgba(255,255,255,0.05)");
  const common = (id: OrganId) => ({
    onClick: () => setActive(id),
    style: { cursor: "pointer", transition: "all .4s ease", filter: isOn(id) ? "drop-shadow(0 0 14px rgba(159,231,210,.7))" : "none" },
    role: "button",
    "aria-label": organs[id].name,
  });

  return (
    <section id="explore" className="scroll-mt-24 px-4 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-white sm:px-12 sm:py-20">
        <div className="absolute -top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-teal/40 blur-[120px]" aria-hidden />

        <div className="reveal relative max-w-2xl">
          <p className="text-sm font-medium tracking-widest text-mint uppercase">Interactive</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore your <span className="font-serif font-normal text-mint italic">digestive system.</span>
          </h2>
          <p className="mt-4 text-white/60">Tap an organ to see what can go wrong — and how we help.</p>
        </div>

        <div className="relative mt-12 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Stylised anatomy */}
          <div className="reveal relative mx-auto w-full max-w-xs">
            <div className="absolute inset-6 rounded-full bg-white/5 blur-2xl" aria-hidden />
            <svg viewBox="0 0 300 400" className="relative w-full">
              {/* Esophagus */}
              <path d="M150 15 L150 118" stroke={stroke("esophagus")} strokeWidth="16" strokeLinecap="round" fill="none" {...common("esophagus")} />
              {/* Liver */}
              <path
                d="M48 140 C 70 110, 140 112, 146 132 C 150 160, 118 192, 82 190 C 56 188, 36 165, 48 140 Z"
                stroke={stroke("liver")} strokeWidth="2.5" fill={fill("liver")} {...common("liver")}
              />
              {/* Stomach */}
              <path
                d="M152 122 C 205 108, 245 140, 236 186 C 228 222, 186 232, 160 212 C 146 200, 160 182, 176 178 C 160 168, 146 150, 152 122 Z"
                stroke={stroke("stomach")} strokeWidth="2.5" fill={fill("stomach")} {...common("stomach")}
              />
              {/* Pancreas & gallbladder */}
              <g {...common("pancreas")}>
                <path d="M112 222 C 145 210, 190 226, 226 214" stroke={stroke("pancreas")} strokeWidth="12" strokeLinecap="round" fill="none" />
                <ellipse cx="102" cy="196" rx="11" ry="15" stroke={stroke("pancreas")} strokeWidth="2.5" fill={fill("pancreas")} />
              </g>
              {/* Colon */}
              <path
                d="M92 372 L92 262 Q92 244 110 244 L196 244 Q214 244 214 262 L214 350 Q214 376 188 376 L160 376"
                stroke={stroke("colon")} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" {...common("colon")}
              />
              {/* Small intestine */}
              <path
                d="M122 272 C 140 262, 168 282, 186 270 M122 296 C 140 286, 168 306, 186 294 M122 320 C 140 310, 168 330, 186 318 M126 344 C 142 334, 160 352, 176 342"
                stroke={stroke("small")} strokeWidth="9" strokeLinecap="round" fill="none" {...common("small")}
              />
            </svg>
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Organs">
              {order.map((id) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isOn(id)}
                  onClick={() => setActive(id)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isOn(id) ? "bg-mint text-ink" : "bg-white/8 text-white/70 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {organs[id].name}
                </button>
              ))}
            </div>

            <div key={active} className="glass mt-6 rounded-3xl p-7 sm:p-9" style={{ animation: "fadeUp .5s ease" }}>
              <h3 className="font-serif text-4xl italic">{o.name}</h3>
              <p className="mt-3 max-w-lg text-white/65">{o.blurb}</p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs tracking-widest text-white/45 uppercase">Common conditions</p>
                  <ul className="mt-3 space-y-2">
                    {o.conditions.map((c) => (
                      <li key={c} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-white/45 uppercase">How we diagnose &amp; treat</p>
                  <ul className="mt-3 space-y-2">
                    {o.procedures.map((p) => (
                      <li key={p} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a href="#book" className="group mt-9 inline-flex items-center gap-2 text-mint">
                Talk to a specialist about your {o.name.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
