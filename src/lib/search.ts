/**
 * Site-wide search index for the chat assistant.
 *
 * Every page's content is turned into a "document", and questions are ranked
 * against them with BM25 (the classic search-engine scoring formula) plus a
 * small synonym list so everyday words ("acidity", "cost", "timings") match
 * the clinical wording used on the site. Runs entirely on our own server —
 * no external service, no cost.
 */
import {
  areas,
  clinic,
  doctor,
  faqs,
  gallery,
  guides,
  locations,
  news,
  posts,
  pricing,
  team,
  treatments,
  videos,
} from "./site";
import type { PageHit } from "./chat-types";

type Doc = { url: string; title: string; section: string; keywords: string; body: string };

/* ------------------------------------------------------------------ */
/* 1. Build one document per page / section of the site                */
/* ------------------------------------------------------------------ */

const docs: Doc[] = [
  ...treatments.map((t) => ({
    url: `/treatments/${t.slug}`,
    title: t.name,
    section: "Treatment",
    keywords: `${t.name} procedure treatment ${t.indications.join(" ")}`,
    body: [
      `${t.name}: ${t.tagline}`,
      t.summary,
      ...t.about,
      `Who is it for: ${t.indications.join("; ")}.`,
      ...t.process.map((p) => `${p.title}: ${p.text}`),
      ...t.facts.map((f) => `${f.label}: ${f.value}.`),
      ...t.faqs.map((f) => `${f.q} ${f.a}`),
    ].join(" "),
  })),
  ...posts.map((p) => ({
    url: `/blog/${p.slug}`,
    title: p.title,
    section: `Blog · ${p.category}`,
    keywords: `${p.category} article blog`,
    body: [
      p.excerpt,
      // Headings get a colon and list items are joined with semicolons, so they read as sentences
      ...p.body.map((b) =>
        [b.h ? (/[?!]$/.test(b.h) ? b.h : `${b.h}:`) : "", ...(b.p ?? []), b.list ? b.list.join("; ") + "." : ""]
          .filter(Boolean)
          .join(" ")
      ),
    ].join(" "),
  })),
  {
    url: "/doctor",
    title: `${doctor.name} — Doctor profile`,
    section: "Doctor",
    keywords: "doctor specialist gastroenterologist hepatologist qualification degree experience education award membership who",
    body: [
      `${doctor.name} is our ${doctor.title}, qualified with ${doctor.degrees.replace(/ · /g, ", ")}.`,
      ...doctor.bio,
      ...doctor.education.map((e) => `${e.year}: ${e.title}, ${e.place}.`),
      `Awards: ${doctor.awards.join(", ")}.`,
      `Memberships: ${doctor.memberships.join(", ")}.`,
      ...doctor.stats.map((s) => `${s.value} ${s.label}.`),
      "Consults in English, Hindi and Gujarati.",
    ].join(" "),
  },
  {
    url: "/team",
    title: "Our team",
    section: "Clinic",
    keywords: "team staff nurse dietitian anaesthesiologist coordinator people",
    body: team.map((m) => `${m.name} — ${m.role} (${m.focus}).`).join(" "),
  },
  {
    url: "/#pricing",
    title: "Transparent pricing",
    section: "Fees",
    keywords: "price cost fee charges rate how much rupees affordable insurance cashless",
    body:
      pricing.map((p) => `${p.name} (${p.note}): ${p.price}.`).join(" ") +
      " Cashless insurance accepted for eligible procedures. Exact estimates are shared before any procedure.",
  },
  {
    url: "/locations",
    title: "Clinic locations",
    section: "Locations",
    keywords: "location address where clinic branch directions map near reach parking",
    body: locations
      .map((l) => `${l.name} (${l.area}): ${l.address}. Hours: ${l.hours}. Services: ${l.services.join(", ")}.`)
      .join(" "),
  },
  ...areas.map((a) => ({
    url: `/locations/${a.slug}`,
    title: `Gastroenterologist near ${a.name}`,
    section: "Locations",
    keywords: `${a.name} near nearby area location`,
    body: `Patients from ${a.name} can reach our ${a.clinic} in about ${a.minutes} minutes.`,
  })),
  {
    url: "/contact",
    title: "Contact us",
    section: "Contact",
    keywords: "contact phone call number email whatsapp timing hours open emergency reach message",
    body: `Phone: ${clinic.phone}. Email: ${clinic.email}. WhatsApp chat available. Clinic hours: ${clinic.hours}. ${clinic.emergency}.`,
  },
  {
    url: "/book",
    title: "Book an appointment",
    section: "Appointments",
    keywords: "book appointment slot schedule consultation visit video online reserve",
    body:
      "Book an in-clinic visit or a video consultation online in under a minute. Pick a day and time; confirmation and reminders are sent on WhatsApp. Bring previous reports, a list of current medicines, your insurance card and a companion for procedures.",
  },
  {
    url: "/patient-education",
    title: "Patient education & preparation guides",
    section: "Patients",
    keywords: "prepare preparation guide instructions before after diet fasting aftercare",
    body: guides.map((g) => `${g.title}: ${g.items.join("; ")}.`).join(" "),
  },
  {
    url: "/news",
    title: "News & events",
    section: "Patients",
    keywords: "news event camp talk update free",
    body: news.map((n) => `${n.type} — ${n.title}: ${n.text}`).join(" "),
  },
  {
    url: "/videos",
    title: "Videos — patient stories & awareness talks",
    section: "Media",
    keywords: "video watch youtube testimonial story talk review experience",
    body: videos.map((v) => `${v.kind}: ${v.title}.`).join(" "),
  },
  {
    url: "/gallery",
    title: "Gallery",
    section: "Media",
    keywords: "photos gallery images pictures clinic inside facility",
    body: gallery.map((g) => `${g.cat}: ${g.label}.`).join(" "),
  },
  {
    url: "/brochure",
    title: "Clinic brochure",
    section: "Patients",
    keywords: "brochure pdf download services guide",
    body: "Download the clinic brochure as a PDF with all treatments, indicative fees, locations and contact details.",
  },
  {
    url: "/#symptoms",
    title: "Symptom check",
    section: "Tools",
    keywords: "symptom checker check urgent should i see doctor",
    body:
      "Answer two quick questions about your symptoms and how long you've had them to see how soon you should be seen. Red-flag symptoms such as blood in stool or vomit, yellow eyes, difficulty swallowing and unexplained weight loss need a specialist within 24–48 hours.",
  },
  ...faqs.map((f) => ({
    url: "/#faq",
    title: f.q,
    section: "FAQ",
    keywords: "faq question",
    body: f.a,
  })),
];

/* ------------------------------------------------------------------ */
/* 2. Text processing                                                  */
/* ------------------------------------------------------------------ */

const STOP = new Set(
  "a an and are as at be but by can could do does for from have how i if in into is it its me my of on or our please should so tell than that the their them then there these they this to us was we what when where which who why will with would you your about any get got need want know he she his her him much many im i'm".split(
    " "
  )
);

/** Everyday words → words used on the site. */
const SYNONYMS: Record<string, string[]> = {
  acidity: ["reflux", "heartburn", "gerd", "acid"],
  acid: ["acidity", "reflux", "heartburn"],
  gas: ["bloating"],
  bloat: ["bloating"],
  stomach: ["gastritis", "abdominal", "endoscopy"],
  tummy: ["stomach", "abdominal"],
  cost: ["price", "fee"],
  charge: ["price", "fee"],
  expensive: ["price", "fee"],
  rate: ["price", "fee"],
  timing: ["hours", "open"],
  time: ["hours"],
  open: ["hours"],
  address: ["location", "clinic"],
  direction: ["location", "map"],
  appointment: ["book", "consultation"],
  slot: ["book", "appointment"],
  online: ["video", "book"],
  teleconsult: ["video", "consultation"],
  jaundice: ["liver", "bile"],
  yellow: ["jaundice", "liver"],
  hepatitis: ["liver"],
  fatty: ["liver", "fat"],
  obesity: ["weight", "bmi"],
  overweight: ["weight", "bmi"],
  gallstone: ["stone", "bile", "ercp"],
  stone: ["ercp", "bile", "gallstones"],
  pancrea: ["pancreatic", "eus", "ercp"],
  piles: ["colon", "fissures"],
  constipat: ["constipation", "colon"],
  motion: ["diarrhoea", "stool"],
  diarrhea: ["diarrhoea"],
  loose: ["diarrhoea"],
  swallow: ["swallowing", "esophagus", "manometry"],
  blood: ["bleeding", "stool"],
  scope: ["endoscopy", "colonoscopy"],
  camera: ["endoscopy", "capsule"],
  pain: ["painful", "sedation", "abdominal"],
  painless: ["sedation", "painful"],
  anesthesia: ["sedation", "anaesthesia"],
  doctor: ["specialist", "gastroenterologist"],
  experience: ["years", "procedures"],
  qualification: ["degrees", "education", "qualified"],
  insurance: ["cashless", "tpa"],
  cancer: ["screening", "polyp", "tumour"],
  screening: ["colonoscopy", "cancer"],
  emergency: ["24×7", "urgent"],
};

/** Light stemmer: prepare / preparing / preparation / prepared → "prepar". */
const stem = (word: string) => {
  let w = word;
  // plurals
  if (w.length > 4 && w.endsWith("ies")) w = w.slice(0, -3) + "y";
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  // verb / noun endings
  if (w.length > 7 && w.endsWith("ation")) w = w.slice(0, -5);
  else if (w.length > 5 && w.endsWith("ing")) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith("ed")) w = w.slice(0, -2);
  // trailing silent "e"
  if (w.length > 4 && w.endsWith("e")) w = w.slice(0, -1);
  return w;
};

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9₹×\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);

/** Adds synonyms for each query word (prefix match so "constipated" hits "constipat"). */
function expand(tokens: string[]) {
  const out = new Map<string, number>();
  for (const t of tokens) {
    out.set(t, Math.max(out.get(t) ?? 0, 1));
    for (const [rawKey, syns] of Object.entries(SYNONYMS)) {
      const key = stem(rawKey);
      if (t === key || (key.length >= 6 && t.startsWith(key))) {
        for (const s of syns) {
          const st = stem(s);
          out.set(st, Math.max(out.get(st) ?? 0, 0.6));
        }
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* 3. Pre-computed index (BM25)                                        */
/* ------------------------------------------------------------------ */

const count = (tokens: string[]) => {
  const m = new Map<string, number>();
  tokens.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1));
  return m;
};

const index = docs.map((d) => {
  const title = count(tokenize(d.title));
  const kw = count(tokenize(d.keywords));
  const body = count(tokenize(d.body));
  // Weighted term frequency: title ×3, keywords ×2, body ×1
  const tf = new Map<string, number>();
  for (const [m, w] of [[title, 3], [kw, 2], [body, 1]] as const) {
    m.forEach((c, t) => tf.set(t, (tf.get(t) ?? 0) + c * w));
  }
  const len = [...tf.values()].reduce((a, b) => a + b, 0);
  return { doc: d, tf, len };
});

const avgLen = index.reduce((a, d) => a + d.len, 0) / index.length;
const df = new Map<string, number>();
index.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)));
const N = index.length;
const idf = (t: string) => {
  const n = df.get(t) ?? 0;
  return Math.log(1 + (N - n + 0.5) / (n + 0.5));
};

/* ------------------------------------------------------------------ */
/* 4. Public API                                                       */
/* ------------------------------------------------------------------ */

const hitsIn = (text: string, terms: Map<string, number>) =>
  tokenize(text).reduce((a, t) => a + (terms.get(t) ?? 0), 0);

/** For "Label: item; item; item." keep the label plus the two best-matching items. */
function focusList(sentence: string, terms: Map<string, number>) {
  const colon = sentence.indexOf(":");
  if (colon === -1 || !sentence.includes(";")) return sentence;
  const label = sentence.slice(0, colon + 1);
  const items = sentence.slice(colon + 1).replace(/\.$/, "").split(";").map((s) => s.trim());
  const keep = items
    .map((it, i) => ({ it, i, s: hitsIn(it, terms) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2)
    .sort((a, b) => a.i - b.i)
    .map((x) => x.it);
  return keep.length ? `${label} ${keep.join("; ")}.` : sentence;
}

/**
 * Picks the most relevant sentence: short focused sentences beat long lists, and
 * a matching question yields its answer. Words from the page's own title are
 * ignored when choosing (on the ERCP page, "ERCP" says nothing about *which*
 * sentence answers "recovery time"). If nothing else matches, the page's
 * opening summary is returned.
 */
function bestSnippet(body: string, allTerms: Map<string, number>, title: string) {
  // The title's words *and their synonyms* don't help choose a sentence
  const titleTokens = new Set(expand(tokenize(title)).keys());
  const terms = new Map([...allTerms].filter(([t]) => !titleTokens.has(t)));

  // Protect "Dr." so it isn't treated as the end of a sentence
  const safe = body.replace(/\bDr\.\s/g, "Dr․ ");
  const sentences = (safe.match(/[^.!?]+[.!?]?/g) ?? [safe])
    .map((s) => s.replace(/․/g, ".").replace(/^[:;,\s]+/, "").trim())
    .filter(Boolean);
  let best = sentences.slice(0, 2).join(" ");
  let bestScore = 0;
  sentences.forEach((s, i) => {
    const n = Math.max(tokenize(s).length, 1);
    let candidate = s;
    let score = hitsIn(s, terms) / Math.sqrt(n);
    // A matching FAQ-style question → return the answer that follows it
    if (s.endsWith("?") && sentences[i + 1]) {
      candidate = sentences[i + 1];
      score *= 1.3;
    }
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  });
  const clean = focusList(best, terms);
  return clean.length > 220 ? clean.slice(0, 217).trimEnd() + "…" : clean;
}

/** Share of the visitor's own words (or their synonyms) that a page actually covers. */
function coverage(queryTokens: string[], tf: Map<string, number>) {
  if (!queryTokens.length) return 0;
  const covered = queryTokens.filter((t) => [...expand([t]).keys()].some((x) => tf.has(x)));
  return covered.length / queryTokens.length;
}

export type SearchResult = PageHit & { score: number; body: string };

/**
 * Ranks every page against the question. `context` (e.g. the previous
 * question) is blended in at half weight so follow-ups like "how much does
 * it cost?" still know what "it" refers to.
 */
export function searchSite(query: string, context?: string, limit = 4): SearchResult[] {
  const queryTokens = tokenize(query);
  const terms = expand(queryTokens);
  if (context) {
    expand(tokenize(context)).forEach((w, t) => {
      if (!terms.has(t)) terms.set(t, w * 0.5);
    });
  }
  if (terms.size === 0) return [];

  const k1 = 1.4;
  const b = 0.6;
  const q = query.toLowerCase();

  const scored = index
    .map(({ doc, tf, len }) => {
      let score = 0;
      terms.forEach((w, t) => {
        const f = tf.get(t);
        if (!f) return;
        score += w * idf(t) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * len) / avgLen)));
      });
      // Bonus when the page's name appears verbatim in the question (e.g. "ERCP")
      const name = doc.title.toLowerCase().split(/[—(&]/)[0].trim();
      if (name.length > 2 && q.includes(name)) score += 4;
      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b2) => b2.score - a.score);

  if (!scored.length) return [];
  const top = scored[0].score;

  // Off-topic guard: if the best page covers only a small part of the question
  // (e.g. "car insurance for trucks" only matches "insurance"), report no match.
  // Skipped for follow-ups, where the meaning comes from the previous question.
  const best = index.find((d) => d.doc === scored[0].doc)!;
  if (!context && queryTokens.length >= 3 && coverage(queryTokens, best.tf) < 0.5) return [];

  // Keep strong matches only, and never the same URL twice
  const seen = new Set<string>();
  const out: SearchResult[] = [];
  for (const { doc, score } of scored) {
    if (score < top * 0.35 || out.length >= limit) break;
    if (seen.has(doc.url)) continue;
    seen.add(doc.url);
    out.push({
      url: doc.url,
      title: doc.title,
      section: doc.section,
      snippet: bestSnippet(doc.body, terms, doc.title),
      score,
      body: doc.body,
    });
  }
  return out;
}

/** Plain-text context block handed to the AI model. */
export function contextFor(results: SearchResult[]) {
  return results
    .map((r, i) => `[${i + 1}] ${r.title} (${r.url})\n${r.body.slice(0, 1400)}`)
    .join("\n\n");
}
