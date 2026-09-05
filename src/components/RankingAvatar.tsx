import { getInitials } from '@/lib/ranking-display';
import { cn } from '@/lib/utils';
import type { PlayerRanking } from '@/types/ranking';
import { useLanguage } from '@/contexts/LanguageContext';

export function RankingAvatar({ ranking, onAvatarClick, className }: {
  ranking: PlayerRanking;
  onAvatarClick?: (url: string, name: string) => void;
  className?: string;
}) {
  const { language } = useLanguage();
  const image = ranking.avatar_url || ranking.full_avatar_url;
  const fullImage = ranking.full_avatar_url || ranking.avatar_url;
  const content = image ? (
    <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: `${(ranking.avatar_crop_x ?? 0.5) * 100}% ${(ranking.avatar_crop_y ?? 0.5) * 100}%` }} />
  ) : <span className="text-xs font-bold">{getInitials(ranking.player_name)}</span>;
  const classes = cn('inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-foreground', className);
  return fullImage && onAvatarClick ? (
    <button type="button" className={cn(classes, 'transition-opacity hover:opacity-80')} aria-label={language === 'zh' ? `查看 ${ranking.player_name} 的照片` : `View ${ranking.player_name}'s photo`} onClick={() => onAvatarClick(fullImage, ranking.player_name)}>{content}</button>
  ) : <span className={classes} aria-hidden>{content}</span>;
}

export function RankingBadge({ rank }: { rank: number }) {
  return <span className={cn('cs-rank', rank <= 3 && `cs-rank-${rank}`)}>{rank}</span>;
}
