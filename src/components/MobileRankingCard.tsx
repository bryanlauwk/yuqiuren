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

  const getRankBadgeStyles = () => {
    switch (ranking.rank) {
      case 1:
        return 'rank-badge-gold';
      case 2:
        return 'rank-badge-silver';
      case 3:
        return 'rank-badge-bronze';
      default:
        return null;
    }
  };

  const getRankChangeDisplay = () => {
    if (ranking.rank_change > 0) {
      return (
        <div className="flex items-center gap-0.5 text-finished">
          <ArrowUp className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{ranking.rank_change}</span>
        </div>
      );
    }
    if (ranking.rank_change < 0) {
      return (
        <div className="flex items-center gap-0.5 text-destructive">
          <ArrowDown className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{Math.abs(ranking.rank_change)}</span>
        </div>
      );
    }
    if (!ranking.is_new) {
      return (
        <div className="flex items-center text-muted-foreground">
          <Minus className="w-3.5 h-3.5" />
        </div>
      );
    }
    return null;
  };

  const isTopThree = ranking.rank <= 3;
  const badgeStyle = getRankBadgeStyles();

  return (
    <div 
      className={cn(
        "rounded-2xl bg-card p-4 transition-shadow duration-200",
        isTopThree ? "shadow-md p-5" : "shadow-sm hover:shadow-md"
      )}
    >
      {/* Row 1: Identity */}
      <div className="flex items-center gap-3">
        {badgeStyle ? (
          <div className={cn(
            "flex-shrink-0 flex items-center justify-center rounded-full font-display font-bold",
            badgeStyle,
            isTopThree ? "w-10 h-10 text-lg" : "w-8 h-8 text-sm"
          )}>
            {ranking.rank}
          </div>
        ) : (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">{ranking.rank}</span>
          </div>
        )}

        <button
          onClick={() => ranking.full_avatar_url && onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)}
          disabled={!ranking.full_avatar_url}
          className={cn(
            "flex-shrink-0 rounded-full overflow-hidden bg-muted border border-border/50 transition-all",
            isTopThree ? "w-12 h-12" : "w-10 h-10",
            ranking.full_avatar_url && "cursor-pointer hover:ring-2 hover:ring-primary/30 active:scale-95"
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
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
              {getInitials(ranking.player_name)}
            </div>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p className={cn(
            "font-bold text-foreground",
            isTopThree ? "text-lg" : "text-base"
          )}>
            {ranking.player_name}
          </p>
        </div>

        {getRankChangeDisplay()}
      </div>

      {/* Row 2: Stats */}
      <div className="grid grid-cols-3 gap-4 mt-3 pt-3">
        <div className="text-center">
          <p className={cn(
            "font-display font-bold text-foreground/60",
            isTopThree ? "text-lg" : "text-base"
          )}>
            {ranking.sessions_played}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-foreground/50">
            {t.ranking.sessions}
          </p>
        </div>

        <div className="text-center">
          <p className={cn(
            "font-display font-bold text-foreground/60",
            isTopThree ? "text-lg" : "text-base"
          )}>
            {ranking.championships}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-foreground/50">
            {t.ranking.wins}
          </p>
        </div>

        <div className="text-center">
          <p className={cn(
            "font-display font-bold text-foreground",
            isTopThree ? "text-xl" : "text-lg"
          )}>
            {ranking.total_points}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-foreground/50">
            {t.ranking.points}
          </p>
        </div>
      </div>
    </div>
  );
}
