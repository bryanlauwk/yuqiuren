import { Fragment, useEffect, useState } from 'react';
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

  // Trigger points-bar fill animation after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  const maxPoints = Math.max(rankings[0]?.total_points ?? 0, 1);

  const d = compact
    ? {
        rowPadY: 'py-3 leading-none',
        topRowPadY: 'py-4 leading-none',
        headPadY: 'h-auto py-2 leading-none',
        cellPadX: 'px-3',
        firstPadX: 'pl-4 pr-3',
        lastPadX: 'pl-3 pr-4',
        rankColW: 'w-14',
        statColW: 'w-20',
        pointsColW: 'w-40',
        avatar: 'w-12 h-12',
        avatarRadius: 'rounded-md',
        topAvatar: 'w-16 h-16',
        topAvatarRadius: 'rounded-lg',
        rankBadge: 'w-8 h-8 text-sm',
        topRankBadge: 'w-11 h-11 text-base',
        text: 'text-sm',
        headText: 'text-[10px]',
        gap: 'gap-4',
        sepH: 'h-1.5',
        barH: 'h-7',
        topBarH: 'h-10',
        barText: 'text-xs',
        topBarText: 'text-sm',
      }
    : {
        rowPadY: 'py-4 leading-none',
        topRowPadY: 'py-5 leading-none',
        headPadY: 'h-auto py-2.5 leading-none',
        cellPadX: 'px-4',
        firstPadX: 'pl-5 pr-4',
        lastPadX: 'pl-4 pr-5',
        rankColW: 'w-16',
        statColW: 'w-24',
        pointsColW: 'w-48',
        avatar: 'w-16 h-16',
        avatarRadius: 'rounded-lg',
        topAvatar: 'w-20 h-20',
        topAvatarRadius: 'rounded-xl',
        rankBadge: 'w-9 h-9 text-base',
        topRankBadge: 'w-14 h-14 text-xl',
        text: 'text-base',
        headText: 'text-[11px]',
        gap: 'gap-5',
        sepH: 'h-2',
        barH: 'h-8',
        topBarH: 'h-12',
        barText: 'text-sm',
        topBarText: 'text-base',
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
          <TableRow className="hover:bg-transparent border-b-2 border-foreground bg-foreground">
            <TableHead
              className={cn(
                d.rankColW,
                d.firstPadX,
                d.headPadY,
                d.headText,
                'text-center font-display italic text-background tracking-[0.2em] border-t border-t-background/20'
              )}
            >
              #
            </TableHead>
            <TableHead
              className={cn(
                d.cellPadX,
                d.headPadY,
                d.headText,
                'text-left font-display text-background tracking-widest border-t border-t-background/20'
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
                'text-center font-display text-background tracking-widest border-t border-t-background/20'
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
                'text-center font-display text-background tracking-widest border-t border-t-background/20'
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
                'text-left font-display text-background tracking-widest border-t border-t-background/20'
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-1 h-3 bg-accent" />
                {t.ranking.points}
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((ranking) => {
            const isTopThree = ranking.rank <= 3;
            const isFirst = ranking.rank === 1;
            const isSecond = ranking.rank === 2;
            const isThird = ranking.rank === 3;
            const rowPadY = isTopThree ? d.topRowPadY : d.rowPadY;
            const pct = Math.min(100, Math.round((ranking.total_points / maxPoints) * 100));
            const fillWidth = mounted ? `${pct}%` : '0%';

            const badgeRotate = isFirst
              ? 'group-hover:rotate-6'
              : isSecond
              ? 'group-hover:-rotate-3'
              : isThird
              ? 'group-hover:rotate-12'
              : '';

            const topHoverShadow = isFirst
              ? 'hover:shadow-[6px_6px_0_0_hsl(var(--accent))]'
              : isSecond
              ? 'hover:shadow-[6px_6px_0_0_hsl(var(--primary))]'
              : isThird
              ? 'hover:shadow-[6px_6px_0_0_hsl(var(--muted-foreground))]'
              : '';

            return (
              <Fragment key={ranking.player_id}>
                <TableRow
                  className={cn(
                    'group align-middle transition-all duration-200 border-b border-foreground/15 relative',
                    isTopThree
                      ? cn(
                          'hover:-translate-y-0.5 hover:-translate-x-0.5',
                          topHoverShadow,
                          isFirst
                            ? 'bg-accent/5 border-l-4 border-l-accent'
                            : isSecond
                            ? 'bg-primary/5 border-l-4 border-l-primary'
                            : 'bg-muted/20 border-l-4 border-l-muted-foreground'
                        )
                      : 'hover:bg-muted/50'
                  )}
                >
                  <TableCell className={cn(d.rankColW, d.firstPadX, rowPadY, 'text-center align-middle')}>
                    {isTopThree ? (
                      <div
                        className={cn(
                          'inline-flex items-center justify-center border-2 border-foreground rounded-lg font-display italic mx-auto shadow-[2px_2px_0_0_hsl(var(--foreground))] transition-transform duration-200',
                          d.topRankBadge,
                          badgeRotate,
                          isFirst
                            ? 'bg-accent text-accent-foreground'
                            : isSecond
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card text-foreground'
                        )}
                      >
                        {ranking.rank}
                      </div>
                    ) : (
                      <span className={cn('font-display italic text-muted-foreground tabular-nums', d.text)}>
                        {ranking.rank}
                      </span>
                    )}
                  </TableCell>

                  <TableCell className={cn(d.cellPadX, rowPadY, 'align-middle')}>
                    <div className={cn('flex items-center min-w-0', d.gap)}>
                      <button
                        onClick={() =>
                          ranking.full_avatar_url &&
                          onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)
                        }
                        disabled={!ranking.full_avatar_url}
                        className={cn(
                          'flex-shrink-0 overflow-hidden bg-muted transition-all duration-200 group-hover:scale-110',
                          isTopThree
                            ? cn(d.topAvatar, d.topAvatarRadius, 'border-2 border-foreground shadow-[2px_2px_0_0_hsl(var(--foreground))]')
                            : cn(d.avatar, d.avatarRadius, 'border-2 border-foreground/60'),
                          ranking.full_avatar_url && 'cursor-pointer'
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
                        <p
                          className={cn(
                            'font-display text-foreground tracking-tight truncate transition-colors',
                            d.text,
                            isFirst && 'group-hover:text-accent',
                            isSecond && 'group-hover:text-primary'
                          )}
                        >
                          {ranking.player_name}
                        </p>
                        {getRankChangeDisplay(ranking)}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className={cn(d.statColW, d.cellPadX, rowPadY, 'text-center align-middle')}>
                    <p className={cn('font-display text-foreground tabular-nums', d.text)}>
                      {ranking.sessions_played}
                    </p>
                  </TableCell>

                  <TableCell className={cn(d.statColW, d.cellPadX, rowPadY, 'text-center align-middle')}>
                    <p className={cn('font-display text-foreground tabular-nums', d.text)}>
                      {ranking.championships}
                    </p>
                  </TableCell>

                  <TableCell className={cn(d.pointsColW, d.lastPadX, rowPadY, 'align-middle')}>
                    <div
                      className={cn(
                        'relative w-full flex items-center overflow-hidden bg-muted/60',
                        isTopThree
                          ? cn('border-2 border-foreground', d.topBarH)
                          : cn('border-2 border-foreground/40', d.barH)
                      )}
                    >
                      <div
                        className={cn(
                          'absolute inset-y-0 left-0 transition-[width] duration-700 ease-out',
                          isFirst
                            ? 'bg-accent'
                            : isSecond
                            ? 'bg-primary'
                            : isThird
                            ? 'bg-muted-foreground/70'
                            : 'bg-foreground/25'
                        )}
                        style={{ width: fillWidth }}
                      />
                      <span
                        className={cn(
                          'relative z-10 font-display italic tabular-nums px-2.5',
                          isTopThree ? d.topBarText : d.barText,
                          isFirst
                            ? 'text-accent-foreground'
                            : isSecond
                            ? 'text-primary-foreground'
                            : 'text-foreground'
                        )}
                      >
                        {ranking.total_points}
                      </span>
                      {isFirst && (
                        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 bg-foreground text-accent text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 leading-none">
                          MAX
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>

                {ranking.rank <= 2 && (
                  <TableRow className="border-0 hover:bg-transparent bg-transparent">
                    <TableCell colSpan={5} className="p-0 border-0 align-middle">
                      <div
                        className={cn(
                          'leader-separator',
                          d.sepH,
                          ranking.rank === 1 ? 'leader-separator-1' : 'leader-separator-2'
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
