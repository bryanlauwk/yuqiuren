import { Trophy, Medal, Star, Sparkles } from 'lucide-react';
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
          height: 'h-32',
          label: t.podium.champion,
          rotation: 'rotate-0',
        };
      case 2:
        return {
          bg: 'podium-silver',
          border: 'border-rank-silver',
          text: 'text-rank-silver',
          avatarBg: 'bg-rank-silver/20',
          height: 'h-24',
          label: t.podium.runnerUp,
          rotation: 'rotate-slight-left',
        };
      case 3:
        return {
          bg: 'podium-bronze',
          border: 'border-rank-bronze',
          text: 'text-rank-bronze',
          avatarBg: 'bg-rank-bronze/20',
          height: 'h-20',
          label: t.podium.third,
          rotation: 'rotate-slight-right',
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          text: 'text-muted-foreground',
          avatarBg: 'bg-muted',
          height: 'h-16',
          label: '',
          rotation: 'rotate-0',
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
    <div className="mb-10 doodle-card bg-card p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-3 right-3">
        <Sparkles className="w-5 h-5 text-accent/40" />
      </div>
      <div className="absolute bottom-3 left-3">
        <Star className="w-4 h-4 text-primary/30" />
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-rank-gold/15">
          <Trophy className="w-5 h-5 text-rank-gold" />
        </div>
        <h2 className="text-lg font-display tracking-wide text-foreground">{t.podium.topPlayers}</h2>
        {/* Squiggly decoration */}
        <svg className="w-12 h-3 ml-2 text-primary/30" viewBox="0 0 50 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0 6 Q12.5 2, 25 6 T50 6" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="flex items-end justify-center gap-6 px-4">
        {podiumOrder.map((player) => {
          if (!player) return null;
          const style = getMedalStyle(player.rank);
          
          return (
            <div
              key={player.player_id}
              className={cn(
                'flex flex-col items-center animate-fade-in transition-transform hover:scale-105',
                player.rank === 1 ? 'order-2' : player.rank === 2 ? 'order-1' : 'order-3'
              )}
              style={{ animationDelay: `${(player.rank - 1) * 100}ms` }}
            >
              {/* Crown for 1st place */}
              {player.rank === 1 && (
                <div className="mb-1 animate-bounce">
                  <svg className="w-8 h-6 text-rank-gold" viewBox="0 0 40 30" fill="currentColor">
                    <path d="M20 8 L26 18 L38 6 L34 28 L6 28 L2 6 L14 18 Z" />
                  </svg>
                </div>
              )}
              
              {/* Player Avatar - Hand-drawn style border */}
              <div
                className={cn(
                  'w-18 h-18 rounded-full flex items-center justify-center font-display text-lg mb-2 overflow-hidden relative',
                  style.avatarBg,
                  style.text,
                  player.rank === 1 ? 'w-20 h-20 border-[3px]' : 'w-16 h-16 border-2',
                  style.border
                )}
                style={{ borderRadius: '60% 40% 50% 50% / 50% 50% 40% 60%' }}
              >
                {player.avatar_url ? (
                  <img
                    src={player.avatar_url}
                    alt={player.player_name}
                    className="w-full h-full object-cover"
                  />
                ) : player.rank === 1 ? (
                  <Trophy className="w-7 h-7" />
                ) : (
                  <span className="text-lg">{getInitials(player.player_name)}</span>
                )}
              </div>

              {/* Player Name */}
              <p className={cn('font-semibold text-sm text-center mb-0.5 truncate max-w-[100px] text-foreground')}>
                {player.player_name}
              </p>

              {/* Points with decoration */}
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-muted-foreground">
                  {player.total_points} {t.podium.pts}
                </span>
              </div>

              {/* Podium Platform - Hand-drawn style */}
              <div
                className={cn(
                  'w-28 flex flex-col items-center justify-start pt-3 border-t-2 border-x-2 transition-all relative',
                  style.height,
                  style.bg,
                  style.border
                )}
                style={{ 
                  borderRadius: player.rank === 1 ? '20px 8px 0 0' : '12px 4px 0 0',
                }}
              >
                {/* Decorative corner marks */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l opacity-40" style={{ borderColor: 'currentColor' }} />
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r opacity-40" style={{ borderColor: 'currentColor' }} />
                
                <Medal className={cn('w-5 h-5 mb-1', style.text)} />
                <span className={cn('font-display text-2xl', style.text)}>
                  {player.rank}
                </span>
                <span className={cn('text-[9px] tracking-wider opacity-80 text-center px-2', style.text)}>
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
