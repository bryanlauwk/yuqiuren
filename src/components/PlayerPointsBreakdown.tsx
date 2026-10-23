import { useMemo } from 'react';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const LABELS = {
  zh: { champion: '冠军', runner_up: '亚军', attendance: '出席', date: '日期', result: '成绩', base: '基础', bonus: '连冠', total: '本场', empty: '暂无比赛记录' },
  en: { champion: 'Champion', runner_up: 'Runner-up', attendance: 'Attended', date: 'Date', result: 'Result', base: 'Base', bonus: 'Streak', total: 'Total', empty: 'No matches yet' },
};

export function PlayerPointsBreakdown({ playerId }: { playerId: string }) {
  const { sessions, results } = useRankings();
  const { language } = useLanguage();
  const l = language === 'zh' ? LABELS.zh : LABELS.en;

  const rows = useMemo(() => {
    const byId = new Map(sessions.map((s) => [s.id, s]));
    return results
      .filter((r) => r.player_id === playerId && byId.has(r.session_id))
      .map((r) => ({ ...r, date: byId.get(r.session_id)!.session_date }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [sessions, results, playerId]);

  if (rows.length === 0) return <p className="py-3 text-sm text-muted-foreground">{l.empty}</p>;

  return (
    <div className="max-h-72 overflow-y-auto rounded-lg border border-border/60">
      <table className="w-full text-sm tabular-nums">
        <thead className="sticky top-0 bg-muted text-xs text-muted-foreground">
          <tr>
            <th className="px-3 py-2 text-left font-medium">{l.date}</th>
            <th className="px-2 py-2 text-left font-medium">{l.result}</th>
            <th className="px-2 py-2 text-right font-medium">{l.base}</th>
            <th className="px-2 py-2 text-right font-medium">{l.bonus}</th>
            <th className="px-3 py-2 text-right font-medium">{l.total}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/50">
              <td className="px-3 py-2 text-muted-foreground">{r.date.slice(5)}</td>
              <td className={cn('px-2 py-2', r.result_type === 'champion' && 'font-semibold text-primary')}>{l[r.result_type]}</td>
              <td className="px-2 py-2 text-right">{r.base_points}</td>
              <td className={cn('px-2 py-2 text-right', r.streak_bonus > 0 ? 'font-semibold text-primary' : 'text-muted-foreground')}>
                {r.streak_bonus > 0 ? `+${r.streak_bonus}` : '—'}
              </td>
              <td className="px-3 py-2 text-right font-bold">{r.total_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
