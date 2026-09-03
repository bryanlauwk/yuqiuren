import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArenaHero } from '@/components/ArenaHero';
import { MobileRankingCard } from '@/components/MobileRankingCard';
import { DesktopRankingTable } from '@/components/DesktopRankingTable';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Trophy } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';


export default function RankingPage() {
  const { rankings, loading } = useRankings();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<{ src: string; alt: string } | null>(null);



  const handleAvatarClick = (avatarUrl: string, playerName: string) => {
    setSelectedAvatar({ src: avatarUrl, alt: playerName });
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <Header />
      
      <ArenaHero />

      <main id="rankings-anchor" className="container relative z-10 flex-1 py-12 scroll-mt-28 sm:py-16">
        <Reveal>
          <SectionHeading
            kicker="LEAGUE TABLE · 2026 SEASON"
            title={language === 'zh' ? '联赛积分榜' : 'League Standings'}
            className="mb-8 border-b-2 border-foreground pb-5"
          />
          {loading ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-card/50 animate-pulse-arena rounded h-[74px] mx-auto w-full max-w-3xl"
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
                <div className="sticky top-[97px] z-20 -mx-4 px-4 py-2 bg-background/95 backdrop-blur border-b-2 border-foreground flex items-center gap-3">
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
                  rankings={rankings}
                  onAvatarClick={handleAvatarClick}
                />
              </div>
            )}
          </>
          )}
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
