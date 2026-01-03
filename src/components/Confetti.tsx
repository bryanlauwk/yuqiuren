import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
  shape: 'square' | 'circle' | 'triangle';
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--rank-gold))',
  'hsl(var(--rank-silver))',
  'hsl(var(--rank-bronze))',
];

const SHAPES = ['square', 'circle', 'triangle'] as const;

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const confettiPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }));
    setPieces(confettiPieces);

    // Hide confetti after animation completes
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          {piece.shape === 'square' && (
            <div
              className="animate-confetti-spin"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
                borderRadius: '2px',
              }}
            />
          )}
          {piece.shape === 'circle' && (
            <div
              className="rounded-full animate-confetti-spin"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === 'triangle' && (
            <div
              className="animate-confetti-spin"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${piece.size / 2}px solid transparent`,
                borderRight: `${piece.size / 2}px solid transparent`,
                borderBottom: `${piece.size}px solid ${piece.color}`,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
