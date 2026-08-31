import { Link } from 'react-router-dom';
import { ArrowDown, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { LatestSessionPhoto } from '@/components/hero/LatestSessionPhoto';
import { CourtLines } from '@/components/hero/CourtLines';

export function ArenaHero() {
  const { t, language } = useLanguage();
  const { sessions, players } = useRankings();
  const isZh = language === 'zh';

  const scrollToRankings = () => {
    document.getElementById('rankings-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="brand-band relative w-full overflow-hidden border-b-2 border-foreground">
      <div className="absolute inset-0 pointer-events-none opacity-20 band-fg" aria-hidden>
        <CourtLines />
      </div>

      <div className="relative z-10 container pt-12 sm:pt-16 md:pt-20">
        <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 font-sans text-[10px] font-extrabold uppercase tracking-[0.28em] text-[hsl(var(--band-foreground))]/75 sm:text-xs">
              <span className="h-2 w-2 bg-accent" />
              {isZh ? '羽球人 · 社区联赛' : 'YUQIUREN · COMMUNITY LEAGUE'}
            </div>

            <h1 className="max-w-6xl font-display text-[clamp(3rem,10vw,9rem)] leading-[0.82] band-fg">
              <span className="block whitespace-nowrap">2026 {isZh ? '羽球人赛' : 'YUQIUREN'}</span>
              <span className="block text-accent">{isZh ? '积分榜' : 'LEAGUE TABLE'}</span>
            </h1>
          </div>

          <div className="pb-1 xl:pb-3">
            <p className="max-w-sm font-sans text-sm font-semibold leading-relaxed text-[hsl(var(--band-foreground))]/80 sm:text-base">
              {t.home.heroSubtitle}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[hsl(var(--band-foreground))]/75">
              <span className="border border-[hsl(var(--band-foreground))]/30 px-3 py-2">
                {players.length} {isZh ? '名球员' : 'PLAYERS'}
              </span>
              <span className="border border-[hsl(var(--band-foreground))]/30 px-3 py-2">
                {sessions.length} {isZh ? '场赛事' : 'MATCH DAYS'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          <button
            type="button"
            onClick={scrollToRankings}
            className="inline-flex min-h-12 items-center gap-3 border-2 border-[hsl(var(--band-foreground))] bg-accent px-5 py-3 font-sans text-xs font-black uppercase tracking-[0.14em] text-accent-foreground shadow-[4px_4px_0_0_hsl(var(--band-foreground))] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--band-foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--band-surface))]"
          >
            {isZh ? '查看积分榜' : 'VIEW STANDINGS'}
            <ArrowDown className="h-4 w-4" />
          </button>
          <Link
            to="/history#highlights"
            className="inline-flex min-h-12 items-center gap-3 border-2 border-[hsl(var(--band-foreground))]/70 bg-[hsl(var(--band-foreground))]/10 px-5 py-3 font-sans text-xs font-black uppercase tracking-[0.14em] band-fg transition-all hover:-translate-y-1 hover:bg-[hsl(var(--band-foreground))]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--band-foreground))]"
          >
            <Play className="h-4 w-4 fill-current" />
            {isZh ? '看精彩片段' : 'WATCH HIGHLIGHTS'}
          </Link>
        </div>

      </div>

      <LatestSessionPhoto />
    </section>
  );
}
