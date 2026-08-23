import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown, Minus, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { TierBadge } from '@/components/TierBadge';

import type { PlayerRanking } from '@/types/ranking';

interface MobileRankingCardProps {
  ranking: PlayerRanking;
  maxPoints: number;
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
}

export function MobileRankingCard({ ranking, maxPoints, onAvatarClick }: MobileRankingCardProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

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

  const winRate =
    ranking.sessions_played > 0
      ? Math.round((ranking.championships / ranking.sessions_played) * 100)
      : 0;
  const avgPoints =
    ranking.sessions_played > 0
      ? (ranking.total_points / ranking.sessions_played).toFixed(1)
      : '0.0';

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
    if (ranking.is_new) {
      return <Sparkles className="w-3.5 h-3.5 text-accent" strokeWidth={3} />;
    }
    return (
      <div className="flex items-center text-muted-foreground">
        <Minus className="w-3.5 h-3.5" strokeWidth={3} />
      </div>
    );
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

  return (
    <div
      className={cn(
        'rounded bg-card border-2 border-foreground overflow-hidden',
        'shadow-[4px_4px_0_0_hsl(var(--foreground))]',
        accentTint,
        accentBorder
      )}
    >
      {/* Lean row — tap anywhere to expand */}
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? t.ranking.collapse : t.ranking.expand}
          className="flex-1 min-w-0 flex items-center gap-3 px-3 py-2.5 min-h-[64px] text-left active:bg-foreground/5 transition-colors"
        >
          {/* Rank */}
          <div
            className={cn(
              'flex-shrink-0 inline-flex items-center justify-center border-2 rounded-lg font-display italic tabular-nums',
              isTopThree
                ? cn('w-12 h-12 text-xl border-foreground shadow-[2px_2px_0_0_hsl(var(--foreground))]', badgeStyle)
                : 'w-11 h-11 text-lg border-foreground/50 bg-muted text-muted-foreground'
            )}
          >
            {ranking.rank}
          </div>

          {/* Name + rank delta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  'font-display text-foreground tracking-tight truncate',
                  isTopThree ? 'text-2xl' : 'text-xl'
                )}
              >
                {ranking.player_name}
              </p>
              {getRankChangeDisplay()}
              <TierBadge points={ranking.total_points} />
            </div>

            {/* Points bar — the one metric that always shows */}
            <div className="mt-1.5 relative h-2 rounded-full bg-muted/70 overflow-hidden">
              <div
                className={cn('absolute inset-y-0 left-0 transition-[width] duration-700 ease-out', barFill)}
                style={{ width: fillWidth }}
              />
            </div>
          </div>

          {/* Points value */}
          <div className="flex-shrink-0 text-right">
            <p className="font-display text-2xl font-black tabular-nums leading-none text-foreground">
              {ranking.total_points}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mt-0.5">
              {t.ranking.points}
            </p>
          </div>

          <ChevronDown
            className={cn(
              'flex-shrink-0 w-5 h-5 text-foreground/40 transition-transform duration-200',
              expanded && 'rotate-180'
            )}
            strokeWidth={3}
          />
        </button>
      </div>

      {/* Micro-dashboard */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-3 pt-3 border-t-2 border-foreground/15">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  ranking.full_avatar_url &&
                  onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)
                }
                disabled={!ranking.full_avatar_url}
                aria-label={ranking.player_name}
                className={cn(
                  'flex-shrink-0 w-16 h-16 min-w-[48px] min-h-[48px] overflow-hidden bg-muted rounded-xl border-2 border-foreground shadow-[2px_2px_0_0_hsl(var(--foreground))]',
                  ranking.full_avatar_url && 'active:scale-95 transition-transform'
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
                  <div className="w-full h-full flex items-center justify-center text-foreground text-base font-black">
                    {getInitials(ranking.player_name)}
                  </div>
                )}
              </button>

              <div className="flex-1 grid grid-cols-2 gap-2">
                <Stat label={t.ranking.sessions} value={ranking.sessions_played} />
                <Stat label={t.ranking.wins} value={ranking.championships} />
                <Stat label={t.ranking.winRate} value={`${winRate}%`} />
                <Stat label={t.ranking.avgPoints} value={avgPoints} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border-2 border-foreground/15 bg-muted/40 px-2.5 py-1.5">
      <p className="font-display text-xl font-black tabular-nums leading-none text-foreground">
        {value}
      </p>
      <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mt-1">
        {label}
      </p>
    </div>
  );
}
