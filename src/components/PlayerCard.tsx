import { ArrowUpRight } from 'lucide-react';
import { getInitials } from '@/lib/ranking-display';
import { useLanguage } from '@/contexts/LanguageContext';
import { RankingBadge } from '@/components/RankingAvatar';
import type { PlayerRanking } from '@/types/ranking';

export function PlayerCard({ ranking, onSelect }: { ranking: PlayerRanking; onSelect: () => void }) {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const image = ranking.avatar_url || ranking.full_avatar_url;
  return (
    <button type="button" onClick={onSelect} className="cs-player-card cs-panel group block w-full min-w-0 overflow-hidden text-left transition-colors hover:border-primary/60" aria-label={isZh ? `${ranking.player_name}，排名 ${ranking.rank}，查看球员数据` : `${ranking.player_name}, rank ${ranking.rank}, view player stats`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {image ? <img src={image} alt="" loading="lazy" className="cs-player-image h-full w-full object-cover" style={{ objectPosition: `${(ranking.avatar_crop_x ?? 0.5) * 100}% ${(ranking.avatar_crop_y ?? 0.35) * 100}%` }} /> : <span className="flex h-full items-center justify-center text-5xl font-bold text-primary/70">{getInitials(ranking.player_name)}</span>}
        <span className="absolute left-3 top-3 rounded-full bg-background/90 p-1"><RankingBadge rank={ranking.rank} /></span>
      </div>
      <div className="p-3 sm:p-5">
        <h2 className="break-words text-base font-bold leading-snug sm:text-lg">{ranking.player_name}</h2>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <span><span className="block text-xs text-muted-foreground">{isZh ? '场次' : 'Played'}</span><span className="mt-1 block text-base font-semibold tabular-nums">{ranking.sessions_played}</span></span>
          <span className="text-right"><span className="block text-xs text-muted-foreground">{isZh ? '积分' : 'Points'}</span><span className="mt-1 block text-xl font-bold tabular-nums text-primary">{ranking.total_points}</span></span>
        </div>
        <span className="mt-4 flex min-h-8 items-center justify-between gap-2 border-t border-border/70 pt-3 text-xs font-medium text-muted-foreground group-hover:text-primary">{isZh ? '球员数据' : 'Player stats'}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden /></span>
      </div>
    </button>
  );
}
