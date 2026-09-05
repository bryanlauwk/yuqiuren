import { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { PlayerCard } from '@/components/PlayerCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { getAveragePoints, getBestChampionshipStreak, getInitials, getWinRate } from '@/lib/ranking-display';
import type { PlayerRanking } from '@/types/ranking';

interface RosterPlayer { ranking: PlayerRanking; bestStreak: number; }

export function RosterSection() {
  const { rankings, sessions, results, loading } = useRankings();
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [selected, setSelected] = useState<RosterPlayer | null>(null);
  const roster = useMemo(() => rankings.map((ranking) => ({ ranking, bestStreak: getBestChampionshipStreak(ranking.player_id, sessions, results) })), [rankings, results, sessions]);
  return (
    <section id="roster" className="cs-shell py-8 sm:py-12" aria-labelledby="roster-title">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div><p className="cs-eyebrow mb-3">2026 · {isZh ? '球队阵容' : 'THE PLAYERS'}</p><h1 id="roster-title" className="cs-title">{isZh ? '我们的球友' : 'Meet the players'}</h1></div>
        <span className="shrink-0 rounded-full border border-border px-3 py-2 text-sm text-muted-foreground">{loading ? '—' : rankings.length} {isZh ? '位球员' : 'players'}</span>
      </div>
      {loading ? <div role="status" className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"><span className="sr-only">{isZh ? '加载球员中' : 'Loading players'}</span>{Array.from({ length: 8 }, (_, index) => <div key={index} className="cs-panel h-72 animate-pulse bg-muted" />)}</div>
        : roster.length === 0 ? <div className="cs-panel py-16 text-center"><Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground" aria-hidden /><p>{isZh ? '暂无球员数据' : 'No player data yet'}</p></div>
        : <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">{roster.map((player) => <PlayerCard key={player.ranking.player_id} ranking={player.ranking} onSelect={() => setSelected(player)} />)}</div>}
      <PlayerDialog player={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function PlayerDialog({ player, onClose }: { player: RosterPlayer | null; onClose: () => void }) {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  if (!player) return null;
  const { ranking, bestStreak } = player;
  const image = ranking.full_avatar_url || ranking.avatar_url;
  const stats = [
    [isZh ? '出赛场数' : 'Matches played', ranking.sessions_played],
    [isZh ? '夺冠率' : 'Title rate', `${getWinRate(ranking)}%`],
    [isZh ? '总积分' : 'Total points', ranking.total_points],
    [isZh ? '联赛排名' : 'League rank', `#${ranking.rank}`],
    [isZh ? '场均积分' : 'Points per match', getAveragePoints(ranking)],
    [isZh ? '最佳连冠' : 'Best title streak', bestStreak],
  ];
  return (
    <Dialog open={!!player} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="courtside max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-xl border-border bg-card p-0 sm:grid-cols-2 sm:gap-0 [&>button]:right-3 [&>button]:top-3 [&>button]:z-10 [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:border [&>button]:border-border [&>button]:bg-background [&>button]:opacity-100">
        <div className="flex min-h-48 items-center justify-center overflow-hidden bg-secondary sm:min-h-full">
          {image ? <img src={image} alt={ranking.player_name} className="max-h-[42dvh] w-full object-contain sm:max-h-[75dvh]" /> : <span className="p-16 text-7xl font-bold text-primary">{getInitials(ranking.player_name)}</span>}
        </div>
        <div className="p-5 sm:pb-8 sm:pt-16">
          <p className="cs-eyebrow mb-3">2026 · YUQIUREN</p>
          <DialogTitle className="break-words text-2xl font-bold leading-tight">{ranking.player_name}</DialogTitle>
          <DialogDescription className="mt-3 text-sm">{isZh ? '本赛季的出场与成绩' : 'Appearances and results this season'}</DialogDescription>
          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">{stats.map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 text-2xl font-bold tabular-nums text-primary">{value}</dd></div>)}</dl>
        </div>
      </DialogContent>
    </Dialog>
  );
}
