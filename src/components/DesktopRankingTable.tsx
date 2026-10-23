import { Fragment, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PlayerPointsBreakdown } from '@/components/PlayerPointsBreakdown';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWinRate } from '@/lib/ranking-display';
import { RankDelta } from '@/components/RankDelta';
import { RankingAvatar, RankingBadge } from '@/components/RankingAvatar';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { PlayerRanking } from '@/types/ranking';

interface DesktopRankingTableProps {
  rankings: PlayerRanking[];
  onAvatarClick?: (avatarUrl: string, playerName: string) => void;
  primaryMetric?: 'points' | 'winRate';
  showRankDelta?: boolean;
}

export function DesktopRankingTable({ rankings, onAvatarClick, primaryMetric = 'points', showRankDelta = true }: DesktopRankingTableProps) {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <Table className="cs-standings">
      <TableCaption className="sr-only">{isZh ? '联赛积分榜' : 'League standings'}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">{isZh ? '排名' : 'Rank'}</TableHead>
          <TableHead scope="col">{isZh ? '球员' : 'Player'}</TableHead>
          <TableHead scope="col">{isZh ? '出赛' : 'Played'}</TableHead>
          <TableHead scope="col">{isZh ? '冠军' : 'Titles'}</TableHead>
          <TableHead scope="col" aria-sort={primaryMetric === 'winRate' ? 'descending' : undefined}>{isZh ? '夺冠率' : 'Title %'}</TableHead>
          <TableHead scope="col" aria-sort={primaryMetric === 'points' ? 'descending' : undefined}>{isZh ? '积分' : 'Points'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rankings.map((ranking) => (
          <Fragment key={ranking.player_id}>
          <TableRow className={cn('cursor-pointer', ranking.rank === 2 && 'bg-primary/[0.07]')} onClick={() => setOpenId(openId === ranking.player_id ? null : ranking.player_id)} aria-expanded={openId === ranking.player_id}>
            <TableCell><RankingBadge rank={ranking.rank} /></TableCell>
            <TableCell>
              <div className="flex min-w-0 items-center gap-3">
                <RankingAvatar ranking={ranking} onAvatarClick={onAvatarClick} />
                <div className="min-w-0">
                  <span className={cn('block break-words text-sm font-semibold', ranking.rank === 2 && 'text-primary')}>{ranking.player_name}</span>
                  {showRankDelta && <span className="mt-1 flex"><RankDelta ranking={ranking} /></span>}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">{ranking.sessions_played}</TableCell>
            <TableCell className="text-muted-foreground">{ranking.championships}</TableCell>
            <TableCell><span className={cn(primaryMetric === 'winRate' ? 'text-xl font-bold text-primary' : 'text-muted-foreground')}>{getWinRate(ranking)}%</span></TableCell>
            <TableCell><span className={cn('text-xl font-bold', primaryMetric === 'points' && ranking.rank === 1 && 'dark:text-accent', ranking.rank === 2 && 'text-primary')}>{ranking.total_points}</span><ChevronDown className={cn('ml-2 inline h-4 w-4 text-muted-foreground transition-transform', openId === ranking.player_id && 'rotate-180')} aria-hidden /></TableCell>
          </TableRow>
          {openId === ranking.player_id && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6} className="bg-muted/30"><PlayerPointsBreakdown playerId={ranking.player_id} /></TableCell>
            </TableRow>
          )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
