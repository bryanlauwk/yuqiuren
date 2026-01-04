import { ArrowUp, ArrowDown, Minus, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PlayerRanking } from '@/types/ranking';
import { useLanguage } from '@/contexts/LanguageContext';

interface RankingRowProps {
  ranking: PlayerRanking;
}

export function RankingRow({ ranking }: RankingRowProps) {
  const { t } = useLanguage();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRankChangeDisplay = () => {
    if (ranking.rank_change > 0) {
      return (
        <div className="flex items-center gap-0.5 text-finished">
          <ArrowUp className="w-3 h-3" />
          <span className="text-xs font-medium">{ranking.rank_change}</span>
        </div>
      );
    }
    
    if (ranking.rank_change < 0) {
      return (
        <div className="flex items-center gap-0.5 text-destructive">
          <ArrowDown className="w-3 h-3" />
          <span className="text-xs font-medium">{Math.abs(ranking.rank_change)}</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center text-muted-foreground">
        <Minus className="w-3 h-3" />
      </div>
    );
  };

  const getRankBadgeStyle = () => {
    switch (ranking.rank) {
      case 1:
        return 'bg-rank-gold/20 text-rank-gold border-rank-gold/50';
      case 2:
        return 'bg-rank-silver/20 text-rank-silver border-rank-silver/50';
      case 3:
        return 'bg-rank-bronze/20 text-rank-bronze border-rank-bronze/50';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 bg-card doodle-card hover:rotate-0 transition-all group cursor-default"
    )}>
      {/* Rank Number - Hand-drawn style */}
      <div className={cn(
        "w-11 h-11 flex items-center justify-center font-display text-lg border-2 relative group-hover:animate-wiggle transition-transform",
        getRankBadgeStyle()
      )}
      style={{ borderRadius: '50% 45% 55% 48%' }}
      >
        {ranking.rank}
        {ranking.rank <= 3 && (
          <Star className="absolute -top-1 -right-1 w-3 h-3 text-accent opacity-60 group-hover:animate-sparkle" />
        )}
      </div>

      {/* Player Avatar - Organic shape */}
      <div 
        className="w-11 h-11 flex items-center justify-center bg-secondary border-2 border-border overflow-hidden group-hover:scale-110 transition-transform"
        style={{ borderRadius: '45% 55% 50% 50%' }}
      >
        {ranking.avatar_url ? (
          <img
            src={ranking.avatar_url}
            alt={ranking.player_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm font-medium text-muted-foreground">
            {getInitials(ranking.player_name)}
          </span>
        )}
      </div>

      {/* Player Name & Stats */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{ranking.player_name}</p>
          {getRankChangeDisplay()}
        </div>
        <p className="text-xs text-muted-foreground">
          {ranking.sessions_played} {t.ranking.sessions} • {ranking.championships} {t.ranking.wins}
        </p>
      </div>

      {/* Total Points - With decoration */}
      <div className="text-right relative">
        <p className="text-3xl sm:text-4xl font-display font-bold text-primary drop-shadow-sm">{ranking.total_points}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.ranking.points}</p>
        {/* Small squiggle decoration */}
        <svg className="absolute -bottom-1 right-0 w-8 h-2 text-primary/20" viewBox="0 0 30 8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0 4 Q7.5 1, 15 4 T30 4" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
