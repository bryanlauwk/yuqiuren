/**
 * Hand-drawn graffiti accents for the hero section.
 * Decorative SVGs using semantic tokens (currentColor + accent).
 * Non-interactive, marker-style scribbles.
 */
export function GraffitiAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Top-left: circled "GO!" scribble */}
      <svg
        className="absolute top-6 left-4 sm:top-10 sm:left-10 text-accent opacity-90 -rotate-12"
        width="110"
        height="80"
        viewBox="0 0 110 80"
        fill="none"
      >
        <ellipse
          cx="55"
          cy="40"
          rx="48"
          ry="30"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="0 0"
          transform="rotate(-4 55 40)"
        />
        <ellipse
          cx="55"
          cy="40"
          rx="44"
          ry="27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
          transform="rotate(3 55 40)"
        />
        <text
          x="55"
          y="50"
          textAnchor="middle"
          fontFamily="Archivo, sans-serif"
          fontWeight="900"
          fontSize="28"
          fill="currentColor"
          transform="rotate(-3 55 40)"
        >
          GO!
        </text>
      </svg>

      {/* Star burst near headline */}
      <svg
        className="absolute top-24 right-[8%] sm:top-32 md:right-[44%] text-accent opacity-95 rotate-12"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <path
          d="M30 4 L34 24 L54 28 L36 34 L42 54 L30 40 L18 54 L24 34 L6 28 L26 24 Z"
          fill="currentColor"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* Squiggle underline near subtitle */}
      <svg
        className="absolute hidden sm:block bottom-[38%] left-[6%] text-foreground opacity-70"
        width="180"
        height="20"
        viewBox="0 0 180 20"
        fill="none"
      >
        <path
          d="M2 10 Q 15 2, 28 10 T 54 10 T 80 10 T 106 10 T 132 10 T 158 10 T 178 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Curved arrow pointing to phone mockup */}
      <svg
        className="absolute hidden md:block top-[52%] right-[38%] text-foreground opacity-85"
        width="130"
        height="100"
        viewBox="0 0 130 100"
        fill="none"
      >
        <path
          d="M5 80 Q 30 20, 110 30"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M110 30 L 96 22 M110 30 L 102 44"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Three exclamation tally marks bottom-left */}
      <svg
        className="absolute bottom-8 left-[4%] sm:bottom-12 sm:left-[8%] text-accent opacity-90 -rotate-6"
        width="70"
        height="50"
        viewBox="0 0 70 50"
        fill="none"
      >
        <line x1="10" y1="6" x2="6" y2="36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="5" cy="44" r="3" fill="currentColor" />
        <line x1="32" y1="4" x2="30" y2="36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="29" cy="44" r="3" fill="currentColor" />
        <line x1="56" y1="6" x2="58" y2="36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="59" cy="44" r="3" fill="currentColor" />
      </svg>

      {/* Spray-paint dots scattered */}
      <svg
        className="absolute top-[18%] left-[42%] text-accent opacity-60"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="currentColor"
      >
        <circle cx="10" cy="20" r="2" />
        <circle cx="24" cy="8" r="1.5" />
        <circle cx="40" cy="30" r="3" />
        <circle cx="58" cy="14" r="2" />
        <circle cx="72" cy="40" r="1.5" />
        <circle cx="20" cy="50" r="2.5" />
        <circle cx="50" cy="62" r="1.5" />
        <circle cx="68" cy="70" r="2" />
      </svg>

      {/* Bold "ACE" tag bottom-right */}
      <svg
        className="absolute bottom-6 right-4 sm:bottom-10 sm:right-12 text-foreground opacity-80 -rotate-6"
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
      >
        <text
          x="10"
          y="44"
          fontFamily="Archivo, sans-serif"
          fontWeight="900"
          fontSize="40"
          fill="currentColor"
          fontStyle="italic"
        >
          ACE
        </text>
        <line
          x1="8"
          y1="50"
          x2="100"
          y2="54"
          stroke="hsl(var(--accent))"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="56"
          x2="80"
          y2="58"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
