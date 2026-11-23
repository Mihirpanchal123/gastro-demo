"use client";

import { FileDown } from "lucide-react";

/** Opens the browser print dialog — choose "Save as PDF" to download the brochure. */
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 font-medium text-ink transition hover:bg-white print:hidden"
    >
      <FileDown className="h-5 w-5" /> Download as PDF
    </button>
  );
}
