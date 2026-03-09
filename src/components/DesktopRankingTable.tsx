import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
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

  const getRankBadgeStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return 'rank-badge-gold';
      case 2:
        return 'rank-badge-silver';
      case 3:
        return 'rank-badge-bronze';
      default:
        return null;
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
    <div className="rounded-2xl bg-card shadow-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border/40">
            <TableHead className="sticky top-0 z-20 bg-card w-20 text-center text-sm text-muted-foreground font-medium">
              Rank
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-card text-sm text-muted-foreground font-medium">
              Player
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-card w-28 text-center text-sm text-muted-foreground font-medium">
              {t.ranking.sessions}
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-card w-28 text-center text-sm text-muted-foreground font-medium">
              {t.ranking.wins}
            </TableHead>
            <TableHead className="sticky top-0 z-20 bg-card w-32 text-center text-sm text-muted-foreground font-medium">
              {t.ranking.points}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((ranking) => {
            const isTopThree = ranking.rank <= 3;
            const badgeStyle = getRankBadgeStyles(ranking.rank);
            
            return (
              <TableRow 
                key={ranking.player_id}
                className="transition-colors duration-200 border-b border-border/40 hover:bg-muted/30"
              >
                <TableCell className="text-center py-5">
                  {badgeStyle ? (
                    <div className={cn(
                      "inline-flex items-center justify-center rounded-full font-display font-bold mx-auto",
                      badgeStyle,
                      "w-10 h-10 text-lg"
                    )}>
                      {ranking.rank}
                    </div>
                  ) : (
                    <span className="text-base font-medium text-muted-foreground">
                      {ranking.rank}
                    </span>
                  )}
                </TableCell>

                <TableCell className="py-5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => ranking.full_avatar_url && onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)}
                      disabled={!ranking.full_avatar_url}
                      className={cn(
                        "flex-shrink-0 rounded-full overflow-hidden bg-muted border border-border/50 transition-all",
                        isTopThree ? "w-14 h-14" : "w-11 h-11",
                        ranking.full_avatar_url && "cursor-pointer hover:ring-2 hover:ring-primary/30"
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

                <TableCell className="text-center py-5">
                  <p className={cn(
                    "font-display font-bold text-foreground/60",
                    isTopThree ? "text-lg" : "text-base"
                  )}>
                    {ranking.sessions_played}
                  </p>
                </TableCell>

                <TableCell className="text-center py-5">
                  <p className={cn(
                    "font-display font-bold text-foreground/60",
                    isTopThree ? "text-lg" : "text-base"
                  )}>
                    {ranking.championships}
                  </p>
                </TableCell>

                <TableCell className="text-center py-5">
                  <p className={cn(
                    "font-display font-bold text-foreground",
                    isTopThree ? "text-xl" : "text-lg"
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
