import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { PlayerManager } from '@/components/admin/PlayerManager';
import { SessionCreator } from '@/components/admin/SessionCreator';
import { SessionHistory } from '@/components/admin/SessionHistory';
import { useRankings } from '@/hooks/useRankings';
import { useAuth } from '@/hooks/useAuth';
import { Shield, Loader2 } from 'lucide-react';

export default function AdminRanking() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
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
    updateSessionResults,
  } = useRankings();

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-lg bg-primary/20 border border-primary/50 glow-primary">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-display tracking-wider text-glow">
              ADMIN PANEL
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage players, sessions, and results
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
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
            onUpdateResults={updateSessionResults}
          />

          {/* Player Manager */}
          <div className="lg:col-span-2">
            <PlayerManager
              players={players}
              onAddPlayer={addPlayer}
              onDeletePlayer={deletePlayer}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
