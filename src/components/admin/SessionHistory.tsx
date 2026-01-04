import { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Trophy, Medal, Users, Trash2, Pencil, History, Camera, X, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TournamentSession, SessionResult, Player, SessionType } from '@/types/ranking';
import { format } from 'date-fns';
import { SessionResultsEditor } from './SessionResultsEditor';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SessionHistoryProps {
  sessions: TournamentSession[];
  results: SessionResult[];
  players: Player[];
  onDeleteSession: (id: string) => Promise<void>;
  onUpdateResults: (
    sessionId: string,
    sessionType: SessionType,
    champions: string[],
    runnerUps: string[],
    attendance: string[]
  ) => Promise<void>;
  onUpdatePhoto: (sessionId: string, photoUrl: string | null) => Promise<void>;
}

export function SessionHistory({ 
  sessions, 
  results, 
  players,
  onDeleteSession,
  onUpdateResults,
  onUpdatePhoto,
}: SessionHistoryProps) {
  const { t } = useLanguage();
  const [editingSession, setEditingSession] = useState<TournamentSession | null>(null);
  const [uploadingSessionId, setUploadingSessionId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetSessionId, setTargetSessionId] = useState<string | null>(null);

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

  const handleDelete = async (sessionId: string) => {
    if (confirm(t.admin.deleteSessionConfirm)) {
      await onDeleteSession(sessionId);
    }
  };

  const handlePhotoUpload = (sessionId: string) => {
    setTargetSessionId(sessionId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetSessionId) return;

    setUploadingSessionId(targetSessionId);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${targetSessionId}-${Date.now()}.${fileExt}`;
      const filePath = `session-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('session-photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('session-photos')
        .getPublicUrl(fileName);

      await onUpdatePhoto(targetSessionId, publicUrl);
      toast.success(t.admin.photoUploaded);
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploadingSessionId(null);
      setTargetSessionId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = async (session: TournamentSession) => {
    if (!session.group_photo_url) return;

    try {
      // Extract filename from URL
      const urlParts = session.group_photo_url.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      await supabase.storage
        .from('session-photos')
        .remove([fileName]);

      // Update session
      await onUpdatePhoto(session.id, null);
      toast.success(t.admin.photoRemoved);
    } catch (error) {
      console.error('Error removing photo:', error);
      toast.error('Failed to remove photo');
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-chart-2/10">
          <History className="w-5 h-5 text-chart-2" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">{t.admin.sessionHistory}</h2>
          <p className="text-xs text-muted-foreground">{sessions.length} {t.admin.sessionsRecorded}</p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">
            {t.admin.noSessionsYet}
          </p>
          <p className="text-sm text-muted-foreground/70">
            {t.admin.createFirstSession}
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {sessions.map((session) => {
            const sessionResults = getSessionResults(session.id);
            const { champions, runnerUps, attendance } = groupResultsByType(sessionResults);
            const isUploading = uploadingSessionId === session.id;
            
            return (
              <div 
                key={session.id} 
                className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3 hover:border-border transition-colors"
              >
                {/* Session Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">
                      {format(new Date(session.session_date), 'MMM d, yyyy')}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={session.session_type === '3_teams' 
                        ? 'border-primary/50 text-primary bg-primary/5' 
                        : 'border-chart-2/50 text-chart-2 bg-chart-2/5'
                      }
                    >
                      {session.session_type === '3_teams' ? t.admin.threeTeams : t.admin.twoTeams}
                    </Badge>
                    {session.name && (
                      <span className="text-sm text-muted-foreground">
                        {session.name}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => handlePhotoUpload(session.id)}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => setEditingSession(session)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(session.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Group Photo */}
                {session.group_photo_url && (
                  <div className="relative">
                    <img 
                      src={session.group_photo_url} 
                      alt="Group photo"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => handleRemovePhoto(session)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                {/* Results */}
                {sessionResults.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {/* Champions */}
                    {champions.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Trophy className="w-4 h-4 text-champion mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">{t.admin.champions}</span>
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
                      </div>
                    )}

                    {/* Runner-ups */}
                    {runnerUps.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Medal className="w-4 h-4 text-runner-up mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">{t.admin.runnerUps}</span>
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
                      </div>
                    )}

                    {/* Attendance */}
                    {attendance.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-attendance mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">{t.admin.attendance}</span>
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
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{t.admin.noResults}</p>
                )}

                {/* Points Summary */}
                {sessionResults.length > 0 && (
                  <div className="text-xs text-muted-foreground pt-2 border-t border-border/30">
                    {t.admin.totalPoints}: <span className="font-medium text-foreground">{sessionResults.reduce((sum, r) => sum + r.total_points, 0)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Dialog */}
      {editingSession && (
        <SessionResultsEditor
          session={editingSession}
          results={getSessionResults(editingSession.id)}
          players={players}
          open={!!editingSession}
          onOpenChange={(open) => !open && setEditingSession(null)}
          onUpdateResults={onUpdateResults}
        />
      )}
    </div>
  );
}