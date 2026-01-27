import { ArrowUp, ArrowDown, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PlayerRankingCardProps {
  rank: number;
  playerName: string;
  avatarUrl?: string | null;
  fullAvatarUrl?: string | null;
  totalPoints: number;
  sessionsPlayed: number;
  championships: number;
  rankChange: number;
  avatarCropX?: number | null;
  avatarCropY?: number | null;
  onAvatarClick?: (url: string, name: string) => void;
  style?: React.CSSProperties;
}

export function PlayerRankingCard({
  rank,
  playerName,
  avatarUrl,
  fullAvatarUrl,
  totalPoints,
  sessionsPlayed,
  championships,
  rankChange,
  avatarCropX,
  avatarCropY,
  onAvatarClick,
  style,
}: PlayerRankingCardProps) {
  const { t } = useLanguage();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRowStyles = () => {
    switch (rank) {
      case 1:
        return 'rank-row-gold glow-gold';
      case 2:
        return 'rank-row-silver glow-silver';
      case 3:
        return 'rank-row-bronze glow-bronze';
      default:
        return 'rank-row-default';
    }
  };

  const getRankBadgeStyles = () => {
    switch (rank) {
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

  const getRowHeight = () => {
    switch (rank) {
      case 1:
        return 'min-h-[88px] sm:min-h-[100px] py-4 sm:py-5';
      case 2:
      case 3:
        return 'min-h-[80px] sm:min-h-[88px] py-3 sm:py-4';
      default:
        if (rank <= 7) return 'min-h-[64px] sm:min-h-[72px] py-2.5 sm:py-3';
        return 'min-h-[56px] sm:min-h-[64px] py-2 sm:py-2.5';
    }
  };

  const getNameSize = () => {
    if (rank <= 3) return 'text-base sm:text-xl';
    return 'text-sm sm:text-lg';
  };

  const getPointsSize = () => {
    if (rank === 1) return 'text-2xl sm:text-4xl';
    if (rank <= 3) return 'text-xl sm:text-3xl';
    return 'text-lg sm:text-2xl';
  };

  const getStatSize = () => {
    if (rank <= 3) return 'text-base sm:text-xl';
    return 'text-sm sm:text-lg';
  };

  const getAvatarSize = () => {
    if (rank <= 3) return 'w-10 h-10 sm:w-14 sm:h-14';
    return 'w-8 h-8 sm:w-11 sm:h-11';
  };

  const getRankBadgeSize = () => {
    if (rank <= 3) return 'w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-lg';
    return 'w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm';
  };

  const getStatsGap = () => {
    if (rank <= 3) return 'gap-3 sm:gap-8';
    return 'gap-2 sm:gap-6';
  };

  const getRankChangeDisplay = () => {
    if (rankChange > 0) {
      return (
        <div className="flex items-center gap-0.5 text-finished">
          <ArrowUp className="w-3 h-3" />
          <span className="text-xs font-medium">{rankChange}</span>
        </div>
      );
    }
    
    if (rankChange < 0) {
      return (
        <div className="flex items-center gap-0.5 text-destructive">
          <ArrowDown className="w-3 h-3" />
          <span className="text-xs font-medium">{Math.abs(rankChange)}</span>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-2 sm:gap-6 px-3 sm:px-6 transition-all duration-200 hover-scale-subtle",
        getRowStyles(),
        getRowHeight(),
        rank <= 3 && "hover:glow-gold"
      )}
      style={style}
    >
      {/* Rank Badge */}
      <div className={cn(
        "flex-shrink-0 flex items-center justify-center rounded-lg font-display font-bold",
        getRankBadgeStyles(),
        getRankBadgeSize()
      )}>
        {rank}
      </div>

      {/* Avatar */}
      <button
        onClick={() => fullAvatarUrl && onAvatarClick?.(fullAvatarUrl, playerName)}
        disabled={!fullAvatarUrl}
        className={cn(
          "flex-shrink-0 rounded-full overflow-hidden bg-muted border-2 border-border transition-all",
          getAvatarSize(),
          fullAvatarUrl && "cursor-pointer hover:border-primary hover:scale-105"
        )}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={playerName}
            className="w-full h-full object-cover"
            style={{
              objectPosition: avatarCropX !== null && avatarCropY !== null
                ? `${(avatarCropX ?? 0.5) * 100}% ${(avatarCropY ?? 0.5) * 100}%`
                : 'center'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
            {getInitials(playerName)}
          </div>
        )}
      </button>

      {/* Player Name */}
      <div className="min-w-0 flex-1 sm:flex-initial sm:flex-shrink">
        <div className="flex items-center gap-1 sm:gap-2">
          <p className={cn(
            "font-bold text-foreground truncate",
            getNameSize()
          )}>
            {playerName}
          </p>
          {getRankChangeDisplay()}
        </div>
      </div>

      {/* Spacer - hidden on mobile */}
      <div className="hidden sm:block sm:flex-1 sm:min-w-0" />

      {/* Stats Grid */}
      <div className={cn("flex items-center flex-shrink-0", getStatsGap())}>
        {/* Sessions - hidden on very small screens for lower ranks */}
        <div className={cn(
          "text-center min-w-[28px] sm:min-w-[50px]",
          rank > 3 && "hidden xs:block"
        )}>
          <p className={cn(
            "font-display font-bold text-foreground/80",
            getStatSize()
          )}>
            {sessionsPlayed}
          </p>
          <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">
            {t.ranking.sessions}
          </p>
        </div>

        {/* Divider */}
        <div className={cn(
          "w-px h-6 sm:h-10 bg-border/50",
          rank > 3 && "hidden xs:block"
        )} />

        {/* Wins */}
        <div className="text-center min-w-[28px] sm:min-w-[40px]">
          <div className="flex items-center justify-center gap-0.5 sm:gap-1">
            {rank <= 3 && (
              <Trophy className={cn(
                "w-3.5 h-3.5 sm:w-5 sm:h-5",
                rank === 1 ? "text-rank-gold" : 
                rank === 2 ? "text-rank-silver" : 
                "text-rank-bronze"
              )} />
            )}
            <p className={cn(
              "font-display font-bold",
              getStatSize(),
              rank <= 3 ? "text-foreground" : "text-foreground/80"
            )}>
              {championships}
            </p>
          </div>
          <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">
            {t.ranking.wins}
          </p>
        </div>

        {/* Divider */}
        <div className="w-px h-6 sm:h-10 bg-border/50" />

        {/* Points (most prominent) */}
        <div className="text-center min-w-[40px] sm:min-w-[70px]">
          <p className={cn(
            "font-display font-bold",
            getPointsSize(),
            rank === 1 ? "text-rank-gold text-glow-gold" : 
            rank <= 3 ? "text-foreground text-glow-white" : 
            "text-foreground/90"
          )}>
            {totalPoints}
          </p>
          <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">
            {t.ranking.points}
          </p>
        </div>
      </div>
    </div>
  );
}
