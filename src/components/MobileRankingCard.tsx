import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAveragePoints, getWinRate } from '@/lib/ranking-display';
import { RankDelta } from '@/components/RankDelta';
import { RankingAvatar, RankingBadge } from '@/components/RankingAvatar';
import type { PlayerRanking } from '@/types/ranking';

interface MobileRankingCardProps {
  ranking: PlayerRanking;
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
  primaryMetric?: 'points' | 'winRate';
  showRankDelta?: boolean;
}

export function MobileRankingCard({ ranking, onAvatarClick, primaryMetric = 'points', showRankDelta = true }: MobileRankingCardProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  return (
    <div className={cn('border-b border-border/60 last:border-b-0', ranking.rank === 2 && '-mx-2 rounded-lg bg-primary/[0.07] px-2')}>
      <div className="cs-mobile-row">
        <RankingBadge rank={ranking.rank} />
        <RankingAvatar ranking={ranking} onAvatarClick={onAvatarClick} className="h-9 w-9" />
        <button type="button" className="col-span-3 grid min-h-11 min-w-0 grid-cols-[minmax(0,1fr)_auto_1.25rem] items-center gap-2 text-left" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={detailsId} aria-label={`${ranking.player_name} — ${isZh ? '球员数据' : 'player stats'}`}>
          <span className="min-w-0">
            <span className={cn('block break-words text-sm font-semibold', ranking.rank === 2 && 'text-primary')}>{ranking.player_name}</span>
            <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <span>{ranking.sessions_played} {isZh ? '场' : 'played'}</span>
              {showRankDelta && <RankDelta ranking={ranking} />}
            </span>
          </span>
          <span className="text-right tabular-nums">
            <span className={cn('block text-xl font-bold', ranking.rank === 2 && 'text-primary')}>{primaryMetric === 'winRate' ? `${getWinRate(ranking)}%` : ranking.total_points}</span>
            <span className="block text-xs text-muted-foreground">{primaryMetric === 'winRate' ? (isZh ? '夺冠率' : 'Title %') : (isZh ? '积分' : 'Points')}</span>
          </span>
          <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', expanded && 'rotate-180')} aria-hidden />
        </button>
      </div>
      <div id={detailsId} hidden={!expanded} className="pb-4 pl-1">
        <dl className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3">
          {[
            [isZh ? '出赛场数' : 'Matches played', ranking.sessions_played],
            [isZh ? '冠军次数' : 'Titles won', ranking.championships],
            [isZh ? '夺冠率' : 'Title rate', `${getWinRate(ranking)}%`],
            [isZh ? '场均积分' : 'Points per match', getAveragePoints(ranking)],
          ].map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 text-base font-semibold tabular-nums">{value}</dd></div>)}
        </dl>
      </div>
    </div>
  );
}
