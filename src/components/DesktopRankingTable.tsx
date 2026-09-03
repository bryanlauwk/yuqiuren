import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getInitials, getWinRate } from '@/lib/ranking-display';
import { RankDelta } from '@/components/RankDelta';

import type { PlayerRanking } from '@/types/ranking';

interface DesktopRankingTableProps {
  rankings: PlayerRanking[];
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
}

export function DesktopRankingTable({
  rankings,
  onAvatarClick,
}: DesktopRankingTableProps) {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  const col = {
    rank: 'w-16 shrink-0',
    stat: 'w-20 shrink-0 text-right',
    points: 'w-24 shrink-0 text-right',
  };

  const headCls = 'text-[10px] font-black uppercase tracking-[0.18em] text-background/60';

  return (
    <div className="w-full">
      {/* Header strip */}
      <div className="flex items-center gap-5 border-x-2 border-b-2 border-foreground bg-muted/60 px-5 py-2">
        <span className={cn(col.rank, headCls, 'text-center')}>#</span>
        <span className="w-12 shrink-0" />
        <span className={cn('flex-1', headCls)}>{t.ranking.player}</span>
        <span className={cn(col.stat, headCls)}>{t.ranking.sessions}</span>
        <span className={cn(col.stat, headCls)}>{t.ranking.wins}</span>
        <span className={cn(col.stat, headCls)}>{isZh ? '胜率' : 'WIN %'}</span>
        <span className={cn(col.points, headCls, 'text-primary')}>
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
                'group flex items-center gap-5 rounded border-2 border-foreground bg-card px-5 transition-all duration-200',
                'hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(var(--foreground))]',
                isTopThree ? 'py-3' : 'py-2',
                isFirst && 'bg-accent/[0.07] shadow-[0_0_0_1px_hsl(var(--accent)/0.35)]',
                isSecond && 'bg-primary/[0.06]',
                isThird && 'bg-muted/30',
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

              {/* Name + sub info */}
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
                  <RankDelta ranking={ranking} />
                </div>
                <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isZh
                    ? `${ranking.sessions_played} 场 · ${ranking.championships} 胜 · ${getWinRate(ranking)}% 胜率`
                    : `${ranking.sessions_played} PL · ${ranking.championships} W · ${getWinRate(ranking)}% WR`}
                </p>
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
              <p className={cn(col.stat, 'font-sans text-sm font-bold tabular-nums text-muted-foreground')}>
                {getWinRate(ranking)}%
              </p>

              {/* Points */}
              <div className={col.points}>
                <p
                  className={cn(
                    'font-display font-black leading-none tabular-nums',
                    isTopThree ? 'text-3xl' : 'text-2xl',
                    isFirst ? 'text-accent' : isSecond ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {ranking.total_points}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t.ranking.points}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
