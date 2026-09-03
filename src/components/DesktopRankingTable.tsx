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

  const col = {
    rank: 'w-14 shrink-0',
    stat: 'w-16 shrink-0 text-right',
    points: 'w-24 shrink-0 text-right',
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Header strip */}
      <div className="flex items-center gap-4 rounded bg-foreground px-4 py-2.5">
        <span className={cn(col.rank, 'text-center text-[10px] font-black uppercase tracking-[0.18em] text-background/60')}>
          #
        </span>
        <span className="w-14 shrink-0" />
        <span className="flex-1 text-[10px] font-black uppercase tracking-[0.18em] text-background/60">
          {t.ranking.player}
        </span>
        <span className={cn(col.stat, 'text-[10px] font-black uppercase tracking-[0.18em] text-background/60')}>
          {t.ranking.sessions}
        </span>
        <span className={cn(col.stat, 'text-[10px] font-black uppercase tracking-[0.18em] text-background/60')}>
          {t.ranking.wins}
        </span>
        <span className={cn(col.points, 'text-[10px] font-black uppercase tracking-[0.18em] text-accent')}>
          {t.ranking.points}
        </span>
      </div>

      {/* Rows */}
      <div className="mt-2 space-y-2">
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
            ? 'border-l-[6px] border-l-muted-foreground'
            : '';

          const badgeStyle = isFirst
            ? 'bg-accent text-accent-foreground'
            : isSecond
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-foreground';

          return (
            <div
              key={ranking.player_id}
              className={cn(
                'group flex items-center gap-4 rounded border-2 border-foreground bg-card px-4 transition-all duration-200',
                'hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_hsl(var(--foreground))]',
                isTopThree ? 'py-3' : 'py-2.5',
                isFirst && 'bg-accent/5',
                isSecond && 'bg-primary/5',
                isThird && 'bg-muted/20',
                accentBorder
              )}
            >
              {/* Rank */}
              <div className={cn(col.rank, 'flex items-center justify-center')}>
                {isTopThree ? (
                  <span
                    className={cn(
                      'inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground font-display text-lg italic tabular-nums shadow-[2px_2px_0_0_hsl(var(--foreground))]',
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
                  'h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted transition-transform duration-200 group-hover:scale-105',
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
                      'truncate font-display tracking-tight text-foreground transition-colors',
                      isTopThree ? 'text-xl' : 'text-lg',
                      isFirst && 'group-hover:text-accent',
                      isSecond && 'group-hover:text-primary'
                    )}
                  >
                    {ranking.player_name}
                  </p>
                  <RankDelta ranking={ranking} />
                </div>
                <p className="mt-0.5 truncate text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {language === 'zh'
                    ? `${ranking.sessions_played} 场 · ${ranking.championships} 冠 · ${getWinRate(ranking)}% 胜率`
                    : `${ranking.sessions_played} PL · ${ranking.championships} W · ${getWinRate(ranking)}% WR`}
                </p>
              </div>

              {/* Sessions */}
              <p className={cn(col.stat, 'font-display text-lg font-black tabular-nums text-foreground')}>
                {ranking.sessions_played}
              </p>

              {/* Wins */}
              <p className={cn(col.stat, 'font-display text-lg font-black tabular-nums text-foreground')}>
                {ranking.championships}
              </p>

              {/* Points */}
              <div className={col.points}>
                <p
                  className={cn(
                    'font-display text-3xl font-black leading-none tabular-nums',
                    isFirst ? 'text-accent' : isSecond ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {ranking.total_points}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
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
