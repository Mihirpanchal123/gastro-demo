import type { UIMessage } from "ai";

/** A page on the site that matched the visitor's question. */
export type PageHit = {
  url: string;
  title: string;
  section: string;
  snippet: string;
};

/** Chat message type shared by the API route and the chat widget. */
export type ChatUIMessage = UIMessage<
  never,
  {
    pages: { ai: boolean; results: PageHit[] };
  }
>;
