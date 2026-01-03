import { Trophy, ArrowUp, ArrowDown, Minus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PlayerRanking } from '@/types/ranking';

interface RankingRowProps {
  ranking: PlayerRanking;
}

export function RankingRow({ ranking }: RankingRowProps) {
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-rank-gold/20 border-rank-gold text-rank-gold';
      case 2:
        return 'bg-rank-silver/20 border-rank-silver text-rank-silver';
      case 3:
        return 'bg-rank-bronze/20 border-rank-bronze text-rank-bronze';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Trophy className="w-4 h-4" />;
    }
    return <span className="text-sm font-medium">{rank}</span>;
  };

  const getRankChangeDisplay = () => {
    if (ranking.is_new) {
      return (
        <div className="flex items-center gap-1 text-blue-500">
          <Sparkles className="w-3 h-3" />
          <span className="text-xs font-medium">NEW</span>
        </div>
      );
    }
    
    if (ranking.rank_change > 0) {
      return (
        <div className="flex items-center gap-0.5 text-green-500">
          <ArrowUp className="w-3 h-3" />
          <span className="text-xs font-medium">{ranking.rank_change}</span>
        </div>
      );
    }
    
    if (ranking.rank_change < 0) {
      return (
        <div className="flex items-center gap-0.5 text-red-500">
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

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-all",
      ranking.rank_change > 0 && "animate-fade-in",
      ranking.is_new && "ring-1 ring-blue-500/30"
    )}>
      {/* Rank Badge */}
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center border-2 font-display text-lg',
          getRankStyle(ranking.rank)
        )}
      >
        {getRankIcon(ranking.rank)}
      </div>

      {/* Player Name */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground truncate">{ranking.player_name}</p>
          {getRankChangeDisplay()}
        </div>
        <p className="text-xs text-muted-foreground">
          {ranking.sessions_played} sessions • {ranking.championships} wins
        </p>
      </div>

      {/* Total Points */}
      <div className="text-right">
        <p className="text-2xl font-display text-primary">{ranking.total_points}</p>
        <p className="text-xs text-muted-foreground">points</p>
      </div>
    </div>
  );
}
