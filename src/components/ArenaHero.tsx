import { CalendarDays, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';

export function ArenaHero() {
  const { language } = useLanguage();
  const { sessions, players, loading } = useRankings();
  const isZh = language === 'zh';

  return (
    <section className="cs-hero cs-shell" aria-labelledby="standings-title">
      <img className="cs-hero-art" src="/courtside-hero.webp" alt="" aria-hidden="true" width="1600" height="533" fetchPriority="high" />
      <div className="cs-hero-content">
        <div className="cs-hero-heading">
          <p className="cs-eyebrow mb-3 hidden sm:block">{isZh ? '羽球人 · 社区联赛' : 'YUQIUREN · COMMUNITY LEAGUE'}</p>
          <h1 id="standings-title" className="cs-title">{isZh ? '2026 联赛积分榜' : '2026 League Standings'}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:mt-5">
            <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" aria-hidden /><strong className="font-semibold text-foreground">{loading ? '—' : players.length}</strong>{isZh ? '位球员' : 'players'}</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" aria-hidden /><strong className="font-semibold text-foreground">{loading ? '—' : sessions.length}</strong>{isZh ? '场比赛' : 'matches'}</span>
          </div>
        </div>
        <div className="cs-hero-note">
          <p className="cs-hero-quote" lang={isZh ? 'zh-CN' : 'en'}>
            <span>{isZh ? '同一片球场' : 'Same court.'}</span>
            <span>{isZh ? '更好的我们' : 'Better together.'}</span>
          </p>
          <p className="cs-hero-signature" aria-hidden="true">GOOD PLAYERS<br />BETTER FRIENDS</p>
        </div>
      </div>
    </section>
  );
}
