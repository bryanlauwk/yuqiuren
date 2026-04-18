export function BadmintonDoodles() {
  const ink = "hsl(var(--foreground))";
  const lime = "hsl(var(--primary))";
  const cream = "hsl(var(--background))";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Court — right side */}
      <svg
        className="absolute -right-10 top-1/4 w-[400px] h-[500px] opacity-[0.18] animate-float"
        viewBox="0 0 200 300"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      >
        <rect x="20" y="20" width="160" height="260" rx="2" fill={lime} fillOpacity="0.08" />
        <line x1="20" y1="150" x2="180" y2="150" strokeWidth="3.5" />
        <line x1="20" y1="80" x2="180" y2="80" />
        <line x1="20" y1="220" x2="180" y2="220" />
        <line x1="100" y1="20" x2="100" y2="80" />
        <line x1="100" y1="220" x2="100" y2="280" />
        <line x1="40" y1="20" x2="40" y2="280" />
        <line x1="160" y1="20" x2="160" y2="280" />
      </svg>

      {/* Court — left side rotated */}
      <svg
        className="absolute -left-16 top-[55%] w-[250px] h-[320px] opacity-[0.15] animate-float-slow"
        viewBox="0 0 200 300"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        style={{ transform: 'rotate(15deg)' }}
      >
        <rect x="20" y="20" width="160" height="260" rx="2" />
        <line x1="20" y1="150" x2="180" y2="150" strokeWidth="3.5" />
        <line x1="100" y1="20" x2="100" y2="280" />
      </svg>

      {/* Shuttlecock 1 */}
      <svg
        className="absolute left-[12%] top-[18%] w-16 h-20 opacity-60 animate-shuttle-fly"
        viewBox="0 0 40 60"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="20" cy="50" rx="9" ry="6" fill={lime} />
        <path d="M12 50 L10 10" />
        <path d="M16 50 L16 10" />
        <path d="M20 50 L20 8" />
        <path d="M24 50 L24 10" />
        <path d="M28 50 L30 10" />
        <path d="M10 10 L30 10" />
      </svg>

      {/* Shuttlecock 2 */}
      <svg
        className="absolute right-[15%] top-[40%] w-14 h-18 opacity-50 animate-shuttle-fly"
        style={{ animationDelay: '1s' }}
        viewBox="0 0 40 60"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="20" cy="50" rx="9" ry="6" fill={lime} />
        <path d="M12 50 L10 10" />
        <path d="M16 50 L16 10" />
        <path d="M20 50 L20 8" />
        <path d="M24 50 L24 10" />
        <path d="M28 50 L30 10" />
        <path d="M10 10 L30 10" />
      </svg>

      {/* Shuttlecock 3 */}
      <svg
        className="absolute left-[45%] bottom-[15%] w-12 h-16 opacity-45 animate-shuttle-fly"
        style={{ animationDelay: '2s' }}
        viewBox="0 0 40 60"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="20" cy="50" rx="9" ry="6" fill={lime} />
        <path d="M12 50 L10 10" />
        <path d="M20 50 L20 8" />
        <path d="M28 50 L30 10" />
        <path d="M10 10 L30 10" />
      </svg>

      {/* Racket 1 — top right */}
      <svg
        className="absolute right-[8%] top-[12%] w-24 h-32 opacity-[0.35] animate-racket-swing"
        viewBox="0 0 60 100"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      >
        <ellipse cx="30" cy="30" rx="22" ry="28" fill={cream} />
        {/* strings */}
        <line x1="12" y1="18" x2="48" y2="18" strokeWidth="1.2" />
        <line x1="10" y1="24" x2="50" y2="24" strokeWidth="1.2" />
        <line x1="10" y1="30" x2="50" y2="30" strokeWidth="1.2" />
        <line x1="10" y1="36" x2="50" y2="36" strokeWidth="1.2" />
        <line x1="12" y1="42" x2="48" y2="42" strokeWidth="1.2" />
        <line x1="18" y1="5" x2="18" y2="52" strokeWidth="1.2" />
        <line x1="24" y1="3" x2="24" y2="55" strokeWidth="1.2" />
        <line x1="30" y1="2" x2="30" y2="56" strokeWidth="1.2" />
        <line x1="36" y1="3" x2="36" y2="55" strokeWidth="1.2" />
        <line x1="42" y1="5" x2="42" y2="52" strokeWidth="1.2" />
        {/* handle */}
        <line x1="30" y1="58" x2="30" y2="95" strokeWidth="5" />
        {/* lime grip tape */}
        <rect x="24" y="72" width="12" height="14" fill={lime} stroke={ink} strokeWidth="2" />
      </svg>

      {/* Racket 2 — bottom left */}
      <svg
        className="absolute left-[3%] bottom-[8%] w-20 h-28 opacity-[0.32] animate-racket-swing"
        style={{ animationDelay: '0.5s' }}
        viewBox="0 0 60 100"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      >
        <ellipse cx="30" cy="30" rx="22" ry="28" fill={cream} />
        <line x1="12" y1="20" x2="48" y2="20" strokeWidth="1.2" />
        <line x1="10" y1="30" x2="50" y2="30" strokeWidth="1.2" />
        <line x1="12" y1="40" x2="48" y2="40" strokeWidth="1.2" />
        <line x1="22" y1="5" x2="22" y2="52" strokeWidth="1.2" />
        <line x1="30" y1="3" x2="30" y2="55" strokeWidth="1.2" />
        <line x1="38" y1="5" x2="38" y2="52" strokeWidth="1.2" />
        <line x1="30" y1="58" x2="30" y2="95" strokeWidth="5" />
        <rect x="24" y="72" width="12" height="14" fill={lime} stroke={ink} strokeWidth="2" />
      </svg>

      {/* Racket 3 — middle left small */}
      <svg
        className="absolute left-[2%] top-[30%] w-16 h-22 opacity-[0.22] animate-racket-swing"
        style={{ animationDelay: '1.5s', transform: 'rotate(-20deg)' }}
        viewBox="0 0 60 100"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <ellipse cx="30" cy="30" rx="22" ry="28" fill={cream} />
        <line x1="10" y1="30" x2="50" y2="30" />
        <line x1="30" y1="3" x2="30" y2="55" />
        <line x1="30" y1="58" x2="30" y2="95" strokeWidth="4" />
      </svg>

      {/* Motion arc 1 */}
      <svg
        className="absolute left-[20%] top-[32%] w-48 h-24 opacity-[0.3]"
        viewBox="0 0 160 80"
        fill="none"
        stroke={ink}
        strokeWidth="3.5"
        strokeLinecap="round"
      >
        <path d="M10 70 Q80 -10 150 40" />
      </svg>

      {/* Motion arc 2 */}
      <svg
        className="absolute right-[25%] bottom-[35%] w-40 h-20 opacity-[0.25]"
        viewBox="0 0 130 60"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M5 50 Q65 -5 125 30" />
      </svg>

      {/* Motion arc 3 */}
      <svg
        className="absolute left-[50%] top-[8%] w-32 h-16 opacity-[0.22]"
        viewBox="0 0 130 60"
        fill="none"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M5 10 Q65 55 125 20" />
      </svg>

      {/* Net pattern */}
      <svg
        className="absolute left-[8%] top-[62%] w-40 h-10 opacity-[0.3]"
        viewBox="0 0 120 30"
        fill="none"
        stroke={ink}
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="0" y1="15" x2="120" y2="15" strokeWidth="3" />
        <line x1="10" y1="5" x2="10" y2="25" />
        <line x1="30" y1="5" x2="30" y2="25" />
        <line x1="50" y1="5" x2="50" y2="25" />
        <line x1="70" y1="5" x2="70" y2="25" />
        <line x1="90" y1="5" x2="90" y2="25" />
        <line x1="110" y1="5" x2="110" y2="25" />
      </svg>

      {/* Score bubble 1 — neo-brutal card */}
      <div className="absolute right-[12%] top-[68%] opacity-90 animate-wiggle">
        <div className="bg-background border-2 border-foreground px-4 py-1.5 shadow-[3px_3px_0_hsl(var(--foreground))] rotate-[-4deg]">
          <span className="font-display text-foreground text-base">21-19</span>
        </div>
      </div>

      {/* Score bubble 2 — lime fill */}
      <div className="absolute left-[18%] top-[78%] opacity-90 animate-wiggle" style={{ animationDelay: '1s' }}>
        <div className="bg-primary border-2 border-foreground px-3 py-1 shadow-[3px_3px_0_hsl(var(--foreground))] rotate-[3deg]">
          <span className="font-display text-foreground text-sm">GAME!</span>
        </div>
      </div>

      {/* Score bubble 3 */}
      <div className="absolute right-[30%] top-[25%] opacity-80 animate-wiggle" style={{ animationDelay: '0.7s' }}>
        <div className="bg-background border-2 border-foreground px-3 py-1 shadow-[3px_3px_0_hsl(var(--foreground))] rotate-[-2deg]">
          <span className="font-display text-foreground text-xs">15-14</span>
        </div>
      </div>

      {/* Stars — lime fill, black stroke */}
      <svg className="absolute left-[35%] top-[22%] w-8 h-8 opacity-80 animate-sparkle" viewBox="0 0 24 24" fill={lime} stroke={ink} strokeWidth="1.5" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
      <svg className="absolute right-[40%] top-[52%] w-6 h-6 opacity-70 animate-sparkle" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill={lime} stroke={ink} strokeWidth="1.5" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
      <svg className="absolute left-[55%] bottom-[22%] w-7 h-7 opacity-75 animate-sparkle" style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24" fill={lime} stroke={ink} strokeWidth="1.5" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
      <svg className="absolute right-[5%] top-[55%] w-5 h-5 opacity-70 animate-sparkle" style={{ animationDelay: '2s' }} viewBox="0 0 24 24" fill={lime} stroke={ink} strokeWidth="1.5" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      {/* Solid dots */}
      <div className="absolute left-[70%] top-[15%] w-4 h-4 rounded-full bg-primary border-2 border-foreground animate-bounce-subtle" />
      <div className="absolute left-[25%] top-[45%] w-3 h-3 rounded-full bg-foreground animate-bounce-subtle" style={{ animationDelay: '0.3s' }} />
      <div className="absolute right-[20%] bottom-[25%] w-5 h-5 rounded-full bg-primary border-2 border-foreground animate-bounce-subtle" style={{ animationDelay: '0.6s' }} />
      <div className="absolute left-[80%] top-[75%] w-3 h-3 rounded-full bg-foreground animate-bounce-subtle" style={{ animationDelay: '0.9s' }} />

      {/* Squiggly lines */}
      <svg className="absolute left-[60%] top-[5%] w-24 h-4 opacity-40" viewBox="0 0 100 16" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round">
        <path d="M0 8 Q12.5 0, 25 8 T50 8 T75 8 T100 8" />
      </svg>
      <svg className="absolute right-[10%] bottom-[45%] w-20 h-4 opacity-35" viewBox="0 0 100 16" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round">
        <path d="M0 8 Q12.5 16, 25 8 T50 8 T75 8 T100 8" />
      </svg>
    </div>
  );
}
