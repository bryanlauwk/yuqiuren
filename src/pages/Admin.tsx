import { useState } from 'react';
import { Header } from '@/components/Header';
import { AdminScorePanel } from '@/components/AdminScorePanel';
import { useMatches } from '@/hooks/useMatches';
import { Match } from '@/types/match';
import { cn } from '@/lib/utils';
import { ChevronRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ADMIN_PASSWORD = 'admin123';

export default function Admin() {
  const { matches, updateScore, updateStatus, resetSet, newSet } = useMatches();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="max-w-sm mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-2xl">Admin Access</h1>
              <p className="text-sm text-muted-foreground">
                Enter password to access match controls
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="h-12 text-center text-lg"
              />
              <Button 
                onClick={handleLogin}
                className="w-full h-12"
              >
                Unlock
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Demo password: admin123
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (selectedMatch) {
    const match = matches.find(m => m.id === selectedMatch.id) || selectedMatch;
    
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-4 space-y-4">
          <button
            onClick={() => setSelectedMatch(null)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to matches
          </button>

          <AdminScorePanel
            match={match}
            onScoreChange={(team, delta) => updateScore(match.id, team, delta)}
            onStatusChange={(status) => updateStatus(match.id, status)}
            onResetSet={() => resetSet(match.id)}
            onNewSet={() => newSet(match.id)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-4 space-y-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl tracking-wide">Match Control</h1>
          <p className="text-sm text-muted-foreground">
            Select a match to manage scores
          </p>
        </div>

        <div className="space-y-2">
          {matches.map((match) => (
            <button
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className={cn(
                'w-full p-4 bg-card rounded-xl flex items-center justify-between',
                'hover:bg-card/80 transition-colors text-left card-shadow'
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-court font-medium">
                    Court {match.court}
                  </span>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    match.status === 'live' && 'bg-live/20 text-live',
                    match.status === 'scheduled' && 'bg-scheduled/20 text-scheduled',
                    match.status === 'finished' && 'bg-finished/20 text-finished',
                  )}>
                    {match.status}
                  </span>
                </div>
                <p className="font-medium">
                  {match.teamA.name} vs {match.teamB.name}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
