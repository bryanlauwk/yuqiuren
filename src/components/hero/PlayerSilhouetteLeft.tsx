export function PlayerSilhouetteLeft() {
  return (
    <svg
      className="absolute left-0 bottom-0 w-[45%] sm:w-[40%] h-full pointer-events-none"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMinYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="playerLeftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(0 70% 35%)" stopOpacity="0.4" />
          <stop offset="50%" stopColor="hsl(0 70% 25%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(0 70% 15%)" stopOpacity="0.1" />
        </linearGradient>
        <filter id="playerLeftGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Player in ready/defensive stance */}
      <g filter="url(#playerLeftGlow)" transform="translate(-20, 50)">
        {/* Head */}
        <ellipse cx="180" cy="120" rx="28" ry="32" fill="url(#playerLeftGradient)" />
        
        {/* Neck */}
        <rect x="170" y="148" width="20" height="20" fill="url(#playerLeftGradient)" />
        
        {/* Torso */}
        <path
          d="M140 168 L220 168 L230 280 L130 280 Z"
          fill="url(#playerLeftGradient)"
        />
        
        {/* Left arm (holding racket) */}
        <path
          d="M140 175 L95 220 L80 260 L70 250 L90 205 L130 165"
          fill="url(#playerLeftGradient)"
          strokeWidth="2"
        />
        
        {/* Right arm (balance) */}
        <path
          d="M220 175 L260 200 L280 220 L275 235 L250 210 L215 185"
          fill="url(#playerLeftGradient)"
        />
        
        {/* Racket */}
        <g transform="translate(45, 245) rotate(-30)">
          {/* Handle */}
          <rect x="0" y="0" width="8" height="50" fill="url(#playerLeftGradient)" />
          {/* Head frame */}
          <ellipse cx="4" cy="-25" rx="30" ry="40" fill="none" stroke="hsl(0 70% 35%)" strokeWidth="3" strokeOpacity="0.35" />
          {/* Strings */}
          <line x1="-20" y1="-25" x2="28" y2="-25" stroke="hsl(0 70% 35%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="-20" y1="-35" x2="28" y2="-35" stroke="hsl(0 70% 35%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="-20" y1="-15" x2="28" y2="-15" stroke="hsl(0 70% 35%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="4" y1="-60" x2="4" y2="5" stroke="hsl(0 70% 35%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="-10" y1="-60" x2="-10" y2="5" stroke="hsl(0 70% 35%)" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="18" y1="-60" x2="18" y2="5" stroke="hsl(0 70% 35%)" strokeWidth="1" strokeOpacity="0.2" />
        </g>
        
        {/* Left leg (bent) */}
        <path
          d="M150 280 L130 350 L120 420 L140 425 L155 355 L165 285"
          fill="url(#playerLeftGradient)"
        />
        
        {/* Right leg (wider stance) */}
        <path
          d="M195 280 L230 350 L250 420 L230 430 L210 360 L190 290"
          fill="url(#playerLeftGradient)"
        />
        
        {/* Shoes */}
        <ellipse cx="130" cy="430" rx="25" ry="12" fill="url(#playerLeftGradient)" />
        <ellipse cx="240" cy="435" rx="25" ry="12" fill="url(#playerLeftGradient)" />
      </g>
    </svg>
  );
}
