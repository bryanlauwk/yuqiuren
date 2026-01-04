import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Medal, Users, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRankings } from '@/hooks/useRankings';
import { format } from 'date-fns';
import type { SessionResult } from '@/types/ranking';
import { useState, useMemo } from 'react';
import { PhotoLightbox } from '@/components/PhotoLightbox';

export default function SessionHistoryPage() {
  const { t } = useLanguage();
  const { sessions, results, players, loading } = useRankings();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
      
      <main className="flex-1 container py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t.history.title}
          </h1>
          <p className="text-muted-foreground">
            {t.history.subtitle}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
            {sessions.map((session) => {
              const sessionResults = getSessionResults(session.id);
              const { champions, runnerUps, attendance } = groupResultsByType(sessionResults);
              
              return (
                <div 
                  key={session.id} 
                  className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Session Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">
                        {format(new Date(session.session_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={session.session_type === '3_teams' 
                        ? 'border-primary/50 text-primary bg-primary/5' 
                        : 'border-chart-2/50 text-chart-2 bg-chart-2/5'
                      }
                    >
                      {session.session_type === '3_teams' ? t.admin.threeTeams : t.admin.twoTeams}
                    </Badge>
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
                        className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
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
                          <Trophy className="w-4 h-4 text-champion mt-0.5 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {champions.map((r) => (
                              <Badge 
                                key={r.id} 
                                className="bg-champion/10 text-champion border-champion/30 text-xs font-medium"
                              >
                                {getPlayerName(r.player_id)}
                                {r.streak_bonus > 0 && (
                                  <span className="ml-1 text-[10px] opacity-75">
                                    +{r.streak_bonus}
                                  </span>
                                )}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Runner-ups */}
                      {runnerUps.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Medal className="w-4 h-4 text-runner-up mt-0.5 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {runnerUps.map((r) => (
                              <Badge 
                                key={r.id} 
                                className="bg-runner-up/10 text-runner-up border-runner-up/30 text-xs font-medium"
                              >
                                {getPlayerName(r.player_id)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Attendance */}
                      {attendance.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Users className="w-4 h-4 text-attendance mt-0.5 shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {attendance.map((r) => (
                              <Badge 
                                key={r.id} 
                                className="bg-attendance/10 text-attendance border-attendance/30 text-xs font-medium"
                              >
                                {getPlayerName(r.player_id)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t.admin.noResults}</p>
                  )}

                  {/* Points Summary */}
                  {sessionResults.length > 0 && (
                    <div className="text-xs text-muted-foreground pt-3 mt-3 border-t border-border/30">
                      {t.admin.totalPoints}: <span className="font-medium text-foreground">{sessionResults.reduce((sum, r) => sum + r.total_points, 0)}</span>
                    </div>
                  )}
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

      <Footer />
    </div>
  );
}