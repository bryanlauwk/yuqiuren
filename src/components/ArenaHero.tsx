import { useLanguage } from '@/contexts/LanguageContext';
import heroBackground from '@/assets/hero-background.png';

export function ArenaHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Clean solid overlay — Airbnb-style simplicity */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Content */}
      <div className="relative z-10 container py-24 sm:py-36 md:py-44 text-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tight text-foreground mb-6">
          <span className="sm:hidden">2026羽球人赛。积分榜</span>
          <span className="hidden sm:inline">{t.home.heroTitle}</span>
        </h1>
        
        <p className="hidden sm:block text-lg sm:text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
          {t.home.heroSubtitle}
        </p>
      </div>
    </section>
  );
}