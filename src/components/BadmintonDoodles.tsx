export function BadmintonDoodles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large badminton court outline - right side */}
      <svg 
        className="absolute -right-20 top-1/4 w-[500px] h-[600px] opacity-[0.08] animate-float"
        viewBox="0 0 200 300" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
      >
        {/* Court outline */}
        <rect x="20" y="20" width="160" height="260" rx="4" />
        {/* Net line */}
        <line x1="20" y1="150" x2="180" y2="150" strokeWidth="2" strokeDasharray="8 4" />
        {/* Service lines */}
        <line x1="20" y1="80" x2="180" y2="80" />
        <line x1="20" y1="220" x2="180" y2="220" />
        {/* Center lines */}
        <line x1="100" y1="20" x2="100" y2="80" />
        <line x1="100" y1="220" x2="100" y2="280" />
        {/* Side tramlines */}
        <line x1="40" y1="20" x2="40" y2="280" />
        <line x1="160" y1="20" x2="160" y2="280" />
      </svg>

      {/* Shuttlecock 1 - top left */}
      <svg 
        className="absolute left-[15%] top-[20%] w-12 h-16 opacity-20 animate-shuttle-fly"
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--accent))" 
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {/* Cork base */}
        <ellipse cx="20" cy="50" rx="8" ry="6" fill="hsl(var(--rank-gold) / 0.3)" />
        {/* Feathers */}
        <path d="M12 50 Q8 30 14 10" />
        <path d="M16 50 Q14 32 18 10" />
        <path d="M20 50 Q20 35 20 10" />
        <path d="M24 50 Q26 32 22 10" />
        <path d="M28 50 Q32 30 26 10" />
        {/* Feather tops */}
        <path d="M10 10 Q14 8 18 10" />
        <path d="M18 10 Q20 6 22 10" />
        <path d="M22 10 Q26 8 30 10" />
      </svg>

      {/* Shuttlecock 2 - middle right */}
      <svg 
        className="absolute right-[20%] top-[45%] w-10 h-14 opacity-15 animate-shuttle-fly"
        style={{ animationDelay: '1s' }}
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <ellipse cx="20" cy="50" rx="8" ry="6" fill="hsl(var(--primary) / 0.2)" />
        <path d="M12 50 Q8 30 14 10" />
        <path d="M16 50 Q14 32 18 10" />
        <path d="M20 50 Q20 35 20 10" />
        <path d="M24 50 Q26 32 22 10" />
        <path d="M28 50 Q32 30 26 10" />
        <path d="M10 10 Q14 8 18 10" />
        <path d="M18 10 Q20 6 22 10" />
        <path d="M22 10 Q26 8 30 10" />
      </svg>

      {/* Shuttlecock 3 - bottom left */}
      <svg 
        className="absolute left-[8%] bottom-[30%] w-8 h-12 opacity-15 animate-shuttle-fly"
        style={{ animationDelay: '2s' }}
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--rank-bronze))" 
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <ellipse cx="20" cy="50" rx="8" ry="6" fill="hsl(var(--rank-bronze) / 0.2)" />
        <path d="M12 50 Q8 30 14 10" />
        <path d="M16 50 Q14 32 18 10" />
        <path d="M20 50 Q20 35 20 10" />
        <path d="M24 50 Q26 32 22 10" />
        <path d="M28 50 Q32 30 26 10" />
      </svg>

      {/* Racket 1 - top right corner */}
      <svg 
        className="absolute right-[10%] top-[15%] w-20 h-28 opacity-[0.12] animate-racket-swing"
        viewBox="0 0 60 100" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {/* Racket head */}
        <ellipse cx="30" cy="30" rx="22" ry="28" />
        {/* Strings horizontal */}
        <line x1="12" y1="20" x2="48" y2="20" />
        <line x1="10" y1="26" x2="50" y2="26" />
        <line x1="10" y1="32" x2="50" y2="32" />
        <line x1="12" y1="38" x2="48" y2="38" />
        <line x1="16" y1="44" x2="44" y2="44" />
        {/* Strings vertical */}
        <line x1="20" y1="5" x2="20" y2="52" />
        <line x1="26" y1="3" x2="26" y2="55" />
        <line x1="32" y1="3" x2="32" y2="55" />
        <line x1="38" y1="5" x2="38" y2="52" />
        {/* Handle */}
        <line x1="30" y1="58" x2="30" y2="95" strokeWidth="3" />
        <rect x="25" y="85" width="10" height="12" rx="2" />
      </svg>

      {/* Racket 2 - bottom left corner */}
      <svg 
        className="absolute left-[5%] bottom-[10%] w-16 h-24 opacity-10 animate-racket-swing"
        style={{ animationDelay: '0.5s', transform: 'rotate(-30deg)' }}
        viewBox="0 0 60 100" 
        fill="none" 
        stroke="hsl(var(--accent))" 
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <ellipse cx="30" cy="30" rx="22" ry="28" />
        <line x1="12" y1="20" x2="48" y2="20" />
        <line x1="10" y1="30" x2="50" y2="30" />
        <line x1="12" y1="40" x2="48" y2="40" />
        <line x1="22" y1="5" x2="22" y2="52" />
        <line x1="30" y1="3" x2="30" y2="55" />
        <line x1="38" y1="5" x2="38" y2="52" />
        <line x1="30" y1="58" x2="30" y2="95" strokeWidth="3" />
      </svg>

      {/* Motion arc 1 - curved trajectory */}
      <svg 
        className="absolute left-[25%] top-[35%] w-40 h-20 opacity-10"
        viewBox="0 0 160 80" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 6"
      >
        <path d="M10 70 Q80 -10 150 40" className="animate-draw-path" />
      </svg>

      {/* Motion arc 2 */}
      <svg 
        className="absolute right-[30%] bottom-[40%] w-32 h-16 opacity-10"
        viewBox="0 0 130 60" 
        fill="none" 
        stroke="hsl(var(--accent))" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
      >
        <path d="M5 50 Q65 -5 125 30" />
      </svg>

      {/* Net pattern - horizontal decorative */}
      <svg 
        className="absolute left-[10%] top-[60%] w-32 h-8 opacity-10"
        viewBox="0 0 120 30" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="1"
        strokeLinecap="round"
      >
        {/* Net mesh */}
        <line x1="0" y1="15" x2="120" y2="15" strokeWidth="1.5" />
        <line x1="10" y1="5" x2="10" y2="25" />
        <line x1="30" y1="5" x2="30" y2="25" />
        <line x1="50" y1="5" x2="50" y2="25" />
        <line x1="70" y1="5" x2="70" y2="25" />
        <line x1="90" y1="5" x2="90" y2="25" />
        <line x1="110" y1="5" x2="110" y2="25" />
        <path d="M0 5 Q10 10 20 5 Q30 0 40 5 Q50 10 60 5 Q70 0 80 5 Q90 10 100 5 Q110 0 120 5" />
        <path d="M0 25 Q10 20 20 25 Q30 30 40 25 Q50 20 60 25 Q70 30 80 25 Q90 20 100 25 Q110 30 120 25" />
      </svg>

      {/* Score bubble 1 */}
      <div className="absolute right-[15%] top-[70%] opacity-15 animate-wiggle">
        <div className="bg-primary/20 rounded-full px-3 py-1 border-2 border-dashed border-primary/30 rotate-slight-left">
          <span className="font-display text-primary/60 text-sm">21-19</span>
        </div>
      </div>

      {/* Score bubble 2 */}
      <div className="absolute left-[20%] top-[75%] opacity-10 animate-wiggle" style={{ animationDelay: '1s' }}>
        <div className="bg-accent/20 rounded-full px-2 py-1 border-2 border-dashed border-accent/30 rotate-slight-right">
          <span className="font-display text-accent/60 text-xs">GAME!</span>
        </div>
      </div>

      {/* Small decorative stars */}
      <svg className="absolute left-[40%] top-[25%] w-6 h-6 opacity-20 animate-sparkle" viewBox="0 0 24 24" fill="hsl(var(--rank-gold))">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
      
      <svg className="absolute right-[35%] top-[55%] w-4 h-4 opacity-15 animate-sparkle" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="hsl(var(--accent))">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      <svg className="absolute left-[60%] bottom-[20%] w-5 h-5 opacity-15 animate-sparkle" style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24" fill="hsl(var(--primary))">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
    </div>
  );
}
