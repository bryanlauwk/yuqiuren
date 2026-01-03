import { Header } from '@/components/Header';
import { RankingRow } from '@/components/RankingRow';
import { useRankings } from '@/hooks/useRankings';
import { Trophy, Users } from 'lucide-react';

export default function RankingPage() {
  const { rankings, loading } = useRankings();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display tracking-wide">PLAYER RANKINGS</h1>
            <p className="text-sm text-muted-foreground">
              Cumulative points from all tournament sessions
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Total Players</span>
            </div>
            <p className="text-2xl font-display text-foreground">{rankings.length}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Top Score</span>
            </div>
            <p className="text-2xl font-display text-primary">
              {rankings[0]?.total_points || 0}
            </p>
          </div>
        </div>

        {/* Rankings List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-card rounded-lg border border-border animate-pulse" />
            ))}
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No players registered yet</p>
            <p className="text-sm">Add players from the Admin panel</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rankings.map((ranking) => (
              <RankingRow key={ranking.player_id} ranking={ranking} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
