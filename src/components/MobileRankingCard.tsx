import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PlayerRanking } from '@/types/ranking';

interface MobileRankingCardProps {
  ranking: PlayerRanking;
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
}

export function MobileRankingCard({ ranking, onAvatarClick }: MobileRankingCardProps) {
  const { t } = useLanguage();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isTopThree = ranking.rank <= 3;

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

  return (
    <div
      className={cn(
        "rounded bg-card border-2 border-foreground p-4 transition-transform duration-150",
        "shadow-[4px_4px_0_0_hsl(var(--foreground))]",
        isTopThree && "border-l-[8px] border-l-primary p-5"
      )}
    >
      {/* Row 1: Identity */}
      <div className="flex items-center gap-3">
        {isTopThree ? (
          <div className="flex-shrink-0 flex items-center justify-center bg-primary border-2 border-foreground rounded font-display text-foreground w-11 h-11 text-xl">
            {ranking.rank}
          </div>
        ) : (
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-foreground rounded bg-muted">
            <span className="text-base font-display text-foreground">{ranking.rank}</span>
          </div>
        )}

        <button
          onClick={() => ranking.full_avatar_url && onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)}
          disabled={!ranking.full_avatar_url}
          className={cn(
            "flex-shrink-0 rounded overflow-hidden bg-muted border-2 border-foreground transition-all",
            isTopThree ? "w-12 h-12" : "w-10 h-10",
            ranking.full_avatar_url && "cursor-pointer hover:-translate-y-0.5 active:scale-95"
          )}
        >
          {ranking.avatar_url ? (
            <img
              src={ranking.avatar_url}
              alt={ranking.player_name}
              className="w-full h-full object-cover"
              style={{
                objectPosition: ranking.avatar_crop_x !== null && ranking.avatar_crop_y !== null
                  ? `${(ranking.avatar_crop_x ?? 0.5) * 100}% ${(ranking.avatar_crop_y ?? 0.5) * 100}%`
                  : 'center'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-foreground text-sm font-black">
              {getInitials(ranking.player_name)}
            </div>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className={cn(
            "font-display text-foreground tracking-tight truncate",
            isTopThree ? "text-xl" : "text-lg"
          )}>
            {ranking.player_name}
          </p>
        </div>

        {getRankChangeDisplay()}
      </div>

      {/* Row 2: Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t-2 border-foreground/10">
        <div className="text-center bg-muted rounded border-2 border-foreground py-2">
          <p className={cn("font-display text-foreground", isTopThree ? "text-xl" : "text-lg")}>
            {ranking.sessions_played}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
            {t.ranking.sessions}
          </p>
        </div>

        <div className="text-center bg-muted rounded border-2 border-foreground py-2">
          <p className={cn("font-display text-foreground", isTopThree ? "text-xl" : "text-lg")}>
            {ranking.championships}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
            {t.ranking.wins}
          </p>
        </div>

        <div className={cn(
          "text-center rounded border-2 border-foreground py-2",
          ranking.rank === 1 ? "bg-primary" : "bg-foreground text-background"
        )}>
          <p className={cn(
            "font-display",
            ranking.rank === 1 ? "text-foreground" : "text-background",
            isTopThree ? "text-2xl" : "text-xl"
          )}>
            {ranking.total_points}
          </p>
          <p className={cn(
            "text-[10px] font-bold uppercase tracking-wider",
            ranking.rank === 1 ? "text-foreground/70" : "text-background/70"
          )}>
            {t.ranking.points}
          </p>
        </div>
      </div>
    </div>
  );
}
