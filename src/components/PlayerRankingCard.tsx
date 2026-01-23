import { ArrowUp, ArrowDown } from 'lucide-react';
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
        return 'min-h-[120px] py-6';
      case 2:
      case 3:
        return 'min-h-[100px] py-5';
      default:
        if (rank <= 7) return 'min-h-[80px] py-4';
        return 'min-h-[72px] py-3';
    }
  };

  const getNameSize = () => {
    if (rank <= 3) return 'text-xl sm:text-2xl';
    return 'text-base sm:text-lg';
  };

  const getPointsSize = () => {
    if (rank === 1) return 'text-4xl sm:text-5xl';
    if (rank <= 3) return 'text-3xl sm:text-4xl';
    return 'text-2xl sm:text-3xl';
  };

  const getAvatarSize = () => {
    if (rank <= 3) return 'w-14 h-14 sm:w-16 sm:h-16';
    return 'w-10 h-10 sm:w-12 sm:h-12';
  };

  const getRankBadgeSize = () => {
    if (rank <= 3) return 'w-10 h-10 sm:w-12 sm:h-12 text-lg sm:text-xl';
    return 'w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base';
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
        "flex items-center gap-4 sm:gap-6 px-4 sm:px-6 transition-all duration-200 hover-scale-subtle",
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

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={cn(
            "font-bold text-foreground truncate",
            getNameSize()
          )}>
            {playerName}
          </p>
          {getRankChangeDisplay()}
        </div>
        <p className={cn(
          "text-muted-foreground",
          rank <= 3 ? "text-sm" : "text-xs"
        )}>
          {sessionsPlayed} {t.ranking.sessions} • {championships} {t.ranking.wins}
        </p>
      </div>

      {/* Points */}
      <div className="text-right flex-shrink-0">
        <p className={cn(
          "font-display font-bold",
          getPointsSize(),
          rank === 1 ? "text-rank-gold text-glow-gold" : 
          rank <= 3 ? "text-foreground text-glow-white" : 
          "text-foreground/90"
        )}>
          {totalPoints}
        </p>
        <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
          {t.ranking.points}
        </p>
      </div>
    </div>
  );
}
