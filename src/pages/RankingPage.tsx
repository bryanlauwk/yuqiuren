import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArenaHero } from '@/components/ArenaHero';
import { MobileRankingCard } from '@/components/MobileRankingCard';
import { DesktopRankingTable } from '@/components/DesktopRankingTable';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, CalendarDays, Trophy } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { buildRecentRankings, buildWinRateRankings, type RankingView } from '@/lib/ranking-views';
import { cn } from '@/lib/utils';


export default function RankingPage() {
  const { rankings, loading, sessions, results } = useRankings();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<{ src: string; alt: string } | null>(null);
  const [rankingView, setRankingView] = useState<RankingView>('overall');

  const recentRankings = useMemo(
    () => buildRecentRankings(rankings, sessions, results),
    [rankings, results, sessions],
  );
  const winRateRankings = useMemo(() => buildWinRateRankings(rankings), [rankings]);
  const desktopRankings =
    rankingView === 'recent5'
      ? recentRankings
      : rankingView === 'winRate'
      ? winRateRankings
      : rankings;

  const latestSession = sessions[0];
  const latestSessionDate = latestSession
    ? new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-MY', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(`${latestSession.session_date}T00:00:00Z`))
    : null;

  const viewOptions: Array<{ value: RankingView; label: string }> = [
    { value: 'overall', label: language === 'zh' ? '总榜' : 'Overall' },
    { value: 'recent5', label: language === 'zh' ? '最近5场' : 'Last 5' },
    { value: 'winRate', label: language === 'zh' ? '胜率榜' : 'Win rate' },
  ];

  const handleAvatarClick = (avatarUrl: string, playerName: string) => {
    setSelectedAvatar({ src: avatarUrl, alt: playerName });
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background court-texture flex flex-col relative">
      <Header />
      
      <ArenaHero />

      <main id="rankings-anchor" className="container relative z-10 flex-1 py-10 scroll-mt-28 sm:py-14">
        <Reveal>
          <div className="mx-auto w-full max-w-5xl">
          <SectionHeading
            variant="bar"
            kicker="2026 SEASON · LEAGUE TABLE"
            title={language === 'zh' ? '联赛积分榜' : 'League Standings'}
            className="mb-3"
            action={
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.16em] text-background/70">
                {language === 'zh' ? `共 ${rankings.length} 位球员` : `${rankings.length} PLAYERS`}
              </span>
            }
          />

          {/* Unified control row — same on mobile / tablet / desktop */}
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <div
                className="inline-flex flex-1 overflow-hidden rounded border border-border bg-card md:flex-none"
                role="group"
                aria-label={language === 'zh' ? '排行榜视图' : 'Ranking view'}
              >
                {viewOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={rankingView === option.value}
                    onClick={() => setRankingView(option.value)}
                    className={cn(
                      'min-h-11 flex-1 border-r border-border px-3 font-sans text-[11px] font-black uppercase tracking-[0.08em] transition-colors last:border-r-0 md:flex-none md:px-4',
                      rankingView === option.value
                        ? 'bg-foreground text-background'
                        : 'bg-card text-foreground hover:bg-muted',
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <Link
                to="/history"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded border border-border bg-card px-3 font-sans text-[11px] font-black uppercase tracking-[0.08em] text-foreground transition-colors hover:border-foreground hover:bg-muted md:px-4"
              >
                {language === 'zh' ? '赛事纪录' : 'Matches'}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" aria-hidden />
              <span className="font-sans text-[11px] font-bold tracking-wide">
                {latestSessionDate
                  ? language === 'zh'
                    ? `最新赛事：${latestSessionDate}`
                    : `Latest match: ${latestSessionDate}`
                  : language === 'zh'
                  ? '暂无赛事'
                  : 'No matches yet'}
              </span>
            </div>
          </div>


          {loading ? (
          <div className="space-y-1.5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-card/50 animate-pulse-arena rounded h-[68px] w-full"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-xl font-display text-foreground mb-2">{t.home.noPlayers}</p>
            <p className="text-sm text-muted-foreground">{t.home.addPlayersHint}</p>
          </div>
        ) : (
          <>
            {isMobile ? (
              <div>
                {/* Sticky column legend — never lose track of what you're reading */}
                <div className="sticky top-[101px] z-20 -mx-4 px-4 py-2 bg-background/95 backdrop-blur border-b-2 border-foreground flex items-center gap-3">
                  <span className="w-12 text-[10px] font-black uppercase tracking-wider text-foreground/50">
                    #
                  </span>
                  <span className="flex-1 text-[10px] font-black uppercase tracking-wider text-foreground/50">
                    {t.ranking.player}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-foreground/50">
                    {t.ranking.points}
                  </span>
                  <span className="w-5" />
                </div>

                <div className="space-y-3 pt-3">
                  {rankings.map((ranking, index) => (
                    <div
                      key={ranking.player_id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <MobileRankingCard
                        ranking={ranking}
                        maxPoints={Math.max(rankings[0]?.total_points ?? 0, 1)}
                        onAvatarClick={handleAvatarClick}
                      />
                    </div>
                  ))}
                </div>
              </div>

            ) : (
              <div className="animate-fade-in-up">
                <DesktopRankingTable
                  rankings={desktopRankings}
                  onAvatarClick={handleAvatarClick}
                  primaryMetric={rankingView === 'winRate' ? 'winRate' : 'points'}
                  showRankDelta={rankingView === 'overall'}
                />
              </div>
            )}
          </>
          )}
          </div>
        </Reveal>
      </main>

      <Footer />

      <PhotoLightbox
        images={selectedAvatar ? [selectedAvatar] : []}
        currentIndex={0}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={() => {}}
      />
    </div>
  );
}
