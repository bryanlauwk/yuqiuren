import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Trophy, Medal, Users, Trash2, Pencil } from 'lucide-react';
import type { TournamentSession, SessionResult, Player, SessionType } from '@/types/ranking';
import { format } from 'date-fns';
import { SessionResultsEditor } from './SessionResultsEditor';

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
}

export function SessionHistory({ 
  sessions, 
  results, 
  players,
  onDeleteSession,
  onUpdateResults,
}: SessionHistoryProps) {
  const [editingSession, setEditingSession] = useState<TournamentSession | null>(null);

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
    if (confirm('Are you sure you want to delete this session and all its results?')) {
      await onDeleteSession(sessionId);
    }
  };

  if (sessions.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-primary" />
            Session History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No sessions recorded yet. Create your first session above!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="w-5 h-5 text-primary" />
          Session History
          <Badge variant="secondary" className="ml-2">
            {sessions.length} sessions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => {
          const sessionResults = getSessionResults(session.id);
          const { champions, runnerUps, attendance } = groupResultsByType(sessionResults);
          
          return (
            <div 
              key={session.id} 
              className="p-4 rounded-lg bg-muted/30 border border-border/30 space-y-3"
            >
              {/* Session Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    {format(new Date(session.session_date), 'MMM d, yyyy')}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={session.session_type === '3_teams' 
                      ? 'border-primary/50 text-primary' 
                      : 'border-secondary/50 text-secondary-foreground'
                    }
                  >
                    {session.session_type === '3_teams' ? '3 Teams' : '2 Teams'}
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
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={() => setEditingSession(session)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(session.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Results */}
              {sessionResults.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-3">
                  {/* Champions */}
                  {champions.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Trophy className="w-4 h-4 text-champion mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Champions</span>
                        <div className="flex flex-wrap gap-1">
                          {champions.map((r) => (
                            <Badge 
                              key={r.id} 
                              className="bg-champion/10 text-champion border-champion/30 text-xs"
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
                        <span className="text-xs text-muted-foreground block mb-1">Runner-ups</span>
                        <div className="flex flex-wrap gap-1">
                          {runnerUps.map((r) => (
                            <Badge 
                              key={r.id} 
                              className="bg-runner-up/10 text-runner-up border-runner-up/30 text-xs"
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
                        <span className="text-xs text-muted-foreground block mb-1">Attendance</span>
                        <div className="flex flex-wrap gap-1">
                          {attendance.map((r) => (
                            <Badge 
                              key={r.id} 
                              className="bg-attendance/10 text-attendance border-attendance/30 text-xs"
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
                <p className="text-sm text-muted-foreground">No results recorded</p>
              )}

              {/* Points Summary */}
              {sessionResults.length > 0 && (
                <div className="text-xs text-muted-foreground pt-2 border-t border-border/20">
                  Total points awarded: {sessionResults.reduce((sum, r) => sum + r.total_points, 0)}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>

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
    </Card>
  );
}
