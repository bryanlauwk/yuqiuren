import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
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
        return 'bg-rank-gold/15 text-rank-gold border-rank-gold/30';
      case 2:
        return 'bg-rank-silver/15 text-rank-silver border-rank-silver/30';
      case 3:
        return 'bg-rank-bronze/15 text-rank-bronze border-rank-bronze/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-all card-shadow hover-lift"
    )}>
      {/* Rank Number */}
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center font-display text-lg border",
        getRankBadgeStyle()
      )}>
        {ranking.rank}
      </div>

      {/* Player Avatar */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary border border-border overflow-hidden">
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
          <p className="font-semibold text-foreground truncate">{ranking.player_name}</p>
          {getRankChangeDisplay()}
        </div>
        <p className="text-xs text-muted-foreground">
          {ranking.sessions_played} {t.ranking.sessions} • {ranking.championships} {t.ranking.wins}
        </p>
      </div>

      {/* Total Points */}
      <div className="text-right">
        <p className="text-2xl font-display text-primary">{ranking.total_points}</p>
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{t.ranking.points}</p>
      </div>
    </div>
  );
}
