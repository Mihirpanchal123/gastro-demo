"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { gallery } from "@/lib/site";

const cats = ["All", ...Array.from(new Set(gallery.map((g) => g.cat)))];
const tones: Record<string, string> = {
  Clinic: "from-teal to-ink",
  Procedures: "from-ink-2 to-mint/70",
  Events: "from-coral/70 to-teal-deep",
  Team: "from-mint/80 to-teal",
};

export default function GalleryGrid() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "All" ? gallery : gallery.filter((g) => g.cat === cat);

  // Keyboard controls for the lightbox
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % list.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, list.length]);

  const current = open !== null ? list[open] : null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full px-5 py-2.5 text-sm transition ${
              cat === c ? "bg-ink text-white" : "border border-ink/12 bg-white text-ink/70 hover:border-ink/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {list.map((g, i) => (
          <button
            key={g.label}
            onClick={() => setOpen(i)}
            className={`group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.75rem] text-left ${
              g.tall ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
            style={{ animation: "fadeUp .5s ease both", animationDelay: `${i * 40}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tones[g.cat]} transition duration-700 group-hover:scale-105`} />
            <ImageIcon className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white/25" />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-12 opacity-90 transition group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs text-mint">{g.cat}</p>
              <p className="font-medium text-white">{g.label}</p>
            </div>
          </button>
        ))}
      </div>

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
            <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl bg-gradient-to-br sm:aspect-video ${tones[current.cat]}`}>
              <div className="text-center text-white">
                <ImageIcon className="mx-auto h-12 w-12 text-white/40" />
                <p className="mt-3 text-sm text-white/70">Clinic photo goes here</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-white">
              <div>
                <p className="text-xs text-mint">{current.cat} · {open + 1} / {list.length}</p>
                <p className="font-medium">{current.label}</p>
              </div>
              <div className="flex gap-2">
                <button aria-label="Previous" onClick={() => setOpen((open - 1 + list.length) % list.length)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button aria-label="Next" onClick={() => setOpen((open + 1) % list.length)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button aria-label="Close" onClick={() => setOpen(null)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
