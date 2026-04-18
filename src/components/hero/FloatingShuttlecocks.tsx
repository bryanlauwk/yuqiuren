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
      {/* Cork base — lime fill, black stroke */}
      <ellipse
        cx="12"
        cy="30"
        rx="6"
        ry="5"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
      />

      {/* Feathers — white fill, black stroke */}
      <g
        fill="hsl(var(--background))"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        <path d="M12 26 L8 4 L10 4 L12 22 Z" />
        <path d="M12 26 L16 4 L14 4 L12 22 Z" />
        <path d="M12 26 L4 8 L6 6 L11 22 Z" />
        <path d="M12 26 L20 8 L18 6 L13 22 Z" />
      </g>
    </svg>
  );
}

export function FloatingShuttlecocks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Shuttlecock className="top-[20%] left-[15%] opacity-70" delay={0} size={28} />
      <Shuttlecock className="top-[35%] right-[20%] opacity-60 rotate-12" delay={1.5} size={22} />
      <Shuttlecock className="top-[50%] left-[30%] opacity-50 -rotate-6 hidden sm:block" delay={2.5} size={18} />
      <Shuttlecock className="top-[15%] right-[35%] opacity-65 rotate-3 hidden sm:block" delay={0.8} size={24} />
      <Shuttlecock className="top-[60%] right-[40%] opacity-45 -rotate-12 hidden lg:block" delay={3.2} size={16} />

      {/* Trail — chunky black with lime mid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 hidden sm:block"
        viewBox="0 0 1000 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M150 300 Q 350 100, 500 180 T 850 120"
          stroke="url(#trailGradient)"
          strokeWidth="4"
          strokeDasharray="10 8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
