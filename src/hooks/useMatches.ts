import { useState, useMemo } from 'react';
import { Match, MatchStatus, SetScore } from '@/types/match';
import { mockMatches } from '@/data/mockMatches';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>(mockMatches);

  const updateScore = (matchId: string, team: 'A' | 'B', delta: number) => {
    setMatches(prev => prev.map(match => {
      if (match.id !== matchId) return match;
      
      const updatedSets = [...match.sets];
      const currentSetIndex = updatedSets.findIndex(s => s.setNumber === match.currentSet);
      
      if (currentSetIndex !== -1) {
        const currentSet = { ...updatedSets[currentSetIndex] };
        if (team === 'A') {
          currentSet.teamAScore = Math.max(0, Math.min(30, currentSet.teamAScore + delta));
        } else {
          currentSet.teamBScore = Math.max(0, Math.min(30, currentSet.teamBScore + delta));
        }
        updatedSets[currentSetIndex] = currentSet;
      }
      
      return { ...match, sets: updatedSets };
    }));
  };

  const updateStatus = (matchId: string, status: MatchStatus) => {
    setMatches(prev => prev.map(match => {
      if (match.id !== matchId) return match;
      
      const updates: Partial<Match> = { status };
      
      if (status === 'live' && match.status === 'scheduled') {
        updates.startedAt = new Date();
        updates.currentSet = 1;
        updates.sets = [{ setNumber: 1, teamAScore: 0, teamBScore: 0 }];
      } else if (status === 'finished') {
        updates.finishedAt = new Date();
      }
      
      return { ...match, ...updates };
    }));
  };

  const resetSet = (matchId: string) => {
    setMatches(prev => prev.map(match => {
      if (match.id !== matchId) return match;
      
      const updatedSets = match.sets.map(set => 
        set.setNumber === match.currentSet 
          ? { ...set, teamAScore: 0, teamBScore: 0 }
          : set
      );
      
      return { ...match, sets: updatedSets };
    }));
  };

  const newSet = (matchId: string) => {
    setMatches(prev => prev.map(match => {
      if (match.id !== matchId || match.currentSet >= 3) return match;
      
      const newSetNumber = match.currentSet + 1;
      const newSetData: SetScore = { 
        setNumber: newSetNumber, 
        teamAScore: 0, 
        teamBScore: 0 
      };
      
      return { 
        ...match, 
        sets: [...match.sets, newSetData],
        currentSet: newSetNumber
      };
    }));
  };

  const sortedMatches = useMemo(() => {
    const statusOrder = { live: 0, scheduled: 1, finished: 2 };
    return [...matches].sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime();
    });
  }, [matches]);

  const liveMatches = useMemo(() => 
    matches.filter(m => m.status === 'live'), 
    [matches]
  );

  const todayMatches = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return sortedMatches.filter(m => {
      const matchDate = new Date(m.scheduledTime);
      return matchDate >= today && matchDate < tomorrow;
    });
  }, [sortedMatches]);

  return {
    matches: sortedMatches,
    liveMatches,
    todayMatches,
    updateScore,
    updateStatus,
    resetSet,
    newSet,
    getMatch: (id: string) => matches.find(m => m.id === id),
  };
}
