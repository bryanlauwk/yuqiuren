import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { MatchFilters } from '@/components/MatchFilters';
import { useMatches } from '@/hooks/useMatches';

type FilterOption = 'all' | 'today' | 'live';

export default function Scoreboard() {
  const { matches, liveMatches, todayMatches } = useMatches();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('live');

  const filteredMatches = useMemo(() => {
    switch (activeFilter) {
      case 'live':
        return liveMatches.length > 0 ? liveMatches : matches;
      case 'today':
        return todayMatches;
      case 'all':
      default:
        return matches;
    }
  }, [activeFilter, matches, liveMatches, todayMatches]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-4 space-y-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl tracking-wide">Live Scoreboard</h1>
          <p className="text-sm text-muted-foreground">
            {liveMatches.length} match{liveMatches.length !== 1 ? 'es' : ''} in progress
          </p>
        </div>

        <MatchFilters 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          liveCount={liveMatches.length}
        />

        {filteredMatches.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No matches found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
