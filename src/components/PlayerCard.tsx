import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getInitials, getWinRate } from '@/lib/ranking-display';
import type { PlayerRanking } from '@/types/ranking';

interface PlayerCardProps {
  ranking: PlayerRanking;
  bestStreak: number;
  mobile?: boolean;
  onSelect?: () => void;
}

export function PlayerCard({ ranking, bestStreak, mobile = false, onSelect }: PlayerCardProps) {
  const [flipped, setFlipped] = useState(false);
  const winRate = getWinRate(ranking);
  const imageUrl = ranking.avatar_url || ranking.full_avatar_url;

  const handleClick = () => {
    if (mobile) {
      onSelect?.();
      return;
    }
    setFlipped((value) => !value);
  };

  return (
    <button
      type="button"
      className={cn(
        'player-card group relative block h-[24rem] w-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4',
        mobile && 'w-[78vw] max-w-[19rem] shrink-0 snap-center',
      )}
      data-flipped={flipped}
      data-mobile={mobile}
      onClick={handleClick}
      onMouseEnter={() => !mobile && setFlipped(true)}
      onMouseLeave={() => !mobile && setFlipped(false)}
      aria-label={`${ranking.player_name}, rank ${ranking.rank}`}
      aria-pressed={!mobile ? flipped : undefined}
    >
      <span className="player-card-inner absolute inset-0 block">
        <span className="player-card-face absolute inset-0 block overflow-hidden border-2 border-foreground bg-primary shadow-[6px_6px_0_0_hsl(var(--foreground))]">
          <span className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="bg-background px-2.5 py-1 font-sans text-[9px] font-black uppercase tracking-[0.18em] text-foreground">
              2026 Roster
            </span>
            <span className="grid h-12 w-12 place-items-center border-2 border-foreground bg-accent font-display text-2xl text-accent-foreground">
              {ranking.rank}
            </span>
          </span>

          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
              style={{
                objectPosition: `${(ranking.avatar_crop_x ?? 0.5) * 100}% ${(ranking.avatar_crop_y ?? 0.5) * 100}%`,
              }}
            />
          ) : (
            <span className="flex h-full items-center justify-center font-display text-8xl text-primary-foreground/75">
              {getInitials(ranking.player_name)}
            </span>
          )}

          <span className="brand-photo-overlay absolute inset-0" />
          <span className="absolute inset-x-0 bottom-0 block p-5">
            <span className="mb-1 block font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[hsl(var(--band-foreground))]/65">
              YQR League · #{String(ranking.rank).padStart(2, '0')}
            </span>
            <span className="flex items-end justify-between gap-3">
              <span className="block font-display text-4xl leading-[0.9] band-fg">{ranking.player_name}</span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-accent" />
            </span>
          </span>
        </span>

        <span className="player-card-face player-card-back brand-surface absolute inset-0 block border-2 border-foreground p-5 shadow-[6px_6px_0_0_hsl(var(--foreground))]">
          <span className="flex h-full flex-col">
            <span className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-[hsl(var(--band-foreground))]/55">
              Player data · 2026
            </span>
            <span className="mt-2 block font-display text-4xl leading-[0.9] band-fg">{ranking.player_name}</span>

            <span className="mt-auto grid grid-cols-2 border-l border-t border-[hsl(var(--band-foreground))]/20">
              <CardStat label="场次 / GP" value={ranking.sessions_played} />
              <CardStat label="胜率 / WIN%" value={`${winRate}%`} />
              <CardStat label="积分 / PTS" value={ranking.total_points} />
              <CardStat label="排名 / RANK" value={`#${ranking.rank}`} />
              <CardStat label="最佳连胜 / STREAK" value={bestStreak} className="col-span-2" />
            </span>

            <span className="mt-4 flex items-center justify-between font-sans text-[9px] font-black uppercase tracking-[0.16em] text-[hsl(var(--band-foreground))]/55">
              <span>Click to return</span>
              <ArrowUpRight className="h-5 w-5 text-accent" />
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}

function CardStat({ label, value, className }: { label: string; value: string | number; className?: string }) {
  return (
    <span className={cn('block border-b border-r border-[hsl(var(--band-foreground))]/20 p-3', className)}>
      <span className="block font-display text-3xl leading-none text-accent">{value}</span>
      <span className="mt-1 block font-sans text-[8px] font-black uppercase tracking-[0.12em] text-[hsl(var(--band-foreground))]/55">
        {label}
      </span>
    </span>
  );
}
