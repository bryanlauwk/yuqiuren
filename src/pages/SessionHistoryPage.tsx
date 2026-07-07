import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Trophy, Medal, Users, Image as ImageIcon, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { useAllHighlights } from '@/hooks/useHighlights';
import { format } from 'date-fns';
import type { SessionResult } from '@/types/ranking';
import { useState, useMemo } from 'react';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { HighlightsGallery } from '@/components/HighlightsGallery';

export default function SessionHistoryPage() {
  const { t } = useLanguage();
  const { sessions, results, players, loading } = useRankings();
  const { highlights } = useAllHighlights();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryFor, setGalleryFor] = useState<string | null>(null);

  // Group highlights by session_id
  const highlightsBySession = useMemo(() => {
    const map = new Map<string, typeof highlights>();
    highlights.forEach((h) => {
      const arr = map.get(h.session_id) ?? [];
      arr.push(h);
      map.set(h.session_id, arr);
    });
    return map;
  }, [highlights]);

  // Collect all session photos for gallery navigation
  const allPhotos = useMemo(() => {
    return sessions
      .filter(s => s.group_photo_url)
      .map(s => ({
        src: s.group_photo_url!,
        alt: `${t.history.groupPhoto} - ${s.session_date}`,
        sessionId: s.id,
      }));
  }, [sessions, t.history.groupPhoto]);

  const openLightbox = (photoUrl: string) => {
    const index = allPhotos.findIndex(p => p.src === photoUrl);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const getPlayerName = (playerId: string) => {
    return players.find(p => p.id === playerId)?.name || 'Unknown';
  };

  const getSessionResults = (sessionId: string) => {
    return results.filter(r => r.session_id === sessionId);
  };

  const groupResultsByType = (sessionResults: SessionResult[]) => {
    const champions = sessionResults.filter(r => r.result_type === 'champion');
    const runnerUps = sessionResults.filter(r => r.result_type === 'runner_up');
    const attendance = sessionResults.filter(r => r.result_type === 'attendance');
    return { champions, runnerUps, attendance };
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-10 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground tracking-tight mb-3 break-keep">
            <span className="red-slab">{t.history.title}</span>
          </h1>
          <p className="font-display text-[11px] sm:text-xs tracking-[0.25em] text-muted-foreground">
            {t.history.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-card/50 animate-pulse-arena rounded h-48 border-2 border-foreground/10"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {t.history.noSessions}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session, index) => {
              const sessionResults = getSessionResults(session.id);
              const { champions, runnerUps, attendance } = groupResultsByType(sessionResults);

              return (
                <div
                  key={session.id}
                  className="bg-card rounded border-2 border-foreground p-5 shadow-[4px_4px_0_0_hsl(var(--foreground))] transition-all duration-200 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_0_hsl(var(--foreground))] animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Session Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-display text-base text-foreground">
                        {format(new Date(session.session_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <span
                      className={`font-display text-[10px] tracking-wider px-2 py-1 border-2 border-foreground rounded ${
                        session.session_type === '3_teams'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-foreground'
                      }`}
                    >
                      {session.session_type === '3_teams' ? t.admin.threeTeams : t.admin.twoTeams}
                    </span>
                  </div>

                  {session.name && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {session.name}
                    </p>
                  )}

                  {/* Group Photo */}
                  {session.group_photo_url && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{t.history.groupPhoto}</span>
                      </div>
                      <img
                        src={session.group_photo_url}
                        alt={t.history.groupPhoto}
                        className="w-full h-40 object-cover rounded border-2 border-foreground cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox(session.group_photo_url!)}
                      />
                    </div>
                  )}

                  {/* Results */}
                  {sessionResults.length > 0 ? (
                    <div className="space-y-3">
                      {/* Champions */}
                      {champions.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Trophy className="w-4 h-4 text-accent mt-1 shrink-0" />
                          <div className="flex flex-wrap gap-1.5">
                            {champions.map((r) => (
                              <span
                                key={r.id}
                                className="font-display text-[10px] tracking-wide px-2 py-1 border-2 border-foreground rounded bg-accent text-accent-foreground"
                              >
                                {getPlayerName(r.player_id)}
                                {r.streak_bonus > 0 && (
                                  <span className="ml-1 opacity-85">+{r.streak_bonus}</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Runner-ups */}
                      {runnerUps.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Medal className="w-4 h-4 text-primary mt-1 shrink-0" />
                          <div className="flex flex-wrap gap-1.5">
                            {runnerUps.map((r) => (
                              <span
                                key={r.id}
                                className="font-display text-[10px] tracking-wide px-2 py-1 border-2 border-foreground rounded bg-primary text-primary-foreground"
                              >
                                {getPlayerName(r.player_id)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Attendance */}
                      {attendance.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Users className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                          <div className="flex flex-wrap gap-1.5">
                            {attendance.map((r) => (
                              <span
                                key={r.id}
                                className="font-display text-[10px] tracking-wide px-2 py-1 border-2 border-foreground/40 rounded bg-muted text-foreground"
                              >
                                {getPlayerName(r.player_id)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t.admin.noResults}</p>
                  )}

                  {/* Footer row: points + highlights chip */}
                  {(() => {
                    const sessionHighlights = highlightsBySession.get(session.id) ?? [];
                    const hasPoints = sessionResults.length > 0;
                    const hasHighlights = sessionHighlights.length > 0;
                    if (!hasPoints && !hasHighlights) return null;
                    return (
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-3 mt-3 border-t-2 border-foreground/10">
                        {hasPoints ? (
                          <span className="text-xs text-muted-foreground">
                            {t.admin.totalPoints}:{' '}
                            <span className="font-display text-sm text-foreground">
                              {sessionResults.reduce((sum, r) => sum + r.total_points, 0)}
                            </span>
                          </span>
                        ) : (
                          <span />
                        )}
                        {hasHighlights && (
                          <button
                            type="button"
                            onClick={() => setGalleryFor(session.id)}
                            aria-label={`${t.highlights.title} (${sessionHighlights.length})`}
                            className="group inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded border-2 border-foreground bg-background px-3 py-1.5 text-xs font-bold text-foreground shadow-[2px_2px_0_0_hsl(var(--foreground))] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0_0_hsl(var(--foreground))] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_hsl(var(--foreground))]"
                          >
                            <Play className="h-3.5 w-3.5 fill-accent text-accent transition-transform group-hover:scale-110" />
                            <span className="tabular-nums font-display">{sessionHighlights.length}</span>
                            <span>{t.highlights.chip}</span>
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Photo Lightbox */}
      <PhotoLightbox
        images={allPhotos}
        currentIndex={lightboxIndex ?? 0}
        open={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
      {/* Highlights Gallery */}
      {galleryFor && (() => {
        const s = sessions.find((x) => x.id === galleryFor);
        if (!s) return null;
        const label = `${format(new Date(s.session_date), 'MMM d, yyyy')}${s.name ? ` · ${s.name}` : ''}`;
        return (
          <HighlightsGallery
            open={!!galleryFor}
            onClose={() => setGalleryFor(null)}
            highlights={highlightsBySession.get(galleryFor) ?? []}
            sessionLabel={label}
          />
        );
      })()}

      <Footer />
    </div>
  );
}