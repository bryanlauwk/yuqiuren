import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PlayerRanking } from '@/types/ranking';

interface MobileRankingCardProps {
  ranking: PlayerRanking;
  maxPoints: number;
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
}

export function MobileRankingCard({ ranking, maxPoints, onAvatarClick }: MobileRankingCardProps) {
  const { t } = useLanguage();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  const isTopThree = ranking.rank <= 3;
  const isFirst = ranking.rank === 1;
  const isSecond = ranking.rank === 2;
  const isThird = ranking.rank === 3;

  const pct = Math.min(100, Math.round((ranking.total_points / Math.max(maxPoints, 1)) * 100));
  const fillWidth = mounted ? `${pct}%` : '0%';
  const labelOnFill = pct >= 78;

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const getRankChangeDisplay = () => {
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

  const accentBorder = isFirst
    ? 'border-l-[6px] border-l-accent'
    : isSecond
    ? 'border-l-[6px] border-l-primary'
    : isThird
    ? 'border-l-[6px] border-l-muted-foreground'
    : '';

  const accentTint = isFirst
    ? 'bg-accent/5'
    : isSecond
    ? 'bg-primary/5'
    : isThird
    ? 'bg-muted/20'
    : 'bg-card';

  const badgeStyle = isFirst
    ? 'bg-accent text-accent-foreground'
    : isSecond
    ? 'bg-primary text-primary-foreground'
    : isThird
    ? 'bg-card text-foreground'
    : 'bg-muted text-foreground';

  const barFill = isFirst
    ? 'bg-accent'
    : isSecond
    ? 'bg-primary'
    : isThird
    ? 'bg-muted-foreground/70'
    : 'bg-foreground/25';

  const nameHover = isFirst
    ? 'group-active:text-accent'
    : isSecond
    ? 'group-active:text-primary'
    : '';

  return (
    <div
      className={cn(
        'group rounded bg-card border-2 border-foreground transition-transform duration-150 active:-translate-y-0.5',
        'shadow-[4px_4px_0_0_hsl(var(--foreground))]',
        accentTint,
        accentBorder,
        isTopThree ? 'p-4' : 'p-3.5'
      )}
    >
      {/* Row 1: Identity */}
      <div className="flex items-center gap-3">
        {isTopThree ? (
          <div
            className={cn(
              'flex-shrink-0 inline-flex items-center justify-center border-2 border-foreground rounded-lg font-display italic shadow-[2px_2px_0_0_hsl(var(--foreground))] w-12 h-12 text-xl',
              badgeStyle
            )}
          >
            {ranking.rank}
          </div>
        ) : (
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-foreground/60 rounded bg-muted">
            <span className="text-lg font-display italic text-muted-foreground tabular-nums">
              {ranking.rank}
            </span>
          </div>
        )}

        <button
          onClick={() =>
            ranking.full_avatar_url &&
            onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)
          }
          disabled={!ranking.full_avatar_url}
          className={cn(
            'flex-shrink-0 overflow-hidden bg-muted transition-all',
            isTopThree
              ? 'w-14 h-14 rounded-xl border-2 border-foreground shadow-[2px_2px_0_0_hsl(var(--foreground))]'
              : 'w-11 h-11 rounded-lg border-2 border-foreground/60',
            ranking.full_avatar_url && 'cursor-pointer active:scale-95'
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
            <div className="w-full h-full flex items-center justify-center text-foreground text-sm font-black">
              {getInitials(ranking.player_name)}
            </div>
          )}
        </button>

        <div className="flex-1 min-w-0 flex items-center gap-2">
          <p
            className={cn(
              'font-display text-foreground tracking-tight truncate transition-colors',
              isTopThree ? 'text-2xl' : 'text-xl',
              nameHover
            )}
          >
            {ranking.player_name}
          </p>
          {getRankChangeDisplay()}
        </div>
      </div>

      {/* Row 2: Stats */}
      <div className="mt-3 pt-3 border-t border-foreground/15 grid grid-cols-[1fr_1fr_1.6fr] gap-2 items-center">
        <div className="flex items-baseline gap-1.5">
          <p className="font-display text-foreground text-2xl font-black tabular-nums leading-none">
            {ranking.sessions_played}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
            {t.ranking.sessions}
          </p>
        </div>

        <div className="flex items-baseline gap-1.5">
          <p className="font-display text-foreground text-2xl font-black tabular-nums leading-none">
            {ranking.championships}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
            {t.ranking.wins}
          </p>
        </div>

        {/* Points bar */}
        <div
          className={cn(
            'relative w-full h-10 flex items-center justify-end overflow-hidden bg-muted/60 rounded-md',
            isTopThree ? 'border-2 border-foreground' : 'border-2 border-foreground/40'
          )}
        >
          <div
            className={cn('absolute inset-y-0 left-0 transition-[width] duration-700 ease-out', barFill)}
            style={{ width: fillWidth }}
          />
          <span
            className={cn(
              'relative z-10 font-display text-lg font-black tabular-nums',
              isFirst ? 'pr-12' : 'pr-2.5',
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
      </div>
    </div>
  );
}
