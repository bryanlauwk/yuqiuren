import { createContext, useContext } from 'react';
import { useRankingsStore } from '@/hooks/useRankingsStore';

type RankingsContextValue = ReturnType<typeof useRankingsStore>;

const RankingsContext = createContext<RankingsContextValue | null>(null);

export function RankingsProvider({ children }: { children: React.ReactNode }) {
  const rankings = useRankingsStore();

  return (
    <RankingsContext.Provider value={rankings}>
      {children}
    </RankingsContext.Provider>
  );
}

export function useRankings() {
  const context = useContext(RankingsContext);

  if (!context) {
    throw new Error('useRankings must be used within a RankingsProvider');
  }

  return context;
}
