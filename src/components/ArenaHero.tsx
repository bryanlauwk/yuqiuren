import { useLanguage } from '@/contexts/LanguageContext';

export function ArenaHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 arena-hero-gradient" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 arena-particles opacity-60" />
      
      {/* Motion streaks */}
      <div className="motion-streak w-[200%] h-20 top-1/4 -left-1/2" />
      <div className="motion-streak w-[200%] h-16 top-1/2 -left-1/2" style={{ animationDelay: '1s' }} />
      <div className="motion-streak w-[200%] h-12 top-3/4 -left-1/2" style={{ animationDelay: '2s' }} />
      
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container py-16 sm:py-24 text-center">
        {/* Main title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight text-gradient-arena mb-4">
          {t.home.heroTitle}
        </h1>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg text-foreground/50 italic tracking-wide">
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
