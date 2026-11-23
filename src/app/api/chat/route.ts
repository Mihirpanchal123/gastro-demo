import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type ToolSet,
} from "ai";
import { clinic } from "@/lib/site";
import { contextFor, searchSite, type SearchResult } from "@/lib/search";
import type { ChatUIMessage } from "@/lib/chat-types";

export const maxDuration = 30;

// Cheap, fast model via Vercel AI Gateway. Override with CHAT_MODEL if you like.
const MODEL = process.env.CHAT_MODEL ?? "anthropic/claude-haiku-5.5";

// AI answers switch on automatically when a gateway credential is present
// (an API key locally, or OIDC once deployed on Vercel).
const aiEnabled = () => Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN);

const RED_FLAGS = /\b(blood|bleed|bleeding|black stool|vomit(ing)? blood|chest pain|faint|unconscious|severe pain|can'?t breathe)\b/i;
const GREETING = /^\s*(hi+|hello|hey|namaste|good (morning|afternoon|evening))\b[\s!.]*$/i;

const textOf = (m: ChatUIMessage) =>
  m.parts.map((p) => (p.type === "text" ? p.text : "")).join(" ").trim();

/** Answer written from search results alone — used when no AI key is configured. */
function composeAnswer(question: string, hits: SearchResult[]) {
  if (GREETING.test(question)) {
    return "Hello! I'm the Lumen assistant. Ask me anything about our treatments, doctor, fees, timings or how to prepare for a procedure — I'll find the right page for you.";
  }
  const urgent = RED_FLAGS.test(question)
    ? `If this is happening right now, please call our 24×7 emergency line on ${clinic.phone} or go to the nearest hospital.\n\n`
    : "";
  if (!hits.length) {
    return `${urgent}I couldn't find that on our website. Our team can help directly — call ${clinic.phone} or send a message from the contact page.`;
  }
  const [first, second] = hits;
  let answer = `${urgent}Here's what I found on our website:\n\n${first.snippet}`;
  // Only mention a second page when it's nearly as strong a match as the first
  if (second && second.score >= first.score * 0.7 && second.snippet !== first.snippet) {
    answer += `\n\nAlso relevant — ${second.title}: ${second.snippet}`;
  }
  return answer + "\n\nTap a page below to read more.";
}

function instructions(hits: SearchResult[]) {
  return `You are the friendly website assistant for ${clinic.name}, a gastroenterology and liver clinic.

Answer the visitor's question using ONLY the website content below. If the answer isn't there, say so briefly and suggest calling ${clinic.phone} or using the contact page. Never invent facts, prices, names or timings.

Style: warm, clear, 2–4 short sentences. Plain text only — no markdown, no URLs (the relevant pages are shown to the visitor as links under your reply, so you can say "see the page below").

Safety: you are not a doctor and must not diagnose. If the visitor describes bleeding, vomiting blood, black stools, severe pain, chest pain or fainting, start by telling them to call the 24×7 emergency line on ${clinic.phone} or go to the nearest hospital.

WEBSITE CONTENT:
${hits.length ? contextFor(hits) : "(no matching pages found)"}`;
}

export async function POST(req: Request) {
  const { messages }: { messages: ChatUIMessage[] } = await req.json();

  const userTurns = messages.filter((m) => m.role === "user").map(textOf);
  const question = userTurns.at(-1) ?? "";
  const previous = userTurns.at(-2);
  const hits = searchSite(question, previous, 5);
  const useAI = aiEnabled();

  const stream = createUIMessageStream<ChatUIMessage>({
    execute: async ({ writer }) => {
      writer.write({ type: "start" });

      // Matching pages are sent first so the link cards appear instantly.
      if (!GREETING.test(question)) {
        writer.write({
          type: "data-pages",
          data: {
            ai: useAI,
            results: hits.slice(0, 4).map(({ url, title, section, snippet }) => ({ url, title, section, snippet })),
          },
        });
      }

      // Writes an answer built from the search results (no AI needed)
      const writeLocalAnswer = (text: string) => {
        const id = "local-answer";
        writer.write({ type: "text-start", id });
        writer.write({ type: "text-delta", id, delta: text });
        writer.write({ type: "text-end", id });
      };

      if (!useAI) {
        writeLocalAnswer(composeAnswer(question, hits));
        writer.write({ type: "finish" });
        return;
      }

      // AI path: forward the model's stream chunk by chunk. If the AI call fails
      // (bad key, credits used up, provider outage), quietly fall back to the
      // search-based answer so the visitor never sees an error.
      const result = streamText({
        model: MODEL,
        instructions: instructions(hits),
        messages: await convertToModelMessages(messages.slice(-8)),
        maxOutputTokens: 400,
        abortSignal: req.signal,
      });
      const reader = toUIMessageStream<ToolSet, ChatUIMessage>({
        stream: result.stream,
        sendStart: false,
        onError: (e) => {
          console.error("[chat] AI answer failed, using site-search fallback:", e);
          return "ai-failed";
        },
      }).getReader();

      let wroteText = false;
      let finished = false;
      for (;;) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        if (chunk.type === "error") {
          writeLocalAnswer(
            wroteText
              ? `\n\nSorry, I was cut off — please see the pages below or call ${clinic.phone}.`
              : composeAnswer(question, hits)
          );
          continue;
        }
        if (chunk.type === "text-delta") wroteText = true;
        if (chunk.type === "finish") finished = true;
        writer.write(chunk);
      }
      if (!finished) writer.write({ type: "finish" });
    },
    onError: (e) => {
      console.error("[chat] request failed:", e);
      return `Sorry, I couldn't answer that just now. Please try again, or call us on ${clinic.phone}.`;
    },
  });

  return createUIMessageStreamResponse({ stream });
}
