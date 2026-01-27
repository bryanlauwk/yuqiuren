export function PlayerSilhouetteRight() {
  return (
    <svg
      className="absolute right-0 bottom-0 w-[45%] sm:w-[40%] h-full pointer-events-none"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMaxYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="playerRightGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(150 60% 25%)" stopOpacity="0.4" />
          <stop offset="50%" stopColor="hsl(150 60% 18%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(150 60% 10%)" stopOpacity="0.1" />
        </linearGradient>
        <filter id="playerRightGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Player in jumping smash pose */}
      <g filter="url(#playerRightGlow)" transform="translate(20, 20)">
        {/* Head */}
        <ellipse cx="220" cy="80" rx="26" ry="30" fill="url(#playerRightGradient)" />
        
        {/* Neck */}
        <rect x="210" y="106" width="20" height="18" fill="url(#playerRightGradient)" />
        
        {/* Torso (twisted for smash) */}
        <path
          d="M180 124 L260 120 L275 230 L165 240 Z"
          fill="url(#playerRightGradient)"
        />
        
        {/* Right arm (raised for smash with racket) */}
        <path
          d="M260 130 L300 90 L330 40 L345 50 L315 100 L275 145"
          fill="url(#playerRightGradient)"
        />
        
        {/* Left arm (balance/follow through) */}
        <path
          d="M180 135 L140 160 L110 200 L120 210 L150 175 L185 150"
          fill="url(#playerRightGradient)"
        />
        
        {/* Racket (raised position) */}
        <g transform="translate(335, 25) rotate(45)">
          {/* Handle */}
          <rect x="0" y="0" width="7" height="45" fill="url(#playerRightGradient)" />
          {/* Head frame */}
          <ellipse cx="3" cy="-22" rx="28" ry="38" fill="none" stroke="hsl(150 60% 25%)" strokeWidth="3" strokeOpacity="0.35" />
          {/* Strings */}
          <line x1="-18" y1="-22" x2="24" y2="-22" stroke="hsl(150 60% 25%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="-18" y1="-32" x2="24" y2="-32" stroke="hsl(150 60% 25%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="-18" y1="-12" x2="24" y2="-12" stroke="hsl(150 60% 25%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="3" y1="-55" x2="3" y2="8" stroke="hsl(150 60% 25%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="-9" y1="-55" x2="-9" y2="8" stroke="hsl(150 60% 25%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="15" y1="-55" x2="15" y2="8" stroke="hsl(150 60% 25%)" strokeWidth="1" strokeOpacity="0.2" />
        </g>
        
        {/* Left leg (extended jump) */}
        <path
          d="M175 240 L140 320 L130 400 L150 405 L165 330 L185 250"
          fill="url(#playerRightGradient)"
        />
        
        {/* Right leg (tucked for jump) */}
        <path
          d="M230 235 L270 280 L290 340 L275 355 L250 300 L220 250"
          fill="url(#playerRightGradient)"
        />
        
        {/* Shoes */}
        <ellipse cx="140" cy="410" rx="24" ry="11" fill="url(#playerRightGradient)" />
        <ellipse cx="282" cy="350" rx="22" ry="10" fill="url(#playerRightGradient)" />
      </g>
    </svg>
  );
}
