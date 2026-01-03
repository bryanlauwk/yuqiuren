export function BadmintonDoodles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large badminton court outline - right side */}
      <svg 
        className="absolute -right-10 top-1/4 w-[400px] h-[500px] opacity-[0.15] animate-float"
        viewBox="0 0 200 300" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
      >
        {/* Court outline */}
        <rect x="20" y="20" width="160" height="260" rx="4" />
        {/* Net line */}
        <line x1="20" y1="150" x2="180" y2="150" strokeWidth="2.5" strokeDasharray="10 5" />
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

      {/* Second court - left side, smaller */}
      <svg 
        className="absolute -left-16 top-[55%] w-[250px] h-[320px] opacity-[0.1] animate-float-slow"
        viewBox="0 0 200 300" 
        fill="none" 
        stroke="hsl(var(--accent))" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 5"
        style={{ transform: 'rotate(15deg)' }}
      >
        <rect x="20" y="20" width="160" height="260" rx="4" />
        <line x1="20" y1="150" x2="180" y2="150" strokeWidth="2" />
        <line x1="100" y1="20" x2="100" y2="280" />
      </svg>

      {/* Shuttlecock 1 - top left, bigger */}
      <svg 
        className="absolute left-[12%] top-[18%] w-16 h-20 opacity-30 animate-shuttle-fly"
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--accent))" 
        strokeWidth="2"
        strokeLinecap="round"
      >
        {/* Cork base */}
        <ellipse cx="20" cy="50" rx="8" ry="6" fill="hsl(var(--rank-gold) / 0.4)" stroke="hsl(var(--rank-gold))" />
        {/* Feathers */}
        <path d="M12 50 Q8 30 14 10" />
        <path d="M16 50 Q14 32 18 10" />
        <path d="M20 50 Q20 35 20 10" />
        <path d="M24 50 Q26 32 22 10" />
        <path d="M28 50 Q32 30 26 10" />
        {/* Feather tops */}
        <path d="M10 10 Q14 6 18 10" />
        <path d="M18 10 Q20 4 22 10" />
        <path d="M22 10 Q26 6 30 10" />
      </svg>

      {/* Shuttlecock 2 - middle right */}
      <svg 
        className="absolute right-[15%] top-[40%] w-14 h-18 opacity-25 animate-shuttle-fly"
        style={{ animationDelay: '1s' }}
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2"
        strokeLinecap="round"
      >
        <ellipse cx="20" cy="50" rx="8" ry="6" fill="hsl(var(--primary) / 0.3)" />
        <path d="M12 50 Q8 30 14 10" />
        <path d="M16 50 Q14 32 18 10" />
        <path d="M20 50 Q20 35 20 10" />
        <path d="M24 50 Q26 32 22 10" />
        <path d="M28 50 Q32 30 26 10" />
        <path d="M10 10 Q14 6 18 10" />
        <path d="M22 10 Q26 6 30 10" />
      </svg>

      {/* Shuttlecock 3 - bottom center */}
      <svg 
        className="absolute left-[45%] bottom-[15%] w-12 h-16 opacity-20 animate-shuttle-fly"
        style={{ animationDelay: '2s' }}
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--rank-bronze))" 
        strokeWidth="2"
        strokeLinecap="round"
      >
        <ellipse cx="20" cy="50" rx="8" ry="6" fill="hsl(var(--rank-bronze) / 0.3)" />
        <path d="M12 50 Q8 30 14 10" />
        <path d="M16 50 Q14 32 18 10" />
        <path d="M20 50 Q20 35 20 10" />
        <path d="M24 50 Q26 32 22 10" />
        <path d="M28 50 Q32 30 26 10" />
      </svg>

      {/* Shuttlecock 4 - left side */}
      <svg 
        className="absolute left-[5%] top-[50%] w-10 h-14 opacity-20 animate-shuttle-fly"
        style={{ animationDelay: '0.5s' }}
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--rank-gold))" 
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <ellipse cx="20" cy="50" rx="8" ry="6" fill="hsl(var(--rank-gold) / 0.2)" />
        <path d="M12 50 Q8 30 14 10" />
        <path d="M20 50 Q20 35 20 10" />
        <path d="M28 50 Q32 30 26 10" />
      </svg>

      {/* Racket 1 - top right corner, more visible */}
      <svg 
        className="absolute right-[8%] top-[12%] w-24 h-32 opacity-[0.2] animate-racket-swing"
        viewBox="0 0 60 100" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2"
        strokeLinecap="round"
      >
        {/* Racket head */}
        <ellipse cx="30" cy="30" rx="22" ry="28" />
        {/* Strings horizontal */}
        <line x1="12" y1="18" x2="48" y2="18" strokeWidth="1" />
        <line x1="10" y1="24" x2="50" y2="24" strokeWidth="1" />
        <line x1="10" y1="30" x2="50" y2="30" strokeWidth="1" />
        <line x1="10" y1="36" x2="50" y2="36" strokeWidth="1" />
        <line x1="12" y1="42" x2="48" y2="42" strokeWidth="1" />
        {/* Strings vertical */}
        <line x1="18" y1="5" x2="18" y2="52" strokeWidth="1" />
        <line x1="24" y1="3" x2="24" y2="55" strokeWidth="1" />
        <line x1="30" y1="2" x2="30" y2="56" strokeWidth="1" />
        <line x1="36" y1="3" x2="36" y2="55" strokeWidth="1" />
        <line x1="42" y1="5" x2="42" y2="52" strokeWidth="1" />
        {/* Handle */}
        <line x1="30" y1="58" x2="30" y2="95" strokeWidth="4" />
        <rect x="24" y="85" width="12" height="14" rx="2" />
      </svg>

      {/* Racket 2 - bottom left corner */}
      <svg 
        className="absolute left-[3%] bottom-[8%] w-20 h-28 opacity-[0.18] animate-racket-swing"
        style={{ animationDelay: '0.5s' }}
        viewBox="0 0 60 100" 
        fill="none" 
        stroke="hsl(var(--accent))" 
        strokeWidth="2"
        strokeLinecap="round"
      >
        <ellipse cx="30" cy="30" rx="22" ry="28" />
        <line x1="12" y1="20" x2="48" y2="20" strokeWidth="1" />
        <line x1="10" y1="30" x2="50" y2="30" strokeWidth="1" />
        <line x1="12" y1="40" x2="48" y2="40" strokeWidth="1" />
        <line x1="22" y1="5" x2="22" y2="52" strokeWidth="1" />
        <line x1="30" y1="3" x2="30" y2="55" strokeWidth="1" />
        <line x1="38" y1="5" x2="38" y2="52" strokeWidth="1" />
        <line x1="30" y1="58" x2="30" y2="95" strokeWidth="4" />
      </svg>

      {/* Racket 3 - middle left */}
      <svg 
        className="absolute left-[2%] top-[30%] w-16 h-22 opacity-[0.12] animate-racket-swing"
        style={{ animationDelay: '1.5s', transform: 'rotate(-20deg)' }}
        viewBox="0 0 60 100" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <ellipse cx="30" cy="30" rx="22" ry="28" />
        <line x1="10" y1="30" x2="50" y2="30" />
        <line x1="30" y1="3" x2="30" y2="55" />
        <line x1="30" y1="58" x2="30" y2="95" strokeWidth="3" />
      </svg>

      {/* Motion arc 1 - curved trajectory */}
      <svg 
        className="absolute left-[20%] top-[32%] w-48 h-24 opacity-[0.15]"
        viewBox="0 0 160 80" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8 6"
      >
        <path d="M10 70 Q80 -10 150 40" className="animate-draw-path" />
      </svg>

      {/* Motion arc 2 */}
      <svg 
        className="absolute right-[25%] bottom-[35%] w-40 h-20 opacity-[0.12]"
        viewBox="0 0 130 60" 
        fill="none" 
        stroke="hsl(var(--accent))" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
      >
        <path d="M5 50 Q65 -5 125 30" />
      </svg>

      {/* Motion arc 3 - top area */}
      <svg 
        className="absolute left-[50%] top-[8%] w-32 h-16 opacity-[0.1]"
        viewBox="0 0 130 60" 
        fill="none" 
        stroke="hsl(var(--rank-gold))" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      >
        <path d="M5 10 Q65 55 125 20" />
      </svg>

      {/* Net pattern - horizontal decorative */}
      <svg 
        className="absolute left-[8%] top-[62%] w-40 h-10 opacity-[0.15]"
        viewBox="0 0 120 30" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        {/* Net mesh */}
        <line x1="0" y1="15" x2="120" y2="15" strokeWidth="2" />
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
      <div className="absolute right-[12%] top-[68%] opacity-25 animate-wiggle">
        <div className="bg-primary/30 rounded-full px-4 py-2 border-2 border-dashed border-primary/40 rotate-slight-left">
          <span className="font-display text-primary text-base">21-19</span>
        </div>
      </div>

      {/* Score bubble 2 */}
      <div className="absolute left-[18%] top-[78%] opacity-20 animate-wiggle" style={{ animationDelay: '1s' }}>
        <div className="bg-accent/30 rounded-full px-3 py-1.5 border-2 border-dashed border-accent/40 rotate-slight-right">
          <span className="font-display text-accent-foreground text-sm">GAME!</span>
        </div>
      </div>

      {/* Score bubble 3 */}
      <div className="absolute right-[30%] top-[25%] opacity-15 animate-wiggle" style={{ animationDelay: '0.7s' }}>
        <div className="bg-rank-gold/20 rounded-full px-3 py-1 border-2 border-dashed border-rank-gold/30 rotate-slight-left">
          <span className="font-display text-foreground/60 text-xs">15-14</span>
        </div>
      </div>

      {/* Decorative stars */}
      <svg className="absolute left-[35%] top-[22%] w-8 h-8 opacity-30 animate-sparkle" viewBox="0 0 24 24" fill="hsl(var(--rank-gold))">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
      
      <svg className="absolute right-[40%] top-[52%] w-6 h-6 opacity-25 animate-sparkle" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="hsl(var(--accent))">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      <svg className="absolute left-[55%] bottom-[22%] w-7 h-7 opacity-20 animate-sparkle" style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24" fill="hsl(var(--primary))">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      <svg className="absolute right-[5%] top-[55%] w-5 h-5 opacity-20 animate-sparkle" style={{ animationDelay: '2s' }} viewBox="0 0 24 24" fill="hsl(var(--rank-silver))">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      {/* Decorative circles/dots */}
      <div className="absolute left-[70%] top-[15%] w-4 h-4 rounded-full bg-primary/20 animate-bounce-subtle" />
      <div className="absolute left-[25%] top-[45%] w-3 h-3 rounded-full bg-accent/25 animate-bounce-subtle" style={{ animationDelay: '0.3s' }} />
      <div className="absolute right-[20%] bottom-[25%] w-5 h-5 rounded-full bg-rank-gold/15 animate-bounce-subtle" style={{ animationDelay: '0.6s' }} />
      <div className="absolute left-[80%] top-[75%] w-3 h-3 rounded-full bg-primary/15 animate-bounce-subtle" style={{ animationDelay: '0.9s' }} />

      {/* Squiggly lines */}
      <svg className="absolute left-[60%] top-[5%] w-24 h-4 opacity-20" viewBox="0 0 100 16" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
        <path d="M0 8 Q12.5 0, 25 8 T50 8 T75 8 T100 8" />
      </svg>
      
      <svg className="absolute right-[10%] bottom-[45%] w-20 h-4 opacity-15" viewBox="0 0 100 16" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round">
        <path d="M0 8 Q12.5 16, 25 8 T50 8 T75 8 T100 8" />
      </svg>
    </div>
  );
}
