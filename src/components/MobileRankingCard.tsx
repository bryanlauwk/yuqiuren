import { ArrowUp, ArrowDown, Trophy } from 'lucide-react';
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

  const getCardStyles = () => {
    switch (ranking.rank) {
      case 1:
        return 'rank-row-gold border-rank-gold/50 shadow-[0_0_20px_rgba(255,215,0,0.15)]';
      case 2:
        return 'rank-row-silver border-rank-silver/50 shadow-[0_0_15px_rgba(192,192,192,0.12)]';
      case 3:
        return 'rank-row-bronze border-rank-bronze/50 shadow-[0_0_15px_rgba(205,127,50,0.12)]';
      default:
        return 'rank-row-default border-border';
    }
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
        return 'rank-badge-default';
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
    
    return null;
  };

  const isTopThree = ranking.rank <= 3;

  return (
    <div 
      className={cn(
        "rounded-lg border p-3 transition-all duration-200",
        getCardStyles(),
        isTopThree && "p-4"
      )}
    >
      {/* Row 1: Identity */}
      <div className="flex items-center gap-3">
        {/* Rank Badge */}
        <div className={cn(
          "flex-shrink-0 flex items-center justify-center rounded-lg font-display font-bold",
          getRankBadgeStyles(),
          isTopThree ? "w-10 h-10 text-lg" : "w-8 h-8 text-sm"
        )}>
          {ranking.rank}
        </div>

        {/* Avatar */}
        <button
          onClick={() => ranking.full_avatar_url && onAvatarClick?.(ranking.full_avatar_url, ranking.player_name)}
          disabled={!ranking.full_avatar_url}
          className={cn(
            "flex-shrink-0 rounded-full overflow-hidden bg-muted border-2 border-border transition-all",
            isTopThree ? "w-12 h-12" : "w-10 h-10",
            ranking.full_avatar_url && "cursor-pointer hover:border-primary hover:scale-105 active:scale-95"
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

        {/* Player Name - Full width, no truncation */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            "font-bold text-foreground",
            isTopThree ? "text-lg" : "text-base"
          )}>
            {ranking.player_name}
          </p>
        </div>

        {/* Rank Change Indicator */}
        {getRankChangeDisplay()}
      </div>

      {/* Row 2: Stats Bar */}
      <div className="flex items-center justify-around mt-3 pt-3 border-t border-border/50">
        {/* Sessions */}
        <div className="text-center flex-1">
          <p className={cn(
            "font-display font-bold text-foreground/80",
            isTopThree ? "text-xl" : "text-lg"
          )}>
            {ranking.sessions_played}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t.ranking.sessions}
          </p>
        </div>

        <span className="text-muted-foreground/50">•</span>

        {/* Wins */}
        <div className="text-center flex-1">
          <div className="flex items-center justify-center gap-1">
            {isTopThree && (
              <Trophy className={cn(
                "w-4 h-4",
                ranking.rank === 1 ? "text-rank-gold" : 
                ranking.rank === 2 ? "text-rank-silver" : 
                "text-rank-bronze"
              )} />
            )}
            <p className={cn(
              "font-display font-bold",
              isTopThree ? "text-xl text-foreground" : "text-lg text-foreground/80"
            )}>
              {ranking.championships}
            </p>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t.ranking.wins}
          </p>
        </div>

        <span className="text-muted-foreground/50">•</span>

        {/* Points - Most prominent */}
        <div className="text-center flex-1">
          <p className={cn(
            "font-display font-bold",
            isTopThree ? "text-2xl" : "text-xl",
            ranking.rank === 1 ? "text-rank-gold" : 
            ranking.rank <= 3 ? "text-foreground" : 
            "text-foreground/90"
          )}>
            {ranking.total_points}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {t.ranking.points}
          </p>
        </div>
      </div>
    </div>
  );
}
