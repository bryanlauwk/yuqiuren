import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, Medal, Play, Trophy, Users } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { useAllHighlights } from '@/hooks/useHighlights';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { HighlightsGallery } from '@/components/HighlightsGallery';
import { formatSessionDate } from '@/lib/session-date';
import { parseYouTubeId } from '@/lib/youtube';

export default function SessionHistoryPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const { sessions, results, players, loading } = useRankings();
  const { highlights } = useAllHighlights();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryFor, setGalleryFor] = useState<string | null>(null);
  const playerNames = useMemo(() => new Map(players.map((player) => [player.id, player.name])), [players]);
  const highlightsBySession = useMemo(() => {
    const map = new Map<string, typeof highlights>();
    for (const highlight of highlights) {
      if (parseYouTubeId(highlight.youtube_url)) map.set(highlight.session_id, [...(map.get(highlight.session_id) ?? []), highlight]);
    }
    return map;
  }, [highlights]);
  const allPhotos = useMemo(() => sessions.filter((session) => session.group_photo_url).map((session) => ({ src: session.group_photo_url!, alt: `${isZh ? '球友合影' : 'Group photo'} · ${formatSessionDate(session.session_date, language)}`, sessionId: session.id })), [sessions, isZh, language]);
  const gallerySession = sessions.find((session) => session.id === galleryFor);

  return (
    <div className="courtside cs-page">
      <Header />
      <main id="main-content" className="cs-shell flex-1 py-8 sm:py-12">
        <div id="highlights" className="mb-8 flex scroll-mt-24 items-end justify-between gap-4">
          <div><p className="cs-eyebrow mb-3">{isZh ? '场上的成绩 · 场下的回忆' : 'RESULTS & MEMORIES'}</p><h1 className="cs-title">{isZh ? '赛事回顾' : 'Match days'}</h1></div>
          <span className="shrink-0 rounded-full border border-border px-3 py-2 text-sm text-muted-foreground">{loading ? '—' : sessions.length} {isZh ? '次活动' : 'sessions'}</span>
        </div>
        {loading ? (
          <div role="status" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"><span className="sr-only">{isZh ? '正在加载赛事回顾' : 'Loading match days'}</span>{Array.from({ length: 6 }, (_, i) => <div key={i} className="cs-panel h-96 animate-pulse bg-muted/50" />)}</div>
        ) : sessions.length === 0 ? (
          <div className="cs-panel py-16 text-center"><CalendarDays className="mx-auto mb-4 h-8 w-8 text-muted-foreground" aria-hidden /><p>{isZh ? '暂无活动记录' : 'No match days yet'}</p></div>
        ) : (
          <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sessions.map((session) => {
              const sessionResults = results.filter((result) => result.session_id === session.id);
              const sessionHighlights = highlightsBySession.get(session.id) ?? [];
              const dateLabel = formatSessionDate(session.session_date, language);
              const groups = [
                { type: 'champion', label: isZh ? '冠军' : 'Champions', icon: Trophy, color: 'bg-accent text-accent-foreground' },
                { type: 'runner_up', label: isZh ? '亚军' : 'Runners-up', icon: Medal, color: 'bg-primary/10 text-primary' },
                { type: 'attendance', label: isZh ? '参赛球友' : 'Also played', icon: Users, color: 'bg-secondary text-muted-foreground' },
              ];
              return (
                <article key={session.id} className="cs-panel overflow-hidden" aria-label={dateLabel}>
                  {session.group_photo_url && <button type="button" className="block w-full overflow-hidden bg-secondary" onClick={() => setLightboxIndex(allPhotos.findIndex((photo) => photo.sessionId === session.id))} aria-label={isZh ? `查看 ${dateLabel} 合影` : `View group photo from ${dateLabel}`}><img src={session.group_photo_url} alt={isZh ? `${dateLabel} 球友合影` : `Badminton friends on ${dateLabel}`} loading="lazy" className="cs-photo aspect-[4/3] transition-opacity hover:opacity-90" /></button>}
                  <div className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-lg font-bold"><time dateTime={session.session_date}>{dateLabel}</time></h2><span className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">{session.session_type === '3_teams' ? (isZh ? '3 队模式' : '3 teams') : (isZh ? '2 队模式' : '2 teams')}</span></div>
                    {session.name && <p className="mt-2 text-sm text-muted-foreground">{session.name}</p>}
                    <div className="mt-5 space-y-4">
                      {groups.map(({ type, label, icon: Icon, color }) => {
                        const groupResults = sessionResults.filter((result) => result.result_type === type);
                        if (!groupResults.length) return null;
                        return <div key={type}><h3 className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground"><Icon className="h-3.5 w-3.5" aria-hidden />{label}</h3><div className="flex flex-wrap gap-1.5">{groupResults.map((result) => <span key={result.id} className={`rounded-md px-2.5 py-1.5 text-sm font-medium ${color}`}>{playerNames.get(result.player_id) ?? (isZh ? '未知球员' : 'Unknown player')}{result.streak_bonus > 0 && <span className="ml-1.5 text-xs" title={isZh ? '连冠奖励积分' : 'Consecutive title bonus'}>+{result.streak_bonus}</span>}</span>)}</div></div>;
                      })}
                      {!sessionResults.length && <p className="text-sm text-muted-foreground">{isZh ? '成绩尚未记录' : 'Results not recorded yet'}</p>}
                    </div>
                    {(sessionResults.length > 0 || sessionHighlights.length > 0) && <div className="mt-5 border-t border-border/70 pt-4">
                      {sessionResults.length > 0 && <p className="mb-3 text-xs text-muted-foreground">{isZh ? '本场总积分' : 'Session points'} <span className="ml-1 font-semibold tabular-nums text-foreground">{sessionResults.reduce((sum, result) => sum + result.total_points, 0)}</span></p>}
                      {sessionHighlights.length > 0 && <button type="button" onClick={() => setGalleryFor(session.id)} className="cs-action w-full"><Play className="h-4 w-4 fill-current" aria-hidden /><span>{sessionHighlights.length} {isZh ? '段精彩片段' : 'highlights'}</span><ArrowRight className="ml-auto h-4 w-4" aria-hidden /></button>}
                    </div>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <PhotoLightbox images={allPhotos} currentIndex={lightboxIndex ?? 0} open={lightboxIndex !== null} onClose={() => setLightboxIndex(null)} onIndexChange={setLightboxIndex} />
      {gallerySession && <HighlightsGallery open={!!galleryFor} onClose={() => setGalleryFor(null)} highlights={highlightsBySession.get(gallerySession.id) ?? []} sessionLabel={formatSessionDate(gallerySession.session_date, language)} />}
      <Footer />
    </div>
  );
}
