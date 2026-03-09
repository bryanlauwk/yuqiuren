import { ArrowUp, ArrowDown, Minus, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PlayerRanking } from '@/types/ranking';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DesktopRankingTableProps {
  rankings: PlayerRanking[];
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
}

export function DesktopRankingTable({ rankings, onAvatarClick }: DesktopRankingTableProps) {
  const { t } = useLanguage();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRowStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return 'rank-row-gold';
      case 2:
        return 'rank-row-silver';
      case 3:
        return 'rank-row-bronze';
      default:
        return 'rank-row-default hover:bg-muted/30';
    }
  };

  const getRankBadgeStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return 'rank-badge-gold';
      case 2:
        return 'rank-badge-silver';
      case 3:
        return 'rank-badge-bronze';
      default:
        return 'rank-badge-default';
    }
  };

  const getRankChangeDisplay = (ranking: PlayerRanking) => {
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
    
    // Show dash for unchanged rank (if player is not new)
    if (!ranking.is_new) {
      return (
        <div className="flex items-center text-muted-foreground">
          <Minus className="w-3 h-3" />
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="relative isolate rounded-lg border border-border bg-card/50 max-h-[70vh] overflow-x-hidden overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow className="relative bg-muted/50 hover:bg-muted/50 border-b-2 border-border overflow-hidden shimmer-row">
            <TableHead className="sticky top-0 z-20 bg-card w-20 text-center font-display text-xs uppercase tracking-wider">
              Rank
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-card font-display text-xs uppercase tracking-wider">
              Player
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-card w-28 text-center font-display text-xs uppercase tracking-wider">
              {t.ranking.sessions}
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-card w-28 text-center font-display text-xs uppercase tracking-wider">
              {t.ranking.wins}
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-card w-32 text-center font-display text-xs uppercase tracking-wider">
              {t.ranking.points}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((ranking, index) => {
            const isTopThree = ranking.rank <= 3;
            const isEvenRow = index % 2 === 0;
            
            return (
              <TableRow 
                key={ranking.player_id}
                className={cn(
                  "transition-all duration-200 border-b border-border",
                  getRowStyles(ranking.rank)
                )}
                style={!isTopThree && isEvenRow ? { backgroundColor: 'hsl(var(--muted) / 0.25)' } : undefined}
              >
                {/* Rank */}
                <TableCell className="text-center py-4">
                  <div className={cn(
                    "inline-flex items-center justify-center rounded-lg font-display font-bold mx-auto",
                    getRankBadgeStyles(ranking.rank),
                    isTopThree ? "w-10 h-10 text-lg" : "w-8 h-8 text-sm"
                  )}>
                    {ranking.rank}
                  </div>
                </TableCell>

                {/* Player (Avatar + Name + Rank Change) */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <button
                      onClick={() => ranking.full_avatar_url && onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)}
                      disabled={!ranking.full_avatar_url}
                      className={cn(
                        "flex-shrink-0 rounded-full overflow-hidden bg-muted border-2 border-border transition-all",
                        isTopThree ? "w-14 h-14" : "w-11 h-11",
                        ranking.full_avatar_url && "cursor-pointer hover:border-primary hover:scale-105"
                      )}
                    >
                      {ranking.avatar_url ? (
                        <img
                          src={ranking.avatar_url}
                          alt={ranking.player_name}
                          className="w-full h-full object-cover"
                          style={{
                            objectPosition: ranking.avatar_crop_x !== null && ranking.avatar_crop_y !== null
                              ? `${(ranking.avatar_crop_x ?? 0.5) * 100}% ${(ranking.avatar_crop_y ?? 0.5) * 100}%`
                              : 'center'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
                          {getInitials(ranking.player_name)}
                        </div>
                      )}
                    </button>

                    {/* Name + Rank Change */}
                    <div className="flex items-center gap-2">
                      <p className={cn(
                        "font-bold text-foreground",
                        isTopThree ? "text-xl" : "text-lg"
                      )}>
                        {ranking.player_name}
                      </p>
                      {getRankChangeDisplay(ranking)}
                    </div>
                  </div>
                </TableCell>

                {/* Sessions */}
                <TableCell className="text-center py-4">
                  <p className={cn(
                    "font-display font-bold text-foreground/80",
                    isTopThree ? "text-xl" : "text-lg"
                  )}>
                    {ranking.sessions_played}
                  </p>
                </TableCell>

                {/* Wins */}
                <TableCell className="text-center py-4">
                  <div className="flex items-center justify-center gap-1">
                    {isTopThree && (
                      <Trophy className={cn(
                        "w-5 h-5",
                        ranking.rank === 1 ? "text-rank-gold" : 
                        ranking.rank === 2 ? "text-rank-silver" : 
                        "text-rank-bronze"
                      )} />
                    )}
                    <p className={cn(
                      "font-display font-bold",
                      isTopThree ? "text-xl text-foreground" : "text-lg text-foreground/80"
                    )}>
                      {ranking.championships}
                    </p>
                  </div>
                </TableCell>

                {/* Points */}
                <TableCell className="text-center py-4">
                  <p className={cn(
                    "font-display font-bold",
                    isTopThree ? "text-2xl" : "text-xl",
                    ranking.rank === 1 ? "text-rank-gold text-glow-gold" : 
                    ranking.rank <= 3 ? "text-foreground text-glow-white" : 
                    "text-foreground/90"
                  )}>
                    {ranking.total_points}
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
