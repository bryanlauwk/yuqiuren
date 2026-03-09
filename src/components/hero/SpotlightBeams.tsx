export function SpotlightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left spotlight beam */}
      <div 
        className="spotlight-beam absolute -top-20 left-[10%] w-[300px] h-[600px] opacity-[0.04]"
        style={{ 
          background: 'linear-gradient(180deg, hsl(195 90% 65%) 0%, transparent 100%)',
          transform: 'rotate(25deg)',
          transformOrigin: 'top center',
        }}
      />
      
      {/* Center spotlight beam */}
      <div 
        className="spotlight-beam absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[700px] opacity-[0.05]"
        style={{ 
          background: 'linear-gradient(180deg, hsl(0 0% 100%) 0%, transparent 100%)',
        }}
      />
      
      {/* Right spotlight beam */}
      <div 
        className="spotlight-beam absolute -top-20 right-[10%] w-[300px] h-[600px] opacity-[0.04]"
        style={{ 
          background: 'linear-gradient(180deg, hsl(195 90% 65%) 0%, transparent 100%)',
          transform: 'rotate(-25deg)',
          transformOrigin: 'top center',
        }}
      />
      
      {/* Lens flare accents */}
      <div 
        className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, hsl(210 100% 65%) 0%, transparent 70%)',
          animation: 'spotlight-pulse 6s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute top-[10%] right-[25%] w-12 h-12 rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, hsl(195 90% 55%) 0%, transparent 70%)',
          animation: 'spotlight-pulse 8s ease-in-out infinite 2s',
        }}
      />
    </div>
  );
}
