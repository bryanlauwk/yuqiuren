import { useState } from 'react';

export function BadmintonRally() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="relative w-full h-12 overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Hover hint */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
        <span className="text-xs text-muted-foreground/50">hover to speed up!</span>
      </div>

      {/* Left racket */}
      <svg 
        className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-8 h-12 ${isHovering ? 'animate-racket-hit-left-fast' : 'animate-racket-hit-left'}`}
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2"
        strokeLinecap="round"
      >
        {/* Racket head */}
        <ellipse cx="20" cy="18" rx="14" ry="16" />
        {/* Strings */}
        <line x1="10" y1="12" x2="30" y2="12" strokeWidth="1" />
        <line x1="8" y1="18" x2="32" y2="18" strokeWidth="1" />
        <line x1="10" y1="24" x2="30" y2="24" strokeWidth="1" />
        <line x1="14" y1="4" x2="14" y2="30" strokeWidth="1" />
        <line x1="20" y1="2" x2="20" y2="32" strokeWidth="1" />
        <line x1="26" y1="4" x2="26" y2="30" strokeWidth="1" />
        {/* Handle */}
        <line x1="20" y1="34" x2="20" y2="55" strokeWidth="3" />
        <rect x="16" y="50" width="8" height="8" rx="1" fill="hsl(var(--primary) / 0.3)" />
      </svg>

      {/* Animated shuttlecock */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${isHovering ? 'animate-rally-shuttle-fast' : 'animate-rally-shuttle'}`}>
        <svg 
          className={`w-6 h-8 ${isHovering ? 'animate-shuttle-spin-fast' : 'animate-shuttle-spin'}`}
          viewBox="0 0 24 36" 
          fill="none" 
          stroke="hsl(var(--accent))" 
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {/* Cork */}
          <ellipse cx="12" cy="30" rx="5" ry="4" fill="hsl(var(--rank-gold))" stroke="hsl(var(--rank-gold))" />
          {/* Feathers */}
          <path d="M7 30 Q4 18 8 4" />
          <path d="M10 30 Q9 20 11 4" />
          <path d="M12 30 Q12 22 12 4" />
          <path d="M14 30 Q15 20 13 4" />
          <path d="M17 30 Q20 18 16 4" />
          {/* Feather tops */}
          <path d="M6 4 Q9 2 12 4" strokeWidth="1" />
          <path d="M12 4 Q15 2 18 4" strokeWidth="1" />
        </svg>
      </div>

      {/* Speed lines when fast */}
      {isHovering && (
        <>
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-accent/40 to-transparent animate-speed-line" />
          <div className="absolute left-1/3 top-[40%] w-6 h-0.5 bg-gradient-to-r from-accent/30 to-transparent animate-speed-line" style={{ animationDelay: '0.1s' }} />
          <div className="absolute left-1/3 top-[60%] w-6 h-0.5 bg-gradient-to-r from-accent/30 to-transparent animate-speed-line" style={{ animationDelay: '0.2s' }} />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-l from-accent/40 to-transparent animate-speed-line-reverse" />
          <div className="absolute right-1/3 top-[40%] w-6 h-0.5 bg-gradient-to-l from-accent/30 to-transparent animate-speed-line-reverse" style={{ animationDelay: '0.1s' }} />
          <div className="absolute right-1/3 top-[60%] w-6 h-0.5 bg-gradient-to-l from-accent/30 to-transparent animate-speed-line-reverse" style={{ animationDelay: '0.2s' }} />
        </>
      )}

      {/* Right racket */}
      <svg 
        className={`absolute right-4 sm:right-8 top-1/2 w-8 h-12 ${isHovering ? 'animate-racket-hit-right-fast' : 'animate-racket-hit-right'}`}
        style={{ transform: 'translateY(-50%) scaleX(-1)' }}
        viewBox="0 0 40 60" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2"
        strokeLinecap="round"
      >
        {/* Racket head */}
        <ellipse cx="20" cy="18" rx="14" ry="16" />
        {/* Strings */}
        <line x1="10" y1="12" x2="30" y2="12" strokeWidth="1" />
        <line x1="8" y1="18" x2="32" y2="18" strokeWidth="1" />
        <line x1="10" y1="24" x2="30" y2="24" strokeWidth="1" />
        <line x1="14" y1="4" x2="14" y2="30" strokeWidth="1" />
        <line x1="20" y1="2" x2="20" y2="32" strokeWidth="1" />
        <line x1="26" y1="4" x2="26" y2="30" strokeWidth="1" />
        {/* Handle */}
        <line x1="20" y1="34" x2="20" y2="55" strokeWidth="3" />
        <rect x="16" y="50" width="8" height="8" rx="1" fill="hsl(var(--primary) / 0.3)" />
      </svg>

      {/* Motion trail lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <path 
          d="M 60 24 Q 50% 8, calc(100% - 60px) 24" 
          fill="none" 
          stroke="hsl(var(--accent))" 
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="animate-trail-fade"
        />
      </svg>
    </div>
  );
}
