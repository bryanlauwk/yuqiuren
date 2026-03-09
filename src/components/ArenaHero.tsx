import { useLanguage } from '@/contexts/LanguageContext';
import heroBackground from '@/assets/hero-background.png';

export function ArenaHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Clean gradient overlay — stronger fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
      
      {/* Content */}
      <div className="relative z-10 container py-20 sm:py-32 text-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight text-gradient-arena mb-4">
          <span className="sm:hidden">2026羽球人赛。积分榜</span>
          <span className="hidden sm:inline">{t.home.heroTitle}</span>
        </h1>
        
        <p className="hidden sm:block text-base sm:text-lg text-foreground/40 italic tracking-wide">
          {t.home.heroSubtitle}
        </p>
      </div>
      
      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
