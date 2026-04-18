import { useLanguage } from '@/contexts/LanguageContext';
import { FloatingShuttlecocks } from '@/components/hero/FloatingShuttlecocks';
import { CircleArrow } from '@/components/ink/CircleArrow';

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

        {/* Corner accent — circle + arrow ink mark */}
        <CircleArrow
          size={112}
          className="hidden md:block absolute top-12 right-12 text-foreground"
        />
      </div>
    </section>
  );
}
