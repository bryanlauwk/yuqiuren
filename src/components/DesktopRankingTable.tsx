import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getInitials } from '@/lib/ranking-display';
import { RankDelta } from '@/components/RankDelta';

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

export function DesktopRankingTable({
  rankings,
  onAvatarClick,
}: DesktopRankingTableProps) {
  const { t, language } = useLanguage();

  const maxPoints = Math.max(rankings[0]?.total_points ?? 0, 1);

  const d = {
    rowPadY: 'py-3 leading-none',
    topRowPadY: 'py-3.5 leading-none',
    headPadY: 'h-auto py-2.5 leading-none',
    cellPadX: 'px-2 lg:px-3',
    sessionsPadX: 'pl-4 lg:pl-6 pr-2 lg:pr-4',
    firstPadX: 'pl-3 lg:pl-5 pr-3 lg:pr-4',
    lastPadX: 'pl-2 lg:pl-3 pr-3 lg:pr-5',
    avatar: 'w-16 h-16',
    avatarRadius: 'rounded-lg',
    topAvatar: 'w-[72px] h-[72px]',
    topAvatarRadius: 'rounded-xl',
    rankBadge: 'w-9 h-9 text-lg',
    topRankBadge: 'w-12 h-12 text-lg',
    text: 'text-2xl',
    nameText: 'text-lg',
    topNameText: 'text-xl',
    statText: 'text-lg font-black',
    pointsText: 'text-lg font-black',
    headText: 'text-[11px]',
    gap: 'gap-3 lg:gap-4',
    sepH: 'h-1.5',
    barH: 'h-10',
    topBarH: 'h-10',
  };

  return (
    <div className="rounded bg-card border-2 border-foreground shadow-[6px_6px_0_0_hsl(var(--foreground))] overflow-hidden">
      <Table className="table-fixed w-full">
        <colgroup>
          <col className="w-[7%]" />
          <col className="w-[35%]" />
          <col className="w-[7%]" />
          <col className="w-[7%]" />
          <col className="w-[44%]" />
        </colgroup>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b-2 border-foreground bg-foreground">
            <TableHead
              className={cn(
                d.firstPadX,
                d.headPadY,
                d.headText,
                'text-center text-background border-t border-t-background/20'
              )}
            >
              <HeaderLabel kicker={language === 'zh' ? '名次' : 'POS'} label="#" align="center" />
            </TableHead>
            <TableHead
              className={cn(
                d.cellPadX,
                d.headPadY,
                d.headText,
                'text-left text-background border-t border-t-background/20'
              )}
            >
              <HeaderLabel kicker={language === 'zh' ? '球员资料' : 'PLAYER'} label={t.ranking.player} />
            </TableHead>
            <TableHead
              className={cn(
                d.sessionsPadX,
                d.headPadY,
                d.headText,
                'text-right text-background border-t border-t-background/20'
              )}
            >
              <HeaderLabel kicker={language === 'zh' ? '出赛' : 'PLAYED'} label={t.ranking.sessions} align="right" />
            </TableHead>
            <TableHead
              className={cn(
                d.cellPadX,
                d.headPadY,
                d.headText,
                'text-right text-background border-t border-t-background/20'
              )}
            >
              <HeaderLabel kicker={language === 'zh' ? '冠军' : 'WINS'} label={t.ranking.wins} align="right" />
            </TableHead>
            <TableHead
              className={cn(
                d.lastPadX,
                d.headPadY,
                d.headText,
                'text-left text-background border-t border-t-background/20'
              )}
            >
              <HeaderLabel kicker={language === 'zh' ? '赛季累计' : 'SEASON TOTAL'} label={t.ranking.points} accent />
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
            const labelOnFill = pct >= 85;

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
                  <TableCell className={cn(d.firstPadX, rowPadY, 'text-center align-middle')}>
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
                            loading="lazy"
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

                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <p
                            className={cn(
                              'font-display text-foreground tracking-tight truncate transition-colors',
                              isTopThree ? d.topNameText : d.nameText,
                              isFirst && 'group-hover:text-accent',
                              isSecond && 'group-hover:text-primary'
                            )}
                          >
                            {ranking.player_name}
                          </p>
                          <RankDelta ranking={ranking} />
                        </div>
                      </div>

                    </div>
                  </TableCell>

                  <TableCell className={cn(d.sessionsPadX, rowPadY, 'text-right align-middle')}>
                    <p className={cn('font-display text-foreground tabular-nums', d.statText)}>
                      {ranking.sessions_played}
                    </p>
                  </TableCell>

                  <TableCell className={cn(d.cellPadX, rowPadY, 'text-right align-middle')}>
                    <p className={cn('font-display text-foreground tabular-nums', d.statText)}>
                      {ranking.championships}
                    </p>
                  </TableCell>

                  <TableCell className={cn(d.lastPadX, rowPadY, 'align-middle')}>
                    <div
                      className={cn(
                        'relative w-full flex items-center justify-end overflow-hidden bg-muted/60 rounded-md',
                        isTopThree
                          ? cn('border-2 border-foreground', d.topBarH)
                          : cn('border-2 border-foreground/40', d.barH)
                      )}
                    >
                      <div
                        className={cn(
                          'absolute inset-y-0 left-0 origin-left animate-bar-grow',
                          isFirst
                            ? 'bg-accent'
                            : isSecond
                            ? 'bg-primary'
                            : isThird
                            ? 'bg-muted-foreground/70'
                            : 'bg-foreground/25'
                        )}
                        style={{ width: `${pct}%` }}
                      />
                      <span
                        className={cn(
                          'relative z-10 font-display tabular-nums',
                          d.pointsText,
                          isFirst ? 'pr-14' : 'pr-2.5',
                          labelOnFill && isFirst
                            ? 'text-accent-foreground'
                            : labelOnFill && isSecond
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

function HeaderLabel({
  kicker,
  label,
  align = 'left',
  accent = false,
}: {
  kicker: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  accent?: boolean;
}) {
  return (
    <span className={cn('block leading-none', align === 'center' && 'text-center', align === 'right' && 'text-right')}>
      <span className="mb-1 block font-sans text-[7px] font-black uppercase tracking-[0.18em] text-background/50">
        {kicker}
      </span>
      <span className={cn('font-display text-sm tracking-wide text-background', accent && 'text-accent')}>
        {label}
      </span>
    </span>
  );
}
