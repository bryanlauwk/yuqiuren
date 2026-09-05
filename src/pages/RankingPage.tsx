import { useMemo, useState } from 'react';
import { Search, Trophy, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArenaHero } from '@/components/ArenaHero';
import { MobileRankingCard } from '@/components/MobileRankingCard';
import { DesktopRankingTable } from '@/components/DesktopRankingTable';
import { LatestSessionCard } from '@/components/LatestSessionCard';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { buildRecentRankings, buildWinRateRankings, type RankingView } from '@/lib/ranking-views';
import { formatSessionDate } from '@/lib/session-date';

export default function RankingPage() {
  const { rankings, loading, sessions, results } = useRankings();
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [selectedAvatar, setSelectedAvatar] = useState<{ src: string; alt: string } | null>(null);
  const [rankingView, setRankingView] = useState<RankingView>('overall');
  const [search, setSearch] = useState('');
  const recentRankings = useMemo(() => buildRecentRankings(rankings, sessions, results), [rankings, results, sessions]);
  const winRateRankings = useMemo(() => buildWinRateRankings(rankings), [rankings]);
  const viewRankings = rankingView === 'recent5' ? recentRankings : rankingView === 'winRate' ? winRateRankings : rankings;
  const filteredRankings = viewRankings.filter((r) => r.player_name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  const primaryMetric = rankingView === 'winRate' ? 'winRate' : 'points';
  const handleAvatarClick = (src: string, alt: string) => setSelectedAvatar({ src, alt });
  const views: { value: RankingView; label: string }[] = [
    { value: 'overall', label: isZh ? '总榜' : 'Overall' },
    { value: 'recent5', label: isZh ? '最近5场' : 'Last 5' },
    { value: 'winRate', label: isZh ? '夺冠率' : 'Title rate' },
  ];

  return (
    <div className="courtside cs-page">
      <Header />
      <main id="main-content" className="flex-1">
        <ArenaHero />
        <div id="rankings-anchor" className="cs-shell cs-home-grid mb-10 space-y-6 scroll-mt-24 lg:space-y-0">
          <section className="cs-panel min-w-0 p-3 sm:p-5" aria-label={isZh ? '联赛排行榜' : 'League rankings'}>
            <Tabs value={rankingView} onValueChange={(value) => setRankingView(value as RankingView)}>
              <div className="flex flex-wrap items-center gap-3">
                <TabsList className="grid h-auto min-w-0 flex-1 grid-cols-3 gap-1.5 bg-transparent p-0" aria-label={isZh ? '排行榜视图' : 'Ranking views'}>
                  {views.map((view) => <TabsTrigger key={view.value} value={view.value} className="min-h-11 min-w-0 whitespace-normal rounded-lg border border-border/60 bg-secondary px-2 text-sm font-semibold leading-5 text-muted-foreground data-[state=active]:border-accent data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none">{view.label}</TabsTrigger>)}
                </TabsList>
                <div className="relative w-full sm:w-44">
                  <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden />
                  <Input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={isZh ? '找球员' : 'Find a player'} aria-label={isZh ? '查找球员' : 'Find a player'} className="h-11 rounded-lg border-border/70 bg-secondary/60 pl-9 pr-9 text-base [&::-webkit-search-cancel-button]:appearance-none" />
                  {search && <button type="button" onClick={() => setSearch('')} className="absolute right-0 top-0 flex h-11 w-9 items-center justify-center text-muted-foreground" aria-label={isZh ? '清除搜索' : 'Clear search'}><X className="h-4 w-4" /></button>}
                </div>
              </div>
              <p className="mb-1 mt-4 min-h-5 text-xs leading-relaxed text-muted-foreground">
                {rankingView === 'recent5'
                  ? (isZh ? '统计联赛最近 5 次活动的成绩。' : 'Results from the league’s latest 5 sessions.')
                  : rankingView === 'winRate'
                    ? (isZh ? '夺冠次数 ÷ 参与场次；请同时参考出场次数。' : 'Session titles ÷ sessions played. Consider the number played, too.')
                    : sessions[0] ? `${isZh ? '最近更新至' : 'Results through'} ${formatSessionDate(sessions[0].session_date, language)}` : (isZh ? '2026 赛季' : '2026 season')}
              </p>
              <TabsContent value={rankingView} className="mt-2">
                {loading ? (
                  <div role="status" className="space-y-3 py-3"><span className="sr-only">{isZh ? '正在加载积分榜' : 'Loading standings'}</span>{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-16 animate-pulse rounded-lg bg-muted/60" />)}</div>
                ) : rankings.length === 0 ? (
                  <div className="py-16 text-center"><Trophy className="mx-auto mb-4 h-9 w-9 text-muted-foreground" aria-hidden /><p className="font-semibold">{isZh ? '暂无比赛数据' : 'No results yet'}</p><p className="mt-2 text-sm text-muted-foreground">{isZh ? '记录第一场活动后，积分榜会显示在这里。' : 'Standings will appear after the first session is recorded.'}</p></div>
                ) : filteredRankings.length === 0 ? (
                  <div role="status" className="py-14 text-center"><p className="font-semibold">{isZh ? '找不到这位球员' : 'No player found'}</p><button type="button" className="mt-3 min-h-11 text-sm text-primary underline underline-offset-4" onClick={() => setSearch('')}>{isZh ? '查看所有球员' : 'Show all players'}</button></div>
                ) : (
                  <>
                    <div className="hidden md:block"><DesktopRankingTable rankings={filteredRankings} onAvatarClick={handleAvatarClick} primaryMetric={primaryMetric} showRankDelta={rankingView === 'overall'} /></div>
                    <div className="md:hidden">
                      <div className="flex justify-between border-b border-border pb-2 pt-1 text-xs text-muted-foreground"><span>{isZh ? '排名 / 球员' : 'Rank / Player'}</span><span className="pr-7">{primaryMetric === 'winRate' ? (isZh ? '夺冠率' : 'Title rate') : (isZh ? '积分' : 'Points')}</span></div>
                      {filteredRankings.map((ranking) => <MobileRankingCard key={ranking.player_id} ranking={ranking} onAvatarClick={handleAvatarClick} primaryMetric={primaryMetric} showRankDelta={rankingView === 'overall'} />)}
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
            {search && filteredRankings.length > 0 && <p role="status" className="mt-3 text-xs text-muted-foreground">{filteredRankings.length} {isZh ? '位球员 · 保留榜单原排名' : 'players · original ranks retained'}</p>}
          </section>
          <LatestSessionCard />
        </div>
      </main>
      <Footer />
      <PhotoLightbox images={selectedAvatar ? [selectedAvatar] : []} currentIndex={0} open={!!selectedAvatar} onClose={() => setSelectedAvatar(null)} />
    </div>
  );
}
