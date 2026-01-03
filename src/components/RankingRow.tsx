import { Trophy } from 'lucide-react';
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

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors">
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
        <p className="font-medium text-foreground truncate">{ranking.player_name}</p>
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
