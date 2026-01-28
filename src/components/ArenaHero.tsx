import { useLanguage } from '@/contexts/LanguageContext';
import { CourtLines } from './hero/CourtLines';
import { SpotlightBeams } from './hero/SpotlightBeams';
import { FloatingShuttlecocks } from './hero/FloatingShuttlecocks';
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
      
      {/* Gradient overlays for blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/60" />
      
      {/* Court lines overlay */}
      <CourtLines />
      
      {/* Spotlight beams */}
      <SpotlightBeams />
      
      {/* Animated particles */}
      <div className="absolute inset-0 arena-particles opacity-40" />
      
      {/* Floating shuttlecocks */}
      <FloatingShuttlecocks />
      
      {/* Content */}
      <div className="relative z-10 container py-16 sm:py-24 text-center">
        {/* Main title - Single line on mobile */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight text-gradient-arena mb-4">
          <span className="sm:hidden">2026羽球人赛。积分榜</span>
          <span className="hidden sm:inline">{t.home.heroTitle}</span>
        </h1>
        
        {/* Subtitle - Hidden on mobile since combined with title */}
        <p className="hidden sm:block text-base sm:text-lg text-foreground/50 italic tracking-wide">
          {t.home.heroSubtitle}
        </p>
        
        {/* Decorative line */}
        <div className="mt-8 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-rank-gold/50 to-transparent" />
        </div>
      </div>
      
      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
