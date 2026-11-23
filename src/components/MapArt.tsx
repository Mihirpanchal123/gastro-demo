/** Stylised map illustration — stands in for an embedded Google Map. */
export default function MapArt({ pins = 2, className = "" }: { pins?: 1 | 2; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-ink-2 ${className}`}>
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="600" height="400" fill="#12302e" />
        {/* River */}
        <path d="M330 -10 C 310 90, 360 160, 320 240 S 300 360, 340 420" stroke="#0e7c6b" strokeWidth="26" fill="none" opacity=".55" />
        {/* Roads */}
        <g stroke="rgba(255,255,255,.12)" strokeWidth="2" fill="none">
          <path d="M0 120 H600" />
          <path d="M0 280 C 150 260, 420 300, 600 270" />
          <path d="M140 0 V400" />
          <path d="M470 0 C 460 120, 500 250, 480 400" />
          <path d="M0 40 L 600 360" strokeWidth="4" stroke="rgba(159,231,210,.25)" />
        </g>
        <g stroke="rgba(255,255,255,.06)" strokeWidth="1">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={`v${i}`} d={`M${i * 50} 0 V400`} />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <path key={`h${i}`} d={`M0 ${i * 50} H600`} />
          ))}
        </g>
      </svg>
      {/* Pins */}
      <span className="absolute top-[38%] left-[22%] flex flex-col items-center">
        <span className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-ink shadow-lg">Main Clinic</span>
        <span className="relative mt-1 h-3 w-3 rounded-full bg-mint text-mint pulse-dot" />
      </span>
      {pins === 2 && (
        <span className="absolute top-[58%] left-[68%] flex flex-col items-center">
          <span className="rounded-full bg-coral px-3 py-1 text-xs font-medium text-ink shadow-lg">East Branch</span>
          <span className="relative mt-1 h-3 w-3 rounded-full bg-coral text-coral pulse-dot" />
        </span>
      )}
      <span className="absolute right-4 bottom-4 rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/60 backdrop-blur">
        Interactive map goes here
      </span>
    </div>
  );
}
