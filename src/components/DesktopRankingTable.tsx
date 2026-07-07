import { Fragment } from 'react';
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

export type RankingDensity = 'compact' | 'comfortable';

interface DesktopRankingTableProps {
  rankings: PlayerRanking[];
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
  density?: RankingDensity;
}

export function DesktopRankingTable({
  rankings,
  onAvatarClick,
  density = 'comfortable',
}: DesktopRankingTableProps) {
  const { t } = useLanguage();
  const compact = density === 'compact';

  // Density-driven tokens. Everything keys off these so header + rows stay on the same grid.
  const d = compact
    ? {
        rowPadY: 'py-1 leading-none',
        headPadY: 'h-auto py-1 leading-none',
        cellPadX: 'px-2',
        firstPadX: 'pl-3 pr-2',
        lastPadX: 'pl-2 pr-3',
        rankColW: 'w-12',
        statColW: 'w-20',
        pointsColW: 'w-24',
        avatar: 'w-8 h-8',
        rankBadge: 'w-7 h-7 text-sm',
        text: 'text-sm',
        headText: 'text-[10px]',
        gap: 'gap-2.5',
      }
    : {
        rowPadY: 'py-1.5 leading-none',
        headPadY: 'h-auto py-1.5 leading-none',
        cellPadX: 'px-3',
        firstPadX: 'pl-4 pr-3',
        lastPadX: 'pl-3 pr-4',
        rankColW: 'w-14',
        statColW: 'w-24',
        pointsColW: 'w-28',
        avatar: 'w-9 h-9',
        rankBadge: 'w-8 h-8 text-base',
        text: 'text-base',
        headText: 'text-[11px]',
        gap: 'gap-3',
      };

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

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
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-foreground bg-foreground">
            <TableHead
              className={cn(
                d.rankColW,
                d.firstPadX,
                d.headPadY,
                d.headText,
                'text-center font-display text-background tracking-wider'
              )}
            >
              #
            </TableHead>
            <TableHead
              className={cn(
                d.cellPadX,
                d.headPadY,
                d.headText,
                'text-left font-display text-background tracking-wider'
              )}
            >
              Player
            </TableHead>
            <TableHead
              className={cn(
                d.statColW,
                d.cellPadX,
                d.headPadY,
                d.headText,
                'text-right font-display text-background tracking-wider'
              )}
            >
              {t.ranking.sessions}
            </TableHead>
            <TableHead
              className={cn(
                d.statColW,
                d.cellPadX,
                d.headPadY,
                d.headText,
                'text-right font-display text-background tracking-wider'
              )}
            >
              {t.ranking.wins}
            </TableHead>
            <TableHead
              className={cn(
                d.pointsColW,
                d.lastPadX,
                d.headPadY,
                d.headText,
                'text-right font-display text-background tracking-wider'
              )}
            >
              {t.ranking.points}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((ranking) => {
            const isTopThree = ranking.rank <= 3;
            const isFirst = ranking.rank === 1;

            return (
              <Fragment key={ranking.player_id}>
                <TableRow
                  className={cn(
                    'align-middle transition-colors duration-150 border-b border-foreground/15 hover:bg-muted/60',
                    isTopThree &&
                      (isFirst
                        ? 'bg-accent/5 border-l-4 border-l-accent'
                        : 'bg-primary/5 border-l-4 border-l-primary')
                  )}
                >
                  <TableCell className={cn(d.rankColW, d.firstPadX, d.rowPadY, 'text-center align-middle')}>
                    {isTopThree ? (
                      <div
                        className={cn(
                          'inline-flex items-center justify-center border border-foreground rounded font-display mx-auto',
                          d.rankBadge,
                          isFirst
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-primary text-primary-foreground'
                        )}
                      >
                        {ranking.rank}
                      </div>
                    ) : (
                      <span className={cn('font-display text-muted-foreground tabular-nums', d.text)}>
                        {ranking.rank}
                      </span>
                    )}
                  </TableCell>

                  <TableCell className={cn(d.cellPadX, d.rowPadY, 'align-middle')}>
                    <div className={cn('flex items-center min-w-0', d.gap)}>
                      <button
                        onClick={() =>
                          ranking.full_avatar_url &&
                          onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)
                        }
                        disabled={!ranking.full_avatar_url}
                        className={cn(
                          'flex-shrink-0 rounded overflow-hidden bg-muted border border-foreground transition-all',
                          d.avatar,
                          ranking.full_avatar_url && 'cursor-pointer hover:-translate-y-0.5'
                        )}
                      >
                        {ranking.avatar_url ? (
                          <img
                            src={ranking.avatar_url}
                            alt={ranking.player_name}
                            className="w-full h-full object-cover"
                            style={{
                              objectPosition:
                                ranking.avatar_crop_x !== null && ranking.avatar_crop_y !== null
                                  ? `${(ranking.avatar_crop_x ?? 0.5) * 100}% ${(ranking.avatar_crop_y ?? 0.5) * 100}%`
                                  : 'center',
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-foreground text-xs font-black">
                            {getInitials(ranking.player_name)}
                          </div>
                        )}
                      </button>

                      <div className="flex items-center gap-2 min-w-0">
                        <p className={cn('font-display text-foreground tracking-tight truncate', d.text)}>
                          {ranking.player_name}
                        </p>
                        {getRankChangeDisplay(ranking)}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className={cn(d.statColW, d.cellPadX, d.rowPadY, 'text-right align-middle')}>
                    <p className={cn('font-display text-foreground tabular-nums', d.text)}>
                      {ranking.sessions_played}
                    </p>
                  </TableCell>

                  <TableCell className={cn(d.statColW, d.cellPadX, d.rowPadY, 'text-right align-middle')}>
                    <p className={cn('font-display text-foreground tabular-nums', d.text)}>
                      {ranking.championships}
                    </p>
                  </TableCell>

                  <TableCell className={cn(d.pointsColW, d.lastPadX, d.rowPadY, 'text-right align-middle')}>
                    {isFirst ? (
                      <span
                        className={cn(
                          'inline-block bg-accent text-accent-foreground border border-foreground px-2 py-0.5 rounded font-display tabular-nums',
                          d.text
                        )}
                      >
                        {ranking.total_points}
                      </span>
                    ) : (
                      <p className={cn('font-display text-foreground tabular-nums', d.text)}>
                        {ranking.total_points}
                      </p>
                    )}
                  </TableCell>
                </TableRow>

                {ranking.rank <= 2 && (
                  <TableRow className="border-0 hover:bg-transparent bg-transparent">
                    <TableCell colSpan={5} className="p-0 border-0 align-middle">
                      <div
                        className={cn(
                          'w-full',
                          compact ? 'h-1.5' : 'h-2.5',
                          ranking.rank === 1
                            ? 'bg-gradient-to-r from-accent/50 via-accent to-accent/10'
                            : 'bg-gradient-to-r from-primary/50 via-primary to-primary/10'
                        )}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
