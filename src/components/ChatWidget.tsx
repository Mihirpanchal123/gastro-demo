"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, ArrowUpRight, MessageCircle, Phone, RotateCcw, Sparkles, X } from "lucide-react";
import type { ChatUIMessage, PageHit } from "@/lib/chat-types";
import { clinic } from "@/lib/site";

const OPEN_EVENT = "lumen:open-chat";

const suggestions = [
  "Is endoscopy painful?",
  "How much does a colonoscopy cost?",
  "What are your clinic timings?",
  "Can fatty liver be reversed?",
  "How do I prepare for a colonoscopy?",
];

/** Small button that opens the chat from anywhere (used in the mobile bar). */
export function AskAIButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      <Sparkles className="h-5 w-5" /> Ask AI
    </button>
  );
}

/** Strip stray markdown emphasis in case a model adds it. */
const clean = (t: string) => t.replace(/\*\*(.*?)\*\*/g, "$1").replace(/^#+\s*/gm, "");

function PageCards({ pages, onNavigate }: { pages: PageHit[]; onNavigate: () => void }) {
  if (!pages.length) return null;
  return (
    <div className="mt-3 space-y-2">
      <p className="text-[11px] tracking-wider text-ink/45 uppercase">Pages on this site</p>
      {pages.map((p) => (
        <Link
          key={p.url + p.title}
          href={p.url}
          onClick={onNavigate}
          className="group flex items-start gap-3 rounded-2xl border border-ink/8 bg-white p-3 transition hover:border-teal/40 hover:shadow-md hover:shadow-teal/5"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] text-teal">{p.section}</span>
            <span className="block text-sm leading-snug font-medium">{p.title}</span>
            <span className="mt-0.5 line-clamp-2 block text-xs text-ink/55">{p.snippet}</span>
          </span>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink/30 transition group-hover:text-teal" />
        </Link>
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error, regenerate, setMessages, stop } = useChat<ChatUIMessage>({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  // Friendly teaser bubble a few seconds after the first page load
  useEffect(() => {
    const t = setTimeout(() => setTeaser(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Allow any button on the site to open the chat
  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setTeaser(false);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Escape closes; focus the input when opening
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // When a new question is sent, scroll it to the top so the question and the
  // start of the answer stay visible (page cards then flow in below).
  const lastUserId = [...messages].reverse().find((m) => m.role === "user")?.id;
  useEffect(() => {
    const box = scroller.current;
    const el = lastUserId ? box?.querySelector<HTMLElement>(`[data-msg="${lastUserId}"]`) : null;
    if (box && el) box.scrollTo({ top: el.offsetTop - 16, behavior: "smooth" });
  }, [lastUserId]);

  const ask = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  // On phones the panel is full-screen, so close it when a link is followed
  const onNavigate = () => {
    if (window.innerWidth < 640) setOpen(false);
  };

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const lastPages = lastAssistant?.parts.find((p) => p.type === "data-pages");
  const aiMode = lastPages?.type === "data-pages" ? lastPages.data.ai : undefined;
  const waiting = status === "submitted" || (status === "streaming" && !lastAssistant?.parts.some((p) => p.type === "text" && p.text));

  return (
    <>
      {/* Desktop floating stack: chat + call + WhatsApp */}
      <div className={`fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 sm:flex print:hidden ${open ? "pointer-events-none opacity-0" : ""}`}>
        {teaser && !open && (
          <div className="relative mr-1 w-64 rounded-2xl bg-white p-4 text-sm shadow-2xl shadow-ink/15" style={{ animation: "fadeUp .4s ease" }}>
            <button
              onClick={() => setTeaser(false)}
              aria-label="Dismiss"
              className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full text-ink/40 hover:bg-mist"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="pr-4 font-medium">Hi there 👋</p>
            <p className="mt-1 text-ink/60">Questions about a treatment, fees or timings? Ask our AI assistant.</p>
          </div>
        )}
        <button
          onClick={() => {
            setOpen(true);
            setTeaser(false);
          }}
          className="group flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-r from-teal to-ink pr-6 pl-2 text-white shadow-xl shadow-teal/30 transition hover:scale-[1.03]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-mint text-ink">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-medium">Ask AI</span>
        </button>
        <a
          href={clinic.phoneHref}
          aria-label="Call the clinic"
          className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-xl shadow-ink/30 transition hover:scale-105 hover:bg-teal"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={clinic.whatsapp}
          aria-label="Chat on WhatsApp"
          className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Lumen AI assistant"
          className="fixed inset-0 z-[80] flex flex-col bg-paper sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(640px,calc(100vh-6rem))] sm:w-[400px] sm:overflow-hidden sm:rounded-[1.75rem] sm:shadow-2xl sm:shadow-ink/30 print:hidden"
          style={{ animation: "fadeUp .3s ease" }}
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-ink px-5 pt-5 pb-4 text-white">
            <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-teal/60 blur-3xl" aria-hidden />
            <div className="relative flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-mint to-teal text-ink">
                <Sparkles className="h-5 w-5" />
                <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-ink bg-[#25D366]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Lumen Assistant</p>
                <p className="truncate text-xs text-white/60">
                  {aiMode === false ? "Site search mode" : "AI assistant"} · knows the whole site
                </p>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    stop();
                    setMessages([]);
                  }}
                  aria-label="Start a new chat"
                  title="New chat"
                  className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scroller} className="relative flex-1 space-y-5 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.length === 0 && (
              <div style={{ animation: "fadeUp .4s ease" }}>
                <div className="rounded-2xl rounded-tl-md bg-white p-4 text-sm leading-relaxed shadow-sm">
                  Hi! I can answer questions about our <strong>treatments, doctor, fees, timings, locations</strong> and{" "}
                  <strong>procedure preparation</strong> — and point you to the right page.
                </div>
                <p className="mt-5 mb-2 text-[11px] tracking-wider text-ink/45 uppercase">Try asking</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="rounded-full border border-ink/12 bg-white px-3.5 py-2 text-left text-sm text-ink/75 transition hover:border-teal hover:text-teal"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} data-msg={m.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-tr-md bg-ink px-4 py-2.5 text-sm text-white">
                    {m.parts.map((p) => (p.type === "text" ? p.text : "")).join("")}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="max-w-[92%]">
                  {m.parts.some((p) => p.type === "text" && p.text) && (
                    <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm">
                      {m.parts.map((p) => (p.type === "text" ? clean(p.text) : "")).join("")}
                    </div>
                  )}
                  {m.parts.map((p, i) =>
                    p.type === "data-pages" ? <PageCards key={i} pages={p.data.results} onNavigate={onNavigate} /> : null
                  )}
                </div>
              )
            )}

            {waiting && (
              <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-md bg-white px-4 py-3.5 shadow-sm" aria-label="Assistant is typing">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-teal/60" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-coral/10 p-4 text-sm text-[#9a3412]">
                Something went wrong.{" "}
                <button onClick={() => regenerate()} className="font-medium underline">
                  Try again
                </button>
              </div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={submit} className="border-t border-ink/8 bg-white p-3">
            <div className="flex items-center gap-2 rounded-full border border-ink/12 bg-paper py-1.5 pr-1.5 pl-4 focus-within:border-teal">
              <label htmlFor="chat-input" className="sr-only">Your question</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treatments, fees, timings…"
                className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label="Send"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-white transition enabled:hover:bg-teal disabled:opacity-30"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-ink/40">
              Answers come from this website · Not medical advice
            </p>
          </form>
        </div>
      )}
    </>
  );
}
