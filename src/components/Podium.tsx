import { Trophy, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PlayerRanking } from '@/types/ranking';
import { useLanguage } from '@/contexts/LanguageContext';

interface PodiumProps {
  rankings: PlayerRanking[];
}

export function Podium({ rankings }: PodiumProps) {
  const { t } = useLanguage();
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
          bg: 'podium-gold',
          border: 'border-rank-gold',
          text: 'text-rank-gold',
          avatarBg: 'bg-rank-gold/20',
          height: 'h-28',
          label: t.podium.champion,
        };
      case 2:
        return {
          bg: 'podium-silver',
          border: 'border-rank-silver',
          text: 'text-rank-silver',
          avatarBg: 'bg-rank-silver/20',
          height: 'h-20',
          label: t.podium.runnerUp,
        };
      case 3:
        return {
          bg: 'podium-bronze',
          border: 'border-rank-bronze',
          text: 'text-rank-bronze',
          avatarBg: 'bg-rank-bronze/20',
          height: 'h-16',
          label: t.podium.third,
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          text: 'text-muted-foreground',
          avatarBg: 'bg-muted',
          height: 'h-14',
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
        <h2 className="text-lg font-display tracking-wide text-foreground">{t.podium.topPlayers}</h2>
      </div>

      <div className="flex items-end justify-center gap-4 px-4">
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
                  'w-16 h-16 rounded-full flex items-center justify-center border-2 font-display text-lg mb-2 overflow-hidden',
                  style.avatarBg,
                  style.border,
                  style.text
                )}
              >
                {player.avatar_url ? (
                  <img
                    src={player.avatar_url}
                    alt={player.player_name}
                    className="w-full h-full object-cover"
                  />
                ) : player.rank === 1 ? (
                  <Trophy className="w-6 h-6" />
                ) : (
                  <span>{getInitials(player.player_name)}</span>
                )}
              </div>

              {/* Player Name */}
              <p className={cn('font-semibold text-sm text-center mb-0.5 truncate max-w-[100px] text-foreground')}>
                {player.player_name}
              </p>

              {/* Points */}
              <p className="text-xs text-muted-foreground mb-2">
                {player.total_points} {t.podium.pts}
              </p>

              {/* Podium Platform */}
              <div
                className={cn(
                  'w-24 rounded-t-lg flex flex-col items-center justify-start pt-3 border-t-2 border-x transition-all',
                  style.height,
                  style.bg,
                  style.border
                )}
              >
                <Medal className={cn('w-5 h-5 mb-1', style.text)} />
                <span className={cn('font-display text-2xl', style.text)}>
                  {player.rank}
                </span>
                <span className={cn('text-[9px] tracking-wider opacity-80', style.text)}>
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
