/**
 * Wildstyle graffiti accents for the hero.
 * Angular interlocking letterforms, sharp arrow extensions,
 * layered fill/outline/shadow construction. Decorative SVGs.
 */
export function GraffitiAccents() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* TOP-LEFT: Wildstyle "ACE" piece — interlocking angular letters with arrows */}
      <svg
        className="absolute top-2 left-1 sm:top-6 sm:left-6 -rotate-[6deg]"
        width="280"
        height="140"
        viewBox="0 0 280 140"
        fill="none"
      >
        {/* Far shadow */}
        <g transform="translate(8 8)" opacity="0.9">
          <path
            d="M10 90 L 32 30 L 60 30 L 70 50 L 50 50 L 46 60 L 64 60 L 60 72 L 42 72 L 36 90 Z
               M 70 90 L 96 30 L 132 30 L 142 56 L 122 56 L 130 72 L 110 72 L 100 90 Z
               M 144 90 L 168 30 L 218 30 L 226 50 L 192 50 L 188 56 L 218 56 L 222 70 L 184 70 L 180 78 L 222 78 L 224 90 Z"
            fill="hsl(var(--foreground))"
          />
        </g>
        {/* Mid lime layer */}
        <g transform="translate(4 4)">
          <path
            d="M10 90 L 32 30 L 60 30 L 70 50 L 50 50 L 46 60 L 64 60 L 60 72 L 42 72 L 36 90 Z
               M 70 90 L 96 30 L 132 30 L 142 56 L 122 56 L 130 72 L 110 72 L 100 90 Z
               M 144 90 L 168 30 L 218 30 L 226 50 L 192 50 L 188 56 L 218 56 L 222 70 L 184 70 L 180 78 L 222 78 L 224 90 Z"
            fill="hsl(var(--accent))"
          />
        </g>
        {/* Top fill (background) with hard outline */}
        <g>
          <path
            d="M10 90 L 32 30 L 60 30 L 70 50 L 50 50 L 46 60 L 64 60 L 60 72 L 42 72 L 36 90 Z
               M 70 90 L 96 30 L 132 30 L 142 56 L 122 56 L 130 72 L 110 72 L 100 90 Z
               M 144 90 L 168 30 L 218 30 L 226 50 L 192 50 L 188 56 L 218 56 L 222 70 L 184 70 L 180 78 L 222 78 L 224 90 Z"
            fill="hsl(var(--background))"
            stroke="hsl(var(--foreground))"
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
        </g>
        {/* Sharp arrow extensions shooting off the piece */}
        <path
          d="M 224 60 L 264 44 L 256 56 L 274 60 L 256 64 L 264 76 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />
        <path
          d="M 32 30 L 18 14 L 28 22 L 36 12 L 38 26 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
        {/* Inner highlight slashes */}
        <path d="M40 42 L 46 36" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <path d="M104 42 L 110 36" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <path d="M178 42 L 184 36" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      </svg>

      {/* Wildstyle 3D arrow shard top-mid */}
      <svg
        className="absolute top-[12%] left-[44%] rotate-[14deg] hidden sm:block"
        width="120"
        height="60"
        viewBox="0 0 120 60"
        fill="none"
      >
        <path
          d="M2 32 L 60 8 L 56 22 L 110 18 L 116 30 L 60 36 L 64 50 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />
        <path
          d="M2 32 L 60 8 L 56 22"
          fill="none"
          stroke="hsl(var(--background))"
          strokeWidth="1.5"
          strokeLinejoin="miter"
          opacity="0.6"
        />
      </svg>

      {/* Spiked star / burst — angular wildstyle decoration */}
      <svg
        className="absolute top-16 right-[8%] sm:top-20 md:right-[42%] rotate-[24deg]"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M32 2 L 38 22 L 60 16 L 44 32 L 62 40 L 40 42 L 46 62 L 32 46 L 18 62 L 24 42 L 2 40 L 20 32 L 4 16 L 26 22 Z"
          fill="hsl(var(--foreground))"
          transform="translate(3 3)"
          opacity="0.85"
        />
        <path
          d="M32 2 L 38 22 L 60 16 L 44 32 L 62 40 L 40 42 L 46 62 L 32 46 L 18 62 L 24 42 L 2 40 L 20 32 L 4 16 L 26 22 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
      </svg>

      {/* Lightning bolt — wildstyle filler */}
      <svg
        className="absolute hidden md:block top-[44%] left-[2%] -rotate-[12deg]"
        width="60"
        height="100"
        viewBox="0 0 60 100"
        fill="none"
      >
        <path
          d="M30 4 L 6 54 L 24 54 L 14 96 L 54 38 L 32 38 L 44 4 Z"
          fill="hsl(var(--foreground))"
          transform="translate(4 4)"
          opacity="0.7"
        />
        <path
          d="M30 4 L 6 54 L 24 54 L 14 96 L 54 38 L 32 38 L 44 4 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />
      </svg>

      {/* Aggressive marker arrow toward phone */}
      <svg
        className="absolute hidden md:block top-[46%] right-[36%]"
        width="180"
        height="120"
        viewBox="0 0 180 120"
        fill="none"
      >
        {/* Shadow */}
        <path
          d="M6 96 Q 30 16, 144 24 L 130 8 L 168 26 L 138 50 L 144 30"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinejoin="miter"
          transform="translate(4 4)"
          opacity="0.9"
        />
        {/* Main */}
        <path
          d="M6 96 Q 30 16, 144 24 L 130 8 L 168 26 L 138 50 L 144 30"
          fill="hsl(var(--background))"
          stroke="hsl(var(--foreground))"
          strokeWidth="3"
          strokeLinejoin="miter"
        />
      </svg>

      {/* BOTTOM-RIGHT: Wildstyle "SMASH" piece — angular interlock with shadow stack */}
      <svg
        className="absolute bottom-2 right-1 sm:bottom-6 sm:right-4 -rotate-[5deg]"
        width="340"
        height="120"
        viewBox="0 0 340 120"
        fill="none"
      >
        {/* Far shadow */}
        <g transform="translate(8 8)" opacity="0.9">
          <path
            d="M4 88 L 28 22 L 70 22 L 78 40 L 50 40 L 46 50 L 76 50 L 70 70 L 38 70 L 34 88 Z
               M 80 88 L 102 22 L 132 22 L 142 88 L 124 88 L 120 72 L 110 72 L 106 88 Z
               M 150 88 L 168 22 L 218 22 L 226 38 L 196 38 L 200 50 L 220 50 L 224 64 L 188 64 L 184 88 Z
               M 232 88 L 252 22 L 282 22 L 292 88 L 274 88 L 270 72 L 260 72 L 256 88 Z
               M 296 88 L 314 22 L 336 22 L 322 88 Z"
            fill="hsl(var(--foreground))"
          />
        </g>
        {/* Lime mid */}
        <g transform="translate(4 4)">
          <path
            d="M4 88 L 28 22 L 70 22 L 78 40 L 50 40 L 46 50 L 76 50 L 70 70 L 38 70 L 34 88 Z
               M 80 88 L 102 22 L 132 22 L 142 88 L 124 88 L 120 72 L 110 72 L 106 88 Z
               M 150 88 L 168 22 L 218 22 L 226 38 L 196 38 L 200 50 L 220 50 L 224 64 L 188 64 L 184 88 Z
               M 232 88 L 252 22 L 282 22 L 292 88 L 274 88 L 270 72 L 260 72 L 256 88 Z
               M 296 88 L 314 22 L 336 22 L 322 88 Z"
            fill="hsl(var(--accent))"
          />
        </g>
        {/* Top fill */}
        <g>
          <path
            d="M4 88 L 28 22 L 70 22 L 78 40 L 50 40 L 46 50 L 76 50 L 70 70 L 38 70 L 34 88 Z
               M 80 88 L 102 22 L 132 22 L 142 88 L 124 88 L 120 72 L 110 72 L 106 88 Z
               M 150 88 L 168 22 L 218 22 L 226 38 L 196 38 L 200 50 L 220 50 L 224 64 L 188 64 L 184 88 Z
               M 232 88 L 252 22 L 282 22 L 292 88 L 274 88 L 270 72 L 260 72 L 256 88 Z
               M 296 88 L 314 22 L 336 22 L 322 88 Z"
            fill="hsl(var(--background))"
            stroke="hsl(var(--foreground))"
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
        </g>
        {/* Sharp arrow shooting from end */}
        <path
          d="M 322 36 L 360 22 L 350 36 L 364 44 L 348 50 L 354 64 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--foreground))"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />
        {/* Inner shading bars */}
        <path d="M40 36 L 50 26" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <path d="M114 36 L 122 26" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <path d="M180 36 L 190 26" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <path d="M260 36 L 270 26" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      </svg>

      {/* Scattered angular ticks — wildstyle filler dots */}
      <svg
        className="absolute top-[58%] left-[26%] opacity-80 hidden sm:block"
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
      >
        <path d="M4 20 L 14 14 L 12 24 Z" fill="hsl(var(--foreground))" />
        <path d="M40 8 L 50 12 L 44 20 Z" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <path d="M70 30 L 80 26 L 78 38 Z" fill="hsl(var(--foreground))" />
        <path d="M100 14 L 110 20 L 102 26 Z" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <path d="M20 56 L 30 50 L 28 62 Z" fill="hsl(var(--foreground))" />
        <path d="M88 60 L 98 56 L 96 68 Z" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
