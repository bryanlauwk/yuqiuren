import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArenaHero } from '@/components/ArenaHero';
import { PlayerRankingCard } from '@/components/PlayerRankingCard';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy } from 'lucide-react';

export default function RankingPage() {
  const { rankings, loading, hasTopTies } = useRankings();
  const { t } = useLanguage();

  // Lightbox state for viewing avatars
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<{ src: string; alt: string } | null>(null);

  const handleAvatarClick = (avatarUrl: string, playerName: string) => {
    setSelectedAvatar({ src: avatarUrl, alt: playerName });
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <ArenaHero />

      <main className="container py-8 relative z-10 flex-1">
        {/* Rankings Display */}
        {loading ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`bg-card/50 animate-pulse-arena rounded-lg ${
                  i === 0 ? 'h-[120px]' : i <= 2 ? 'h-[100px]' : 'h-[80px]'
                }`}
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
          <div className="space-y-2">
            {/* Tie message if applicable */}
            {hasTopTies && (
              <div className="mb-6 px-4 py-3 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-foreground/80">{t.home.tieMessage}</p>
              </div>
            )}
            
            {/* All rankings in unified list */}
            {rankings.map((ranking, index) => (
              <div 
                key={ranking.player_id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PlayerRankingCard
                  rank={ranking.rank}
                  playerName={ranking.player_name}
                  avatarUrl={ranking.avatar_url}
                  fullAvatarUrl={ranking.full_avatar_url}
                  totalPoints={ranking.total_points}
                  sessionsPlayed={ranking.sessions_played}
                  championships={ranking.championships}
                  rankChange={ranking.rank_change}
                  avatarCropX={ranking.avatar_crop_x}
                  avatarCropY={ranking.avatar_crop_y}
                  onAvatarClick={handleAvatarClick}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Avatar Lightbox */}
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
