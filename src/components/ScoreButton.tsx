import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

interface ScoreButtonProps {
  type: 'increment' | 'decrement';
  onClick: () => void;
  disabled?: boolean;
}

export function ScoreButton({ type, onClick, disabled }: ScoreButtonProps) {
  const Icon = type === 'increment' ? Plus : Minus;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center',
        'score-transition touch-manipulation select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        type === 'increment' 
          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      )}
    >
      <Icon className="w-6 h-6" strokeWidth={3} />
    </button>
  );
}
