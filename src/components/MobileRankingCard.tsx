import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAveragePoints, getInitials, getWinRate } from '@/lib/ranking-display';
import { RankDelta } from '@/components/RankDelta';

import type { PlayerRanking } from '@/types/ranking';

interface MobileRankingCardProps {
  ranking: PlayerRanking;
  maxPoints: number;
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
  primaryMetric?: 'points' | 'winRate';
  showRankDelta?: boolean;
}

export function MobileRankingCard({
  ranking,
  onAvatarClick,
  primaryMetric = 'points',
  showRankDelta = true,
}: MobileRankingCardProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);


  const isTopThree = ranking.rank <= 3;
  const isFirst = ranking.rank === 1;
  const isSecond = ranking.rank === 2;
  const isThird = ranking.rank === 3;

  const winRate = getWinRate(ranking);
  const avgPoints = getAveragePoints(ranking);

  const accentBorder = isFirst
    ? 'border-l-[6px] border-l-accent'
    : isSecond
    ? 'border-l-[6px] border-l-primary'
    : isThird
    ? 'border-l-[6px] border-l-muted-foreground'
    : '';

  const accentTint = isFirst
    ? 'bg-accent/[0.04]'
    : isSecond
    ? 'bg-primary/[0.035]'
    : isThird
    ? 'bg-muted/15'
    : 'bg-card';

  const badgeStyle = isFirst
    ? 'bg-accent text-accent-foreground'
    : isSecond
    ? 'bg-primary text-primary-foreground'
    : isThird
    ? 'bg-card text-foreground'
    : 'bg-muted text-muted-foreground';

  return (
    <div
      className={cn(
        'rounded bg-card border-2 border-foreground overflow-hidden',
        'shadow-[4px_4px_0_0_hsl(var(--foreground))]',
        accentTint,
        accentBorder
      )}
    >
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? t.ranking.collapse : t.ranking.expand}
          className="flex-1 min-w-0 flex items-center gap-2.5 px-3 py-2.5 min-h-[64px] text-left active:bg-foreground/5 transition-colors"
        >
          {/* Rank */}
          <div
            className={cn(
              'flex-shrink-0 inline-flex items-center justify-center border-2 rounded-lg font-display italic tabular-nums',
              isTopThree
                ? cn('w-10 h-10 text-lg border-foreground shadow-[2px_2px_0_0_hsl(var(--foreground))]', badgeStyle)
                : 'w-10 h-10 text-lg border-foreground/50 bg-muted text-muted-foreground'
            )}
          >
            {ranking.rank}
          </div>

          {/* Avatar */}
          <span
            role="button"
            tabIndex={ranking.full_avatar_url ? 0 : -1}
            aria-label={ranking.player_name}
            onClick={(e) => {
              if (!ranking.full_avatar_url) return;
              e.stopPropagation();
              onAvatarClick?.(ranking.full_avatar_url, ranking.player_name);
            }}
            className={cn(
              'flex-shrink-0 w-12 h-12 min-w-[48px] min-h-[48px] overflow-hidden rounded-full bg-muted block',
              isTopThree ? 'border-2 border-foreground' : 'border-2 border-foreground/50',
              ranking.full_avatar_url && 'active:scale-95 transition-transform'
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
              <span className="w-full h-full flex items-center justify-center text-foreground text-xs font-black">
                {getInitials(ranking.player_name)}
              </span>
            )}
          </span>

          {/* Name + sub info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  'font-display text-foreground tracking-tight truncate',
                  isTopThree ? 'text-xl' : 'text-lg'
                )}
              >
                {ranking.player_name}
              </p>
              <RankDelta ranking={ranking} />
            </div>
            <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {ranking.sessions_played} · {ranking.championships} · {winRate}%
            </p>
          </div>

          {/* Points value */}
          <div className="flex-shrink-0 text-right">
            <p
              className={cn(
                'font-display text-2xl font-black tabular-nums leading-none',
                isFirst ? 'text-accent' : isSecond ? 'text-primary' : 'text-foreground'
              )}
            >
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
            <div className="grid grid-cols-2 gap-2">
              <Stat label={t.ranking.sessions} value={ranking.sessions_played} />
              <Stat label={t.ranking.wins} value={ranking.championships} />
              <Stat label={t.ranking.winRate} value={`${winRate}%`} />
              <Stat label={t.ranking.avgPoints} value={avgPoints} />
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
