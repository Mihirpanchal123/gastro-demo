"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { videos } from "@/lib/site";

const tabs = ["All", "Patient stories", "Awareness talks"] as const;

export default function VideoLibrary() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [playing, setPlaying] = useState<(typeof videos)[number] | null>(null);
  const list = tab === "All" ? videos : videos.filter((v) => v.kind === tab);

  // Close the player with Escape
  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2.5 text-sm transition ${
              tab === t ? "bg-ink text-white" : "border border-ink/12 bg-white text-ink/70 hover:border-ink/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v, i) => (
          <button
            key={v.title}
            onClick={() => setPlaying(v)}
            className={`group relative overflow-hidden rounded-[1.75rem] text-left ${i === 0 && tab === "All" ? "aspect-video sm:col-span-2 sm:row-span-2 sm:aspect-auto" : "aspect-video"}`}
            style={{ animation: "fadeUp .5s ease both", animationDelay: `${i * 50}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${v.hue} transition duration-500 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <span className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition group-hover:scale-110 group-hover:bg-mint group-hover:text-ink">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </span>
            <span className="absolute top-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">{v.kind}</span>
            <div className="absolute right-5 bottom-5 left-5 text-white">
              <p className="text-lg leading-snug font-medium">{v.title}</p>
              <p className="mt-1 text-xs text-white/60">{v.duration}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Player modal */}
      {playing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
          onClick={() => setPlaying(null)}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/85 p-4 backdrop-blur-sm"
          style={{ animation: "fadeUp .3s ease" }}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl">
            <div className="mb-3 flex items-center justify-between text-white">
              <p className="font-medium">{playing.title}</p>
              <button onClick={() => setPlaying(null)} aria-label="Close video" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className={`relative grid aspect-video place-items-center overflow-hidden rounded-3xl bg-gradient-to-br ${playing.hue}`}>
              <div className="text-center text-white">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur">
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </span>
                <p className="mt-4 text-sm text-white/80">The clinic&apos;s YouTube video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
