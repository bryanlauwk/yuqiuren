interface ShuttlecockProps {
  className?: string;
  delay?: number;
  size?: number;
}

function Shuttlecock({ className = '', delay = 0, size = 24 }: ShuttlecockProps) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      style={{ 
        animation: `shuttlecock-float ${4 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
      width={size}
      height={size * 1.5}
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cork base */}
      <ellipse cx="12" cy="30" rx="6" ry="5" fill="hsl(45 60% 65%)" fillOpacity="0.3" />
      <ellipse cx="12" cy="29" rx="5" ry="4" fill="hsl(45 80% 75%)" fillOpacity="0.25" />
      
      {/* Feathers */}
      <g fill="white" fillOpacity="0.15">
        <path d="M12 26 L8 4 L10 4 L12 22 Z" />
        <path d="M12 26 L16 4 L14 4 L12 22 Z" />
        <path d="M12 26 L4 8 L6 6 L11 22 Z" />
        <path d="M12 26 L20 8 L18 6 L13 22 Z" />
        <path d="M12 26 L2 14 L4 12 L10 23 Z" />
        <path d="M12 26 L22 14 L20 12 L14 23 Z" />
      </g>
      
      {/* Feather tips */}
      <g stroke="white" strokeOpacity="0.1" strokeWidth="0.5">
        <circle cx="8" cy="3" r="2" />
        <circle cx="16" cy="3" r="2" />
        <circle cx="4" cy="7" r="2" />
        <circle cx="20" cy="7" r="2" />
        <circle cx="2" cy="13" r="2" />
        <circle cx="22" cy="13" r="2" />
      </g>
    </svg>
  );
}

export function FloatingShuttlecocks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary shuttlecocks - always visible */}
      <Shuttlecock 
        className="top-[20%] left-[15%] opacity-40"
        delay={0}
        size={28}
      />
      <Shuttlecock 
        className="top-[35%] right-[20%] opacity-30 rotate-12"
        delay={1.5}
        size={22}
      />
      
      {/* Secondary shuttlecocks - hidden on mobile */}
      <Shuttlecock 
        className="top-[50%] left-[30%] opacity-25 -rotate-6 hidden sm:block"
        delay={2.5}
        size={18}
      />
      <Shuttlecock 
        className="top-[15%] right-[35%] opacity-35 rotate-3 hidden sm:block"
        delay={0.8}
        size={24}
      />
      
      {/* Extra shuttlecocks for larger screens */}
      <Shuttlecock 
        className="top-[60%] right-[40%] opacity-20 -rotate-12 hidden lg:block"
        delay={3.2}
        size={16}
      />
      
      {/* Shuttlecock trail (flight path suggestion) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08] hidden sm:block"
        viewBox="0 0 1000 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(45 100% 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(45 100% 50%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(45 100% 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M150 300 Q 350 100, 500 180 T 850 120"
          stroke="url(#trailGradient)"
          strokeWidth="2"
          strokeDasharray="8 12"
          fill="none"
        />
      </svg>
    </div>
  );
}
