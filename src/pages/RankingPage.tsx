import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RankingRow } from '@/components/RankingRow';
import { Podium } from '@/components/Podium';
import { NextMatchCountdown } from '@/components/NextMatchCountdown';
import { Confetti } from '@/components/Confetti';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trophy, Users, Clock, MapPin, Sparkles, Star } from 'lucide-react';
import heroBackground from '@/assets/hero-background.png';

export default function RankingPage() {
  const { rankings, loading, hasTopTies } = useRankings();
  const { t } = useLanguage();

  // Get rankings for positions 4+ (only used when podium is shown)
  const restOfRankings = rankings.slice(3);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Confetti celebration on load */}
      <Confetti />
      
      {/* Decorative doodle elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-20 left-10 w-16 h-16 text-primary/20 animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="absolute top-40 right-16 w-12 h-12 text-accent/30 animate-float-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="50" cy="50" r="40" strokeDasharray="10 5"/>
        </svg>
        <svg className="absolute bottom-32 left-20 w-20 h-8 text-primary/15 animate-wiggle-subtle" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0 10 Q25 0, 50 10 T100 10" strokeLinecap="round"/>
        </svg>
        <svg className="absolute top-1/3 right-8 w-8 h-8 text-rank-gold/30 animate-sparkle" viewBox="0 0 50 50" fill="currentColor">
          <polygon points="25,5 30,20 45,20 33,30 38,45 25,35 12,45 17,30 5,20 20,20"/>
        </svg>
        <svg className="absolute bottom-48 right-32 w-10 h-10 text-primary/15 animate-float-reverse" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 25 Q25 10 40 25 Q25 40 10 25" strokeLinecap="round"/>
        </svg>
        <svg className="absolute top-2/3 left-8 w-6 h-6 text-accent/25 animate-bounce-subtle" viewBox="0 0 30 30" fill="currentColor">
          <circle cx="15" cy="15" r="12"/>
        </svg>
      </div>

      <Header />
      
      <main className="container py-6 relative z-10">
        {/* Hero Section - Hand-drawn style */}
        <div className="relative overflow-hidden mb-8 doodle-card bg-card">
          {/* Decorative corner doodles */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
          
          {/* Background Image with sketch overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{ backgroundImage: `url(${heroBackground})` }}
          />
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-accent/30" />
          
          {/* Content */}
          <div className="relative z-10 p-6 sm:p-10 text-center min-h-[160px] flex flex-col justify-center">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 text-rank-gold animate-sparkle" />
              <h1 className="text-3xl sm:text-5xl font-display tracking-tight text-primary-foreground drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] [text-shadow:_2px_2px_0_hsl(var(--primary)),_-1px_-1px_0_hsl(var(--accent))]">
                {t.home.heroTitle}
              </h1>
              <Sparkles className="w-6 h-6 text-rank-gold animate-sparkle" style={{ animationDelay: '0.3s' }} />
            </div>
            {/* Highlighted underline accent */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-1 bg-rank-gold/60 rounded-full" />
              <div className="squiggle-line w-40 opacity-80" />
            </div>
          </div>
        </div>

        {/* Stats Summary - Hand-drawn cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-card doodle-card p-5 rotate-slight-left hover:rotate-0 hover-wiggle transition-transform group">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <div className="p-1.5 rounded-lg bg-primary/10 group-hover:animate-bounce-subtle">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs uppercase tracking-wide font-medium">{t.home.totalPlayers}</span>
            </div>
            <p className="text-3xl font-display text-foreground">{rankings.length}</p>
            {/* Decorative dots */}
            <div className="flex gap-1 mt-2">
              <span className="w-2 h-2 rounded-full bg-primary/30 group-hover:animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-primary/20 group-hover:animate-pulse" style={{ animationDelay: '0.1s' }} />
              <span className="w-2 h-2 rounded-full bg-primary/10 group-hover:animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
          
          <div className="bg-card doodle-card p-5 hover:rotate-slight-right hover-bounce transition-transform group">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <div className="p-1.5 rounded-lg bg-accent/20 group-hover:animate-wiggle">
                <Clock className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-xs uppercase tracking-wide font-medium">{t.home.nextMatch}</span>
            </div>
            <NextMatchCountdown />
            {/* Star decoration */}
            <Star className="w-4 h-4 text-accent/40 mt-2 group-hover:animate-sparkle" />
          </div>
          
          <div className="bg-card doodle-card p-5 rotate-slight-right hover:rotate-0 hover-wiggle transition-transform group">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <div className="p-1.5 rounded-lg bg-primary/10 group-hover:animate-bounce-subtle">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs uppercase tracking-wide font-medium">{t.home.venue}</span>
            </div>
            <p className="text-lg font-display text-foreground leading-tight">
              One Shamelin Badminton Hall
            </p>
            {/* Wavy line decoration */}
            <svg className="w-16 h-2 mt-2 text-primary/30 group-hover:animate-wiggle-subtle" viewBox="0 0 60 8" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 4 Q15 0, 30 4 T60 4" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Rankings Display */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="h-20 bg-card doodle-card animate-pulse"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
              />
            ))}
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground doodle-card bg-card p-8">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-display text-xl text-foreground">{t.home.noPlayers}</p>
            <p className="text-sm">{t.home.addPlayersHint}</p>
            {/* Decorative squiggle */}
            <div className="squiggle-line w-24 mx-auto mt-4 opacity-40" />
          </div>
        ) : hasTopTies ? (
          /* No clear podium - show all players in list */
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 p-3 bg-accent/15 border-2 border-accent/40 doodle-card">
              <span className="text-sm text-foreground">
                {t.home.tieMessage}
              </span>
            </div>
            {rankings.map((ranking, index) => (
              <div 
                key={ranking.player_id}
                style={{ transform: `rotate(${index % 2 === 0 ? -0.3 : 0.3}deg)` }}
              >
                <RankingRow ranking={ranking} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Podium for Top 3 */}
            <Podium rankings={rankings} />

            {/* Rest of Rankings (4+) */}
            {restOfRankings.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
                    {t.home.otherPlayers}
                  </h3>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-transparent rounded-full" />
                </div>
                {restOfRankings.map((ranking, index) => (
                  <div 
                    key={ranking.player_id}
                    style={{ transform: `rotate(${index % 2 === 0 ? -0.3 : 0.3}deg)` }}
                  >
                    <RankingRow ranking={ranking} />
                  </div>
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
