import { Header } from '@/components/Header';
import { RankingRow } from '@/components/RankingRow';
import { Podium } from '@/components/Podium';
import { useRankings } from '@/hooks/useRankings';
import { Trophy, Users, Zap } from 'lucide-react';

export default function RankingPage() {
  const { rankings, loading } = useRankings();

  // Get rankings for positions 4+
  const restOfRankings = rankings.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-lg bg-primary/20 border border-primary/50 glow-primary">
            <Trophy className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-display tracking-wider text-glow">
              PLAYER RANKINGS
            </h1>
            <p className="text-sm text-muted-foreground">
              Cumulative points from all tournament sessions
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-4 glow-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Total Players</span>
            </div>
            <p className="text-3xl font-display text-foreground">{rankings.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 glow-card">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Top Score</span>
            </div>
            <p className="text-3xl font-display text-primary text-glow-subtle">
              {rankings[0]?.total_points || 0}
            </p>
          </div>
        </div>

        {/* Rankings Display */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-card rounded-lg border border-border animate-pulse" />
            ))}
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-display text-xl">No players registered yet</p>
            <p className="text-sm">Add players from the Admin panel</p>
          </div>
        ) : (
          <>
            {/* Podium for Top 3 */}
            <Podium rankings={rankings} />

            {/* Rest of Rankings (4+) */}
            {restOfRankings.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Other Contenders
                </h3>
                {restOfRankings.map((ranking) => (
                  <RankingRow key={ranking.player_id} ranking={ranking} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
