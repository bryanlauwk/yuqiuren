import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { CourtLines } from '@/components/hero/CourtLines';

export function ArenaHero() {
  const { t, language } = useLanguage();
  const { sessions, players, loading } = useRankings();
  const isZh = language === 'zh';

  const scrollToRankings = () => {
    document.getElementById('rankings-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="brand-band relative w-full overflow-hidden border-b-2 border-foreground">
      <div className="absolute inset-0 pointer-events-none opacity-15 band-fg" aria-hidden>
        <CourtLines />
      </div>

      <div className="relative z-10 container py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <div className="mb-4 flex items-center gap-3 font-sans text-[10px] font-extrabold uppercase tracking-[0.28em] text-[hsl(var(--band-foreground))]/75 sm:text-xs">
              <span className="h-2 w-2 bg-accent" />
              {isZh ? '羽球人 · 社区联赛' : 'YUQIUREN · COMMUNITY LEAGUE'}
            </div>

            <h1 className="max-w-5xl text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.84] band-fg">
              {isZh ? (
                <>
                  <span className="block">
                    <span className="font-display">2026</span>
                    <span className="block font-sans font-black tracking-[-0.07em] sm:ml-[0.18em] sm:inline">
                      羽球人赛
                    </span>
                  </span>
                  <span className="block font-sans font-black tracking-[-0.07em] text-accent">积分榜</span>
                </>
              ) : (
                <>
                  <span className="block font-display">2026 YUQIUREN</span>
                  <span className="block font-display text-accent">LEAGUE TABLE</span>
                </>
              )}
            </h1>
          </div>

          <div className="border-t-2 border-accent pt-5 lg:col-span-4 lg:border-l-2 lg:border-t-0 lg:pb-1 lg:pl-7 lg:pt-0">
            <p className="max-w-sm font-sans text-sm font-semibold leading-relaxed text-[hsl(var(--band-foreground))]/80 sm:text-base">
              {t.home.heroSubtitle}
            </p>

            <div className="mt-5 grid max-w-sm grid-cols-2 border-l border-t border-[hsl(var(--band-foreground))]/25">
              <div className="border-b border-r border-[hsl(var(--band-foreground))]/25 p-3">
                <div className="font-display text-3xl leading-none text-accent">{loading ? '—' : players.length}</div>
                <div className="mt-1 font-sans text-[9px] font-black uppercase tracking-[0.16em] text-[hsl(var(--band-foreground))]/65">
                  {isZh ? '球员' : 'Players'}
                </div>
              </div>
              <div className="border-b border-r border-[hsl(var(--band-foreground))]/25 p-3">
                <div className="font-display text-3xl leading-none text-accent">{loading ? '—' : sessions.length}</div>
                <div className="mt-1 font-sans text-[9px] font-black uppercase tracking-[0.16em] text-[hsl(var(--band-foreground))]/65">
                  {isZh ? '场赛事' : 'Match days'}
                </div>
              </div>
            </div>

            <div className="mt-5 flex max-w-sm flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <button
                type="button"
                onClick={scrollToRankings}
                className="inline-flex min-h-11 flex-1 items-center justify-between gap-3 border-2 border-[hsl(var(--band-foreground))] bg-accent px-4 py-2.5 font-sans text-[10px] font-black uppercase tracking-[0.14em] text-accent-foreground shadow-[3px_3px_0_0_hsl(var(--band-foreground))] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--band-foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--band-surface))]"
              >
                {isZh ? '查看积分榜' : 'VIEW STANDINGS'}
                <ArrowDown className="h-4 w-4" />
              </button>
              <Link
                to="/history"
                className="inline-flex min-h-11 flex-1 items-center justify-between gap-3 border-2 border-[hsl(var(--band-foreground))]/70 bg-[hsl(var(--band-foreground))]/10 px-4 py-2.5 font-sans text-[10px] font-black uppercase tracking-[0.14em] band-fg transition-all hover:-translate-y-1 hover:bg-[hsl(var(--band-foreground))]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--band-foreground))]"
              >
                {isZh ? '赛事纪录' : 'MATCH ARCHIVE'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
