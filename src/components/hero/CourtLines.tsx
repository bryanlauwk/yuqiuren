export function CourtLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block"
      viewBox="0 0 1000 400"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="courtLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      
      {/* Outer court boundary - perspective lines */}
      <g stroke="url(#courtLineGradient)" strokeWidth="2" fill="none">
        {/* Left boundary */}
        <line x1="200" y1="400" x2="350" y2="200" />
        
        {/* Right boundary */}
        <line x1="800" y1="400" x2="650" y2="200" />
        
        {/* Back line (far) */}
        <line x1="350" y1="200" x2="650" y2="200" />
        
        {/* Front line (near) */}
        <line x1="200" y1="400" x2="800" y2="400" />
        
        {/* Center service line */}
        <line x1="500" y1="400" x2="500" y2="200" />
        
        {/* Short service line */}
        <line x1="280" y1="320" x2="720" y2="320" />
      </g>
      
      {/* Net silhouette */}
      <g opacity="0.06">
        {/* Net posts */}
        <rect x="160" y="290" width="8" height="110" fill="white" />
        <rect x="832" y="290" width="8" height="110" fill="white" />
        
        {/* Net top line */}
        <line x1="164" y1="295" x2="836" y2="295" stroke="white" strokeWidth="3" />
        
        {/* Net mesh (simplified) */}
        <line x1="164" y1="320" x2="836" y2="320" stroke="white" strokeWidth="1" />
        <line x1="164" y1="345" x2="836" y2="345" stroke="white" strokeWidth="1" />
        <line x1="164" y1="370" x2="836" y2="370" stroke="white" strokeWidth="1" />
        
        {/* Vertical net lines */}
        {[...Array(15)].map((_, i) => (
          <line
            key={i}
            x1={164 + i * 48}
            y1="295"
            x2={164 + i * 48}
            y2="400"
            stroke="white"
            strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  );
}
