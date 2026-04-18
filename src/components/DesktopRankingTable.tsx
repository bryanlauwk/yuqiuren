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

  const getRankChangeDisplay = (ranking: PlayerRanking) => {
    if (ranking.rank_change > 0) {
      return (
        <div className="flex items-center gap-0.5 text-finished">
          <ArrowUp className="w-3.5 h-3.5" strokeWidth={3} />
          <span className="text-xs font-black">{ranking.rank_change}</span>
        </div>
      );
    }
    if (ranking.rank_change < 0) {
      return (
        <div className="flex items-center gap-0.5 text-destructive">
          <ArrowDown className="w-3.5 h-3.5" strokeWidth={3} />
          <span className="text-xs font-black">{Math.abs(ranking.rank_change)}</span>
        </div>
      );
    }
    if (!ranking.is_new) {
      return (
        <div className="flex items-center text-muted-foreground">
          <Minus className="w-3.5 h-3.5" strokeWidth={3} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded bg-card border-2 border-foreground shadow-[6px_6px_0_0_hsl(var(--foreground))] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b-2 border-foreground bg-foreground">
            <TableHead className="w-20 text-center text-xs font-display text-background">
              Rank
            </TableHead>
            <TableHead className="text-xs font-display text-background">
              Player
            </TableHead>
            <TableHead className="w-28 text-center text-xs font-display text-background">
              {t.ranking.sessions}
            </TableHead>
            <TableHead className="w-28 text-center text-xs font-display text-background">
              {t.ranking.wins}
            </TableHead>
            <TableHead className="w-32 text-center text-xs font-display text-background">
              {t.ranking.points}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((ranking) => {
            const isTopThree = ranking.rank <= 3;
            const isFirst = ranking.rank === 1;

            return (
              <TableRow
                key={ranking.player_id}
                className={cn(
                  "transition-colors duration-150 border-b-2 border-foreground/10 hover:bg-muted",
                  isTopThree && "border-l-[8px] border-l-primary"
                )}
              >
                <TableCell className="text-center py-5">
                  {isTopThree ? (
                    <div className="inline-flex items-center justify-center bg-primary border-2 border-foreground rounded font-display text-foreground mx-auto w-12 h-12 text-2xl">
                      {ranking.rank}
                    </div>
                  ) : (
                    <span className="text-2xl font-display text-foreground">
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
                        "flex-shrink-0 rounded overflow-hidden bg-muted border-2 border-foreground transition-all",
                        isTopThree ? "w-14 h-14" : "w-12 h-12",
                        ranking.full_avatar_url && "cursor-pointer hover:-translate-y-0.5"
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
                        <div className="w-full h-full flex items-center justify-center text-foreground text-sm font-black">
                          {getInitials(ranking.player_name)}
                        </div>
                      )}
                    </button>

                    <div className="flex items-center gap-3">
                      <p className={cn(
                        "font-display text-foreground tracking-tight",
                        isTopThree ? "text-2xl" : "text-xl"
                      )}>
                        {ranking.player_name}
                      </p>
                      {getRankChangeDisplay(ranking)}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center py-5">
                  <p className={cn("font-display text-foreground", isTopThree ? "text-xl" : "text-lg")}>
                    {ranking.sessions_played}
                  </p>
                </TableCell>

                <TableCell className="text-center py-5">
                  <p className={cn("font-display text-foreground", isTopThree ? "text-xl" : "text-lg")}>
                    {ranking.championships}
                  </p>
                </TableCell>

                <TableCell className="text-center py-5">
                  {isFirst ? (
                    <span className="inline-block bg-primary border-2 border-foreground px-3 py-1 rounded font-display text-2xl text-foreground">
                      {ranking.total_points}
                    </span>
                  ) : (
                    <p className={cn("font-display text-foreground", isTopThree ? "text-2xl" : "text-xl")}>
                      {ranking.total_points}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
