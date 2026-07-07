import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { CircleArrow } from '@/components/ink/CircleArrow';
import { useRankings } from '@/hooks/useRankings';
import { StarOfTheWeek } from '@/components/hero/StarOfTheWeek';


export function ArenaHero() {
  const { t, language } = useLanguage();
  const { sessions, players } = useRankings();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const progress = Math.min(Math.max((vh - rect.top) / total, 0), 1);
      setScrollOffset(progress);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Tilt from -2deg (top) → +3deg (bottom), translate up to -20px
  const posterRotate = -2 + scrollOffset * 5;
  const posterTranslateY = -scrollOffset * 20;

  const handleScroll = () => {
    document.getElementById('rankings-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-background border-b-2 border-foreground">
      <div className="relative z-10 container py-16 sm:py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* Left: headline + CTA */}
          <div className="md:col-span-7">
            <h1 className="font-display text-foreground leading-[0.9] tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] mb-6 break-keep">
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

            <p className="text-base sm:text-lg md:text-xl text-accent font-medium uppercase tracking-wider max-w-2xl mb-5">
              {t.home.heroSubtitle}
            </p>

            {/* Live stat strip */}
            {(players.length > 0 || sessions.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 border-2 border-foreground rounded-md px-3 py-1.5 bg-background">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span className="font-display text-xs sm:text-sm tracking-wider text-foreground">
                    {players.length} {language === 'zh' ? '球员' : 'PLAYERS'}
                  </span>
                </div>
                <div className="inline-flex items-center border-2 border-foreground rounded-md px-3 py-1.5 bg-background">
                  <span className="font-display text-xs sm:text-sm tracking-wider text-foreground">
                    {sessions.length} {language === 'zh' ? '场次' : 'SESSIONS'}
                  </span>
                </div>
                {sessions[0]?.session_date && (
                  <div className="inline-flex items-center border-2 border-foreground rounded-md px-3 py-1.5 bg-foreground text-background">
                    <span className="font-display text-xs sm:text-sm tracking-wider">
                      {language === 'zh' ? '最近 ' : 'LATEST '}
                      {sessions[0].session_date.replace(/-/g, '.')}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleScroll}
                className="btn-pop inline-flex items-center gap-3 bg-accent text-accent-foreground border-2 border-foreground px-6 py-3 font-display uppercase tracking-wide text-sm rounded-md"
              >
                {t.showcase.cta}
                <CircleArrow size={28} className="text-foreground" />
              </button>
              <Link
                to="/history"
                className="btn-pop inline-flex items-center gap-2 bg-background text-foreground border-2 border-foreground px-5 py-3 font-display uppercase tracking-wide text-sm rounded-md hover:bg-foreground hover:text-background transition-colors"
              >
                {language === 'zh' ? '场次记录' : 'MATCH HISTORY'}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Right: Star of the Week poster */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <StarOfTheWeek rotate={posterRotate} translateY={posterTranslateY} />
          </div>

        </div>
      </div>
    </section>
  );
}
