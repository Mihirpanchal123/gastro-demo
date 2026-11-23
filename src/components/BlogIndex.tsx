"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { blogCategories, formatDate, posts } from "@/lib/site";
import PostCover from "./PostCover";

export default function BlogIndex() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const list = posts.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (q === "" || (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()))
  );
  const [lead, ...rest] = list;

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2">
          {["All", ...blogCategories].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full px-4 py-2 text-sm transition ${
                cat === c ? "bg-ink text-white" : "border border-ink/12 bg-white text-ink/70 hover:border-ink/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search articles</span>
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-full border border-ink/12 bg-white py-3 pr-4 pl-11 text-sm focus:border-teal focus:outline-none"
          />
        </label>
      </div>

      {!lead ? (
        <p className="mt-16 rounded-3xl bg-white p-10 text-center text-ink/60">No articles match your search.</p>
      ) : (
        <>
          {/* Featured article */}
          <Link href={`/blog/${lead.slug}`} className="group mt-10 grid items-center gap-8 md:grid-cols-2" style={{ animation: "fadeUp .5s ease" }} key={lead.slug}>
            <PostCover post={lead} className="aspect-[16/11]" />
            <div>
              <p className="text-xs tracking-wider text-ink/50 uppercase">
                {lead.category} · {formatDate(lead.date)} · {lead.read} min read
              </p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-tight transition group-hover:text-teal sm:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/60">{lead.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-teal">
                Read article <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>

          <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block"
                style={{ animation: "fadeUp .5s ease both", animationDelay: `${i * 60}ms` }}
              >
                <PostCover post={p} className="aspect-[4/3]" />
                <p className="mt-5 text-xs tracking-wider text-ink/50 uppercase">
                  {p.category} · {formatDate(p.date)}
                </p>
                <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight transition group-hover:text-teal">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
