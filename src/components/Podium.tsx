import { Trophy, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PlayerRanking } from '@/types/ranking';

interface PodiumProps {
  rankings: PlayerRanking[];
}

export function Podium({ rankings }: PodiumProps) {
  const top3 = rankings.slice(0, 3);
  
  if (top3.length === 0) return null;

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = [
    top3[1], // Silver (left)
    top3[0], // Gold (center)
    top3[2], // Bronze (right)
  ].filter(Boolean);

  const getMedalStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-rank-gold/20',
          border: 'border-rank-gold',
          text: 'text-rank-gold',
          glow: 'shadow-[0_0_30px_hsl(var(--rank-gold)/0.5)]',
          height: 'h-32',
          label: 'CHAMPION',
        };
      case 2:
        return {
          bg: 'bg-rank-silver/20',
          border: 'border-rank-silver',
          text: 'text-rank-silver',
          glow: 'shadow-[0_0_20px_hsl(var(--rank-silver)/0.4)]',
          height: 'h-24',
          label: 'RUNNER-UP',
        };
      case 3:
        return {
          bg: 'bg-rank-bronze/20',
          border: 'border-rank-bronze',
          text: 'text-rank-bronze',
          glow: 'shadow-[0_0_20px_hsl(var(--rank-bronze)/0.4)]',
          height: 'h-20',
          label: 'THIRD',
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          text: 'text-muted-foreground',
          glow: '',
          height: 'h-16',
          label: '',
        };
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-rank-gold" />
        <h2 className="text-xl font-display tracking-wide text-glow">TOP CHAMPIONS</h2>
      </div>

      <div className="flex items-end justify-center gap-3 px-4">
        {podiumOrder.map((player) => {
          if (!player) return null;
          const style = getMedalStyle(player.rank);
          
          return (
            <div
              key={player.player_id}
              className={cn(
                'flex flex-col items-center animate-fade-in',
                player.rank === 1 ? 'order-2' : player.rank === 2 ? 'order-1' : 'order-3'
              )}
              style={{ animationDelay: `${(player.rank - 1) * 100}ms` }}
            >
              {/* Player Avatar */}
              <div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center border-3 font-display text-xl mb-2 transition-all hover:scale-110',
                  style.bg,
                  style.border,
                  style.text,
                  style.glow
                )}
              >
                {player.rank === 1 ? (
                  <Trophy className="w-7 h-7" />
                ) : (
                  <span>{getInitials(player.player_name)}</span>
                )}
              </div>

              {/* Player Name */}
              <p className={cn('font-medium text-sm text-center mb-1 truncate max-w-[100px]', style.text)}>
                {player.player_name}
              </p>

              {/* Points */}
              <p className="text-xs text-muted-foreground mb-2">
                {player.total_points} pts
              </p>

              {/* Podium Platform */}
              <div
                className={cn(
                  'w-24 rounded-t-lg flex flex-col items-center justify-start pt-2 border-t-2 border-x-2 transition-all',
                  style.height,
                  style.bg,
                  style.border,
                  style.glow
                )}
              >
                <Medal className={cn('w-6 h-6 mb-1', style.text)} />
                <span className={cn('font-display text-2xl', style.text)}>
                  {player.rank}
                </span>
                <span className={cn('text-[10px] tracking-wider opacity-70', style.text)}>
                  {style.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
