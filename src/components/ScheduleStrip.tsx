import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';

/**
 * Horizontal "schedule" strip of recent sessions — pro-league style.
 */
export function ScheduleStrip() {
  const { language } = useLanguage();
  const { sessions, results, loading } = useRankings();

  const items = useMemo(() => {
    return sessions.slice(0, 8).map((s) => {
      const played = results.filter((r) => r.session_id === s.id);
      const attendance = new Set(played.map((r) => r.player_id)).size;
      const champions = played.filter((r) => r.result_type === 'champion').length;
      return { ...s, attendance, champions };
    });
  }, [sessions, results]);

  if (loading) {
    return (
      <div className="flex gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-[86px] w-[190px] shrink-0 border-l-2 border-accent bg-[hsl(var(--band-foreground))]/10 animate-pulse-arena"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
      {items.map((s, i) => (
        <Link
          key={s.id}
          to="/history"
          className="group snap-start shrink-0 w-[200px] border border-[hsl(var(--band-foreground))]/25 border-l-2 border-l-accent bg-[hsl(var(--band-foreground))]/10 backdrop-blur-sm px-4 py-3 transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--band-foreground))]/20"
        >
          <div className="font-display text-[10px] tracking-[0.2em] band-fg opacity-70 mb-1">
            {i === 0 ? (language === 'zh' ? '最近场次' : 'LATEST') : language === 'zh' ? '场次' : 'SESSION'}
          </div>
          <div className="font-condensed text-2xl band-fg leading-none mb-1.5">
            {s.session_date.replace(/-/g, '.')}
          </div>
          <div className="font-display text-[10px] tracking-wider band-fg opacity-80">
            {s.attendance} {language === 'zh' ? '人出席' : 'PLAYERS'}
            {s.champions > 0 && ` · ${s.champions} ${language === 'zh' ? '冠军' : 'CHAMPS'}`}
          </div>
        </Link>
      ))}
    </div>
  );
}
