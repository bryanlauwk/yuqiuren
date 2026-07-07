import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArenaHero } from '@/components/ArenaHero';

import { MobileRankingCard } from '@/components/MobileRankingCard';
import { DesktopRankingTable, type RankingDensity } from '@/components/DesktopRankingTable';

import { PhotoLightbox } from '@/components/PhotoLightbox';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Trophy } from 'lucide-react';

export default function RankingPage() {
  const { rankings, sessions, players, loading, hasTopTies } = useRankings();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<{ src: string; alt: string } | null>(null);

  const handleAvatarClick = (avatarUrl: string, playerName: string) => {
    setSelectedAvatar({ src: avatarUrl, alt: playerName });
    setLightboxOpen(true);
  };

  const leader = rankings[0];

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <Header />
      
      <ArenaHero />

      <div id="rankings-anchor" className="container pt-12 pb-2">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="font-display text-xs sm:text-sm tracking-[0.2em] text-foreground whitespace-nowrap">
            ▪ {language === 'zh' ? '实时排行 · 2026' : 'LIVE STANDINGS · 2026'}
          </span>
          <div className="flex-1 min-w-[40px] h-[2px] bg-foreground" />
          {!loading && rankings.length > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="font-display text-[10px] sm:text-xs tracking-wider px-2 py-1 border-2 border-foreground rounded bg-background text-foreground">
                {players.length}{language === 'zh' ? ' 人' : ' P'}
              </span>
              <span className="font-display text-[10px] sm:text-xs tracking-wider px-2 py-1 border-2 border-foreground rounded bg-background text-foreground">
                {sessions.length}{language === 'zh' ? ' 场' : ' S'}
              </span>
              {leader && (
                <span className="font-display text-[10px] sm:text-xs tracking-wider px-2 py-1 border-2 border-foreground rounded bg-accent text-accent-foreground max-w-[160px] truncate">
                  #1 {leader.player_name}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <main className="container mt-6 relative z-10 flex-1 pb-12">
        {loading ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-card/50 animate-pulse-arena rounded h-[52px]"
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
              <div className="space-y-4">
                {rankings.map((ranking, index) => (
                  <div 
                    key={ranking.player_id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <MobileRankingCard
                      ranking={ranking}
                      onAvatarClick={handleAvatarClick}
                    />
                  </div>
                ))}
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
