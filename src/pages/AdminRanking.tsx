import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { PlayerManager } from '@/components/admin/PlayerManager';
import { SessionCreator } from '@/components/admin/SessionCreator';
import { SessionHistory } from '@/components/admin/SessionHistory';
import { AdminStats } from '@/components/admin/AdminStats';
import { useRankings } from '@/hooks/useRankings';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, Loader2 } from 'lucide-react';

export default function AdminRanking() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const {
    players,
    sessions,
    results,
    loading,
    addPlayer,
    deletePlayer,
    updatePlayerAvatar,
    updatePlayerName,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container py-8">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-primary text-primary-foreground shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t.admin.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t.admin.description}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <AdminStats 
          players={players} 
          sessions={sessions} 
          results={results} 
        />

        {/* Main Grid */}
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
              onUpdateAvatar={updatePlayerAvatar}
              onUpdateName={updatePlayerName}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
