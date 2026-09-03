import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getInitials, getWinRate } from '@/lib/ranking-display';
import { RankDelta } from '@/components/RankDelta';

import type { PlayerRanking } from '@/types/ranking';

interface DesktopRankingTableProps {
  rankings: PlayerRanking[];
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
  primaryMetric?: 'points' | 'winRate';
  showRankDelta?: boolean;
}

export function DesktopRankingTable({
  rankings,
  onAvatarClick,
  primaryMetric = 'points',
  showRankDelta = true,
}: DesktopRankingTableProps) {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  const col = {
    rank: 'w-11 lg:w-16 shrink-0',
    stat: 'w-14 lg:w-20 shrink-0 text-right',
    points: 'w-16 lg:w-24 shrink-0 text-right',
  };

  const headCls = 'text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground';

  return (
    <div className="w-full">
      {/* Header strip */}
      <div className="sticky top-[89px] z-20 flex items-center gap-3 lg:gap-5 rounded border-2 border-foreground bg-muted/95 px-3 py-2 backdrop-blur lg:px-5">
        <span className={cn(col.rank, headCls, 'text-center')}>#</span>
        <span className="w-10 shrink-0 lg:w-12" />
        <span className={cn('flex-1', headCls)}>{t.ranking.player}</span>
        <span className={cn(col.stat, headCls)}>{t.ranking.sessions}</span>
        <span className={cn(col.stat, headCls)}>{t.ranking.wins}</span>
        <span className={cn(col.stat, headCls, primaryMetric === 'winRate' && 'text-primary')}>
          {isZh ? '胜率' : 'WIN %'}
        </span>
        <span className={cn(col.points, headCls, primaryMetric === 'points' && 'text-primary')}>
          {t.ranking.points}
        </span>
      </div>



      {/* Rows */}
      <div className="mt-2 space-y-1.5">
        {rankings.map((ranking) => {
          const isTopThree = ranking.rank <= 3;
          const isFirst = ranking.rank === 1;
          const isSecond = ranking.rank === 2;
          const isThird = ranking.rank === 3;

          const accentBorder = isFirst
            ? 'border-l-[6px] border-l-accent'
            : isSecond
            ? 'border-l-[6px] border-l-primary'
            : isThird
            ? 'border-l-[6px] border-l-foreground/70'
            : '';

          const badgeStyle = isFirst
            ? 'bg-accent text-accent-foreground'
            : isSecond
            ? 'bg-primary text-primary-foreground'
            : 'bg-foreground text-background';

          return (
            <div
              key={ranking.player_id}
              className={cn(
                'group flex items-center gap-3 lg:gap-5 rounded border-2 border-foreground bg-card px-3 lg:px-5 transition-all duration-200',
                'hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(var(--foreground))]',
                isTopThree ? 'py-3' : 'py-2',
                isFirst && 'bg-accent/[0.04]',
                isSecond && 'bg-primary/[0.035]',
                isThird && 'bg-muted/20',

                accentBorder
              )}
            >

              {/* Rank */}
              <div className={cn(col.rank, 'flex items-center justify-center gap-1')}>
                {isTopThree ? (
                  <span
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-foreground font-display text-lg italic tabular-nums shadow-[2px_2px_0_0_hsl(var(--foreground))]',
                      badgeStyle
                    )}
                  >
                    {ranking.rank}
                  </span>
                ) : (
                  <span className="font-display text-2xl italic tabular-nums text-muted-foreground">
                    {ranking.rank}
                  </span>
                )}
                {isFirst && <Crown className="h-4 w-4 text-accent" strokeWidth={2.5} aria-hidden />}
              </div>

              {/* Avatar */}
              <button
                onClick={() =>
                  ranking.full_avatar_url &&
                  onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)
                }
                disabled={!ranking.full_avatar_url}
                aria-label={ranking.player_name}
                className={cn(
                  'h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted transition-transform duration-200 group-hover:scale-105',
                  isTopThree ? 'border-2 border-foreground' : 'border-2 border-foreground/50',
                  ranking.full_avatar_url && 'cursor-pointer'
                )}
              >
                {ranking.avatar_url ? (
                  <img
                    src={ranking.avatar_url}
                    alt={ranking.player_name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition:
                        ranking.avatar_crop_x !== null && ranking.avatar_crop_y !== null
                          ? `${(ranking.avatar_crop_x ?? 0.5) * 100}% ${(ranking.avatar_crop_y ?? 0.5) * 100}%`
                          : 'center',
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-black text-foreground">
                    {getInitials(ranking.player_name)}
                  </div>
                )}
              </button>

              {/* Name */}
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-2.5">
                  <p
                    className={cn(
                      'truncate font-display leading-none tracking-tight text-foreground transition-colors',
                      isTopThree ? 'text-xl' : 'text-lg',
                      isFirst && 'group-hover:text-accent',
                      isSecond && 'group-hover:text-primary'
                    )}
                  >
                    {ranking.player_name}
                  </p>
                  {showRankDelta && <RankDelta ranking={ranking} />}
                </div>
              </div>


              {/* Sessions */}
              <p className={cn(col.stat, 'font-display text-lg font-black leading-none tabular-nums text-foreground')}>
                {ranking.sessions_played}
              </p>

              {/* Wins */}
              <p className={cn(col.stat, 'font-display text-lg font-black leading-none tabular-nums text-foreground')}>
                {ranking.championships}
              </p>

              {/* Win rate */}
              <p
                className={cn(
                  col.stat,
                  'tabular-nums',
                  primaryMetric === 'winRate'
                    ? 'font-display text-2xl font-black leading-none text-primary'
                    : 'font-sans text-sm font-bold text-muted-foreground',
                )}
              >
                {getWinRate(ranking)}%
              </p>

              {/* Points */}
              <div className={col.points}>
                <p
                  className={cn(
                    'font-display font-black leading-none tabular-nums',
                    isTopThree ? 'text-3xl' : 'text-2xl',
                    primaryMetric === 'points'
                      ? isFirst
                        ? 'text-accent'
                        : isSecond
                        ? 'text-primary'
                        : 'text-foreground'
                      : 'text-foreground'
                  )}
                >
                  {ranking.total_points}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
