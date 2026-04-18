import { useLanguage } from '@/contexts/LanguageContext';
import { CircleArrow } from '@/components/ink/CircleArrow';

export function ArenaHero() {
  const { t } = useLanguage();

  const handleScroll = () => {
    document.getElementById('rankings-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const mockRows = [
    { rank: 1, w: 'w-24', score: '48', tint: true },
    { rank: 2, w: 'w-20', score: '42', tint: false },
    { rank: 3, w: 'w-28', score: '37', tint: true },
    { rank: 4, w: 'w-16', score: '29', tint: false },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background border-b-2 border-foreground">
      <div className="relative z-10 container py-16 sm:py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* Left: headline + CTA */}
          <div className="md:col-span-7">
            <h1 className="font-display text-foreground leading-[0.9] tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] mb-6">
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

            <p className="text-base sm:text-lg md:text-xl text-accent font-medium uppercase tracking-wider max-w-2xl mb-8">
              {t.home.heroSubtitle}
            </p>

            <button
              onClick={handleScroll}
              className="btn-pop inline-flex items-center gap-3 bg-accent text-accent-foreground border-2 border-foreground px-6 py-3 font-display uppercase tracking-wide text-sm rounded-md"
            >
              {t.showcase.cta}
              <CircleArrow size={28} className="text-foreground" />
            </button>
          </div>

          {/* Right: tilted phone mockup */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div
              className="relative bg-foreground rounded-[2.5rem] p-3 border-2 border-foreground shadow-[8px_8px_0_0_hsl(var(--accent))]"
              style={{ transform: 'rotate(-4deg)', width: 280 }}
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-background rounded-full z-10" />
              <div className="bg-background rounded-[2rem] pt-10 pb-5 px-3 space-y-2">
                {mockRows.map((row) => (
                  <div
                    key={row.rank}
                    className={`flex items-center gap-3 rounded-2xl border-2 border-foreground px-3 py-3 ${
                      row.tint ? 'bg-accent' : 'bg-background'
                    }`}
                  >
                    <span className="font-display text-lg w-5 text-foreground">{row.rank}</span>
                    <div className="w-9 h-9 rounded-full bg-foreground/90 border-2 border-foreground" />
                    <div className="flex-1 space-y-1.5">
                      <div className={`h-2 ${row.w} bg-foreground/80 rounded-full`} />
                      <div className="h-1.5 w-12 bg-foreground/30 rounded-full" />
                    </div>
                    <span className="font-display text-base text-foreground bg-background border-2 border-foreground rounded-md px-2 py-0.5">
                      {row.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <CircleArrow
          size={88}
          className="hidden lg:block absolute top-8 right-8 text-foreground"
        />
      </div>
    </section>
  );
}
