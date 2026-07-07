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
          <TableRow className="hover:bg-transparent border-b border-foreground bg-foreground">
            <TableHead className="w-16 text-center text-[11px] font-display text-background py-2">
              Rank
            </TableHead>
            <TableHead className="text-[11px] font-display text-background py-2">
              Player
            </TableHead>
            <TableHead className="w-24 text-center text-[11px] font-display text-background py-2">
              {t.ranking.sessions}
            </TableHead>
            <TableHead className="w-24 text-center text-[11px] font-display text-background py-2">
              {t.ranking.wins}
            </TableHead>
            <TableHead className="w-28 text-center text-[11px] font-display text-background py-2">
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
                  "transition-colors duration-150 border-b border-foreground/15 hover:bg-muted/60",
                  isTopThree && (isFirst
                    ? "bg-accent/5 border-l-4 border-l-accent"
                    : "bg-primary/5 border-l-4 border-l-primary")
                )}
              >
                <TableCell className="text-center py-2.5">
                  {isTopThree ? (
                    <div
                      className={cn(
                        "inline-flex items-center justify-center border border-foreground rounded font-display mx-auto w-8 h-8 text-base",
                        isFirst ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                      )}
                    >
                      {ranking.rank}
                    </div>
                  ) : (
                    <span className="text-base font-display text-muted-foreground">
                      {ranking.rank}
                    </span>
                  )}
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => ranking.full_avatar_url && onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)}
                      disabled={!ranking.full_avatar_url}
                      className={cn(
                        "flex-shrink-0 rounded overflow-hidden bg-muted border border-foreground transition-all w-9 h-9",
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
                        <div className="w-full h-full flex items-center justify-center text-foreground text-xs font-black">
                          {getInitials(ranking.player_name)}
                        </div>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <p className="font-display text-foreground text-base tracking-tight">
                        {ranking.player_name}
                      </p>
                      {getRankChangeDisplay(ranking)}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center py-2.5">
                  <p className="font-display text-foreground text-base">
                    {ranking.sessions_played}
                  </p>
                </TableCell>

                <TableCell className="text-center py-2.5">
                  <p className="font-display text-foreground text-base">
                    {ranking.championships}
                  </p>
                </TableCell>

                <TableCell className="text-center py-2.5">
                  {isFirst ? (
                    <span className="inline-block bg-accent text-accent-foreground border border-foreground px-2 py-0.5 rounded font-display text-base">
                      {ranking.total_points}
                    </span>
                  ) : (
                    <p className="font-display text-foreground text-base">
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
