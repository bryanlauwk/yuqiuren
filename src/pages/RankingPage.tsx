import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RankingRow } from '@/components/RankingRow';
import { Podium } from '@/components/Podium';
import { NextMatchCountdown } from '@/components/NextMatchCountdown';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Users, Clock, MapPin } from 'lucide-react';
import heroBackground from '@/assets/hero-background.png';

export default function RankingPage() {
  const { rankings, loading, hasTopTies } = useRankings();
  const { t } = useLanguage();

  // Get rankings for positions 4+ (only used when podium is shown)
  const restOfRankings = rankings.slice(3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container py-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-8 card-shadow-elevated">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBackground})` }}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 text-center min-h-[140px] flex flex-col justify-center">
            <h1 className="text-2xl sm:text-4xl font-display tracking-tight text-primary-foreground mb-2 drop-shadow-lg">
              {t.home.heroTitle}
            </h1>
            <p className="text-primary-foreground/90 text-sm sm:text-base drop-shadow">
              {t.home.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4 card-shadow hover-lift">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide font-medium">{t.home.totalPlayers}</span>
            </div>
            <p className="text-3xl font-display text-foreground">{rankings.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 card-shadow hover-lift">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide font-medium">{t.home.nextMatch}</span>
            </div>
            <NextMatchCountdown />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 card-shadow hover-lift">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide font-medium">{t.home.venue}</span>
            </div>
            <p className="text-lg font-display text-foreground leading-tight">
              One Shamelin Badminton Hall
            </p>
          </div>
        </div>

        {/* Rankings Display */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-card rounded-xl border border-border animate-pulse" />
            ))}
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-display text-xl text-foreground">{t.home.noPlayers}</p>
            <p className="text-sm">{t.home.addPlayersHint}</p>
          </div>
        ) : hasTopTies ? (
          /* No clear podium - show all players in list */
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
              <span className="text-sm text-foreground">
                {t.home.tieMessage}
              </span>
            </div>
            {rankings.map((ranking) => (
              <RankingRow key={ranking.player_id} ranking={ranking} />
            ))}
          </div>
        ) : (
          <>
            {/* Podium for Top 3 */}
            <Podium rankings={rankings} />

            {/* Rest of Rankings (4+) */}
            {restOfRankings.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm text-muted-foreground uppercase tracking-wide font-medium mb-3">
                  {t.home.otherPlayers}
                </h3>
                {restOfRankings.map((ranking) => (
                  <RankingRow key={ranking.player_id} ranking={ranking} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
