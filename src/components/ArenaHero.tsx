import { useLanguage } from '@/contexts/LanguageContext';
import { FloatingShuttlecocks } from '@/components/hero/FloatingShuttlecocks';

export function ArenaHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-background border-b-2 border-foreground">
      <FloatingShuttlecocks />
      {/* Content */}
      <div className="relative z-10 container py-20 sm:py-28 md:py-36">
        <div className="max-w-5xl">
          <h1 className="font-display text-foreground leading-[0.9] tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] mb-6">
            <span className="sm:hidden">
              <span className="lime-slab">2026</span>
              <br />
              羽球人赛
              <br />
              <span className="lime-slab">积分榜.</span>
            </span>
            <span className="hidden sm:inline">
              {t.home.heroTitle.split(' ').map((word, i, arr) => {
                const isLast = i === arr.length - 1;
                return (
                  <span key={i}>
                    {isLast ? <span className="lime-slab">{word}.</span> : <>{word} </>}
                  </span>
                );
              })}
            </span>
          </h1>

          <p className="hidden sm:block text-base sm:text-lg md:text-xl text-accent font-medium uppercase tracking-wider max-w-2xl">
            {t.home.heroSubtitle}
          </p>
        </div>

        {/* Corner accent — chunky arrow */}
        <svg
          className="hidden md:block absolute top-12 right-12 w-24 h-24 text-foreground"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 80 L80 20" />
          <path d="M50 20 L80 20 L80 50" />
        </svg>
      </div>
    </section>
  );
}
