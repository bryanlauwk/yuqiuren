/**
 * Street-art style graffiti accents for the hero.
 * Drippy spray paint, layered tags with offset shadows, stencil marks,
 * throw-up lettering. Decorative SVGs using semantic tokens.
 */
export function GraffitiAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Top-left: Throw-up "GO" bubble tag with offset shadow + drips */}
      <svg
        className="absolute top-4 left-2 sm:top-8 sm:left-8 -rotate-[8deg]"
        width="160"
        height="120"
        viewBox="0 0 160 120"
        fill="none"
      >
        {/* Drop shadow layer (offset) */}
        <path
          d="M18 38 Q 14 14, 42 12 Q 70 8, 92 14 Q 130 14, 138 40 Q 144 66, 116 74 Q 84 84, 56 78 Q 22 76, 18 50 Z"
          fill="hsl(var(--foreground))"
          transform="translate(6 6)"
        />
        {/* Main bubble fill */}
        <path
          d="M18 38 Q 14 14, 42 12 Q 70 8, 92 14 Q 130 14, 138 40 Q 144 66, 116 74 Q 84 84, 56 78 Q 22 76, 18 50 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
        />
        {/* Highlight glint */}
        <path
          d="M30 24 Q 40 18, 56 22"
          stroke="hsl(var(--background))"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        {/* Drips */}
        <path
          d="M48 76 Q 47 92, 50 102 Q 52 110, 49 116"
          stroke="hsl(var(--accent))"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="49" cy="116" r="4" fill="hsl(var(--accent))" />
        <path
          d="M104 80 Q 103 92, 106 100"
          stroke="hsl(var(--accent))"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="106" cy="102" r="3.5" fill="hsl(var(--accent))" />
        {/* Letters */}
        <text
          x="78"
          y="58"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontWeight="900"
          fontSize="42"
          fontStyle="italic"
          fill="hsl(var(--foreground))"
        >
          GO
        </text>
      </svg>

      {/* Spray-paint splat top center area */}
      <svg
        className="absolute top-[14%] left-[40%] opacity-90"
        width="90"
        height="90"
        viewBox="0 0 90 90"
        fill="hsl(var(--accent))"
      >
        <circle cx="45" cy="45" r="14" />
        <circle cx="22" cy="32" r="3" />
        <circle cx="68" cy="28" r="2.5" />
        <circle cx="74" cy="58" r="4" />
        <circle cx="18" cy="60" r="2" />
        <circle cx="58" cy="74" r="3" />
        <circle cx="36" cy="78" r="2" />
        <circle cx="80" cy="42" r="1.5" />
        <circle cx="10" cy="46" r="1.5" />
        <circle cx="46" cy="14" r="2" />
      </svg>

      {/* Stencil star with hard edge */}
      <svg
        className="absolute top-20 right-[10%] sm:top-24 md:right-[44%] rotate-[18deg]"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
      >
        <path
          d="M28 4 L33 22 L52 22 L37 32 L43 50 L28 38 L13 50 L19 32 L4 22 L23 22 Z"
          fill="hsl(var(--foreground))"
        />
        <path
          d="M28 4 L33 22 L52 22 L37 32 L43 50 L28 38 L13 50 L19 32 L4 22 L23 22 Z"
          fill="hsl(var(--accent))"
          transform="translate(-3 -3)"
          opacity="0.85"
        />
      </svg>

      {/* Drippy underline near subtitle */}
      <svg
        className="absolute hidden sm:block bottom-[40%] left-[5%]"
        width="220"
        height="40"
        viewBox="0 0 220 40"
        fill="none"
      >
        <path
          d="M4 12 Q 50 4, 110 14 T 216 12"
          stroke="hsl(var(--accent))"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Drips */}
        <path d="M40 14 L 41 30" stroke="hsl(var(--accent))" strokeWidth="4" strokeLinecap="round" />
        <circle cx="41" cy="32" r="3" fill="hsl(var(--accent))" />
        <path d="M120 16 L 122 36" stroke="hsl(var(--accent))" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="122" cy="38" r="2.5" fill="hsl(var(--accent))" />
        <path d="M180 12 L 181 26" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
        <circle cx="181" cy="27" r="2" fill="hsl(var(--accent))" />
      </svg>

      {/* Hand-drawn arrow pointing to phone (marker style, double stroke) */}
      <svg
        className="absolute hidden md:block top-[48%] right-[36%]"
        width="160"
        height="120"
        viewBox="0 0 160 120"
        fill="none"
      >
        {/* Shadow stroke */}
        <path
          d="M8 92 Q 36 18, 132 28"
          stroke="hsl(var(--accent))"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          transform="translate(3 3)"
          opacity="0.9"
        />
        {/* Main stroke */}
        <path
          d="M8 92 Q 36 18, 132 28"
          stroke="hsl(var(--foreground))"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrowhead */}
        <path
          d="M132 28 L 114 18 M132 28 L 122 46"
          stroke="hsl(var(--foreground))"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Stencil "SMASH" tag bottom-right with offset shadow */}
      <svg
        className="absolute bottom-4 right-2 sm:bottom-8 sm:right-8 -rotate-[6deg]"
        width="220"
        height="90"
        viewBox="0 0 220 90"
        fill="none"
      >
        {/* Shadow text */}
        <text
          x="14"
          y="58"
          fontFamily="Archivo, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="56"
          fill="hsl(var(--accent))"
          letterSpacing="-2"
        >
          SMASH
        </text>
        {/* Main text */}
        <text
          x="10"
          y="54"
          fontFamily="Archivo, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="56"
          fill="hsl(var(--foreground))"
          letterSpacing="-2"
        >
          SMASH
        </text>
        {/* Underscore swoosh */}
        <path
          d="M14 70 Q 100 64, 200 72"
          stroke="hsl(var(--foreground))"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Drips off the S */}
        <path d="M22 60 L 24 78" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="80" r="2.5" fill="hsl(var(--foreground))" />
        <path d="M168 60 L 170 82" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round" />
        <circle cx="170" cy="84" r="2.5" fill="hsl(var(--foreground))" />
      </svg>

      {/* Bottom-left: stencil crown */}
      <svg
        className="absolute bottom-12 left-[6%] -rotate-[10deg] hidden sm:block"
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
      >
        <path
          d="M6 44 L 10 14 L 26 32 L 40 8 L 54 32 L 70 14 L 74 44 Z"
          fill="hsl(var(--foreground))"
          transform="translate(3 3)"
          opacity="0.6"
        />
        <path
          d="M6 44 L 10 14 L 26 32 L 40 8 L 54 32 L 70 14 L 74 44 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
        />
        <rect x="6" y="44" width="68" height="6" fill="hsl(var(--foreground))" />
      </svg>

      {/* Scattered spray flecks */}
      <svg
        className="absolute top-[60%] left-[28%] opacity-70"
        width="100"
        height="80"
        viewBox="0 0 100 80"
        fill="hsl(var(--foreground))"
      >
        <circle cx="10" cy="20" r="1.5" />
        <circle cx="34" cy="8" r="1" />
        <circle cx="50" cy="30" r="2" />
        <circle cx="68" cy="14" r="1.5" />
        <circle cx="82" cy="40" r="1" />
        <circle cx="20" cy="50" r="1.5" />
        <circle cx="56" cy="62" r="1" />
        <circle cx="78" cy="70" r="1.5" />
        <circle cx="92" cy="56" r="1" />
      </svg>
    </div>
  );
}
