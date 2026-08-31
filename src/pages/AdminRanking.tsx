import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
    updateAvatarCrop,
    createSession,
    deleteSession,
    recordResults,
    updateSessionResults,
    updateSessionPhoto,
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="container py-8 flex-1">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded bg-primary text-primary-foreground border-2 border-foreground shadow-[3px_3px_0_0_hsl(var(--foreground))]">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">
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
            onUpdatePhoto={updateSessionPhoto}
          />

          {/* Player Manager */}
          <div className="lg:col-span-2">
            <PlayerManager
              players={players}
              onAddPlayer={addPlayer}
              onDeletePlayer={deletePlayer}
              onUpdateAvatar={updatePlayerAvatar}
              onUpdateName={updatePlayerName}
              onUpdateAvatarCrop={updateAvatarCrop}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
