import { CalendarDays, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';

export function ArenaHero() {
  const { language } = useLanguage();
  const { sessions, players, loading } = useRankings();
  const isZh = language === 'zh';

  return (
    <section className="cs-hero cs-shell py-6 sm:pb-9 sm:pt-12" aria-labelledby="standings-title">
      <div className="cs-hero-court" aria-hidden />
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="cs-eyebrow mb-3 hidden sm:block">{isZh ? '羽球人 · 社区联赛' : 'YUQIUREN · COMMUNITY LEAGUE'}</p>
          <h1 id="standings-title" className="cs-title">{isZh ? '2026 联赛积分榜' : '2026 League Standings'}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:mt-5">
            <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" aria-hidden /><strong className="font-semibold text-foreground">{loading ? '—' : players.length}</strong>{isZh ? '位球员' : 'players'}</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" aria-hidden /><strong className="font-semibold text-foreground">{loading ? '—' : sessions.length}</strong>{isZh ? '场比赛' : 'matches'}</span>
          </div>
        </div>
        <p className="hidden shrink-0 border-l border-border pl-6 text-right text-sm leading-7 text-muted-foreground lg:block">
          {isZh ? '同一片球场' : 'Same court.'}<br /><span className="text-foreground">{isZh ? '更好的我们' : 'Better together.'}</span>
        </p>
      </div>
    </section>
  );
}
