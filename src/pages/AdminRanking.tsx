import { Header } from '@/components/Header';
import { PlayerManager } from '@/components/admin/PlayerManager';
import { SessionCreator } from '@/components/admin/SessionCreator';
import { SessionHistory } from '@/components/admin/SessionHistory';
import { useRankings } from '@/hooks/useRankings';
import { Shield } from 'lucide-react';

export default function AdminRanking() {
  const {
    players,
    sessions,
    results,
    loading,
    addPlayer,
    deletePlayer,
    createSession,
    deleteSession,
    recordResults,
  } = useRankings();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-64 bg-muted rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display tracking-wide">ADMIN PANEL</h1>
            <p className="text-sm text-muted-foreground">
              Manage players and record session results
            </p>
          </div>
        </div>

        {/* Session Creator */}
        <SessionCreator
          players={players}
          onCreateSession={createSession}
          onRecordResults={recordResults}
        />

        {/* Session History */}
        <SessionHistory
          sessions={sessions}
          results={results}
          players={players}
          onDeleteSession={deleteSession}
        />

        {/* Player Manager */}
        <PlayerManager
          players={players}
          onAddPlayer={addPlayer}
          onDeletePlayer={deletePlayer}
        />
      </main>
    </div>
  );
}
