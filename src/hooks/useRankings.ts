import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Player, TournamentSession, SessionResult, PlayerRanking, SessionType, ResultType } from '@/types/ranking';

export function useRankings() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [sessions, setSessions] = useState<TournamentSession[]>([]);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [playersRes, sessionsRes, resultsRes] = await Promise.all([
        supabase.from('players').select('*').order('name'),
        supabase.from('tournament_sessions').select('*').order('session_date', { ascending: false }),
        supabase.from('session_results').select('*'),
      ]);

      if (playersRes.data) setPlayers(playersRes.data);
      if (sessionsRes.data) setSessions(sessionsRes.data as TournamentSession[]);
      if (resultsRes.data) setResults(resultsRes.data as SessionResult[]);
    } catch (error) {
      console.error('Error fetching ranking data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Subscribe to realtime updates
    const playersChannel = supabase
      .channel('players-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, fetchData)
      .subscribe();

    const resultsChannel = supabase
      .channel('results-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'session_results' }, fetchData)
      .subscribe();

    return () => {
      supabase.removeChannel(playersChannel);
      supabase.removeChannel(resultsChannel);
    };
  }, []);

  // Helper to calculate rankings from a subset of results
  const calculateRankingsFromResults = (
    playerList: Player[],
    resultList: SessionResult[]
  ): Map<string, number> => {
    const playerStats = new Map<string, number>();
    
    playerList.forEach(player => {
      playerStats.set(player.id, 0);
    });
    
    resultList.forEach(result => {
      const current = playerStats.get(result.player_id) || 0;
      playerStats.set(result.player_id, current + result.total_points);
    });
    
    // Sort by points and assign ranks
    const sorted = Array.from(playerStats.entries())
      .sort((a, b) => b[1] - a[1]);
    
    const rankMap = new Map<string, number>();
    sorted.forEach(([playerId], index) => {
      rankMap.set(playerId, index + 1);
    });
    
    return rankMap;
  };

  // Calculate rankings with rank changes
  const rankings = useMemo((): PlayerRanking[] => {
    const playerStats = new Map<string, { 
      total_points: number; 
      sessions_played: number; 
      championships: number;
      name: string;
      avatar_url: string | null;
    }>();

    // Initialize all players
    players.forEach(player => {
      playerStats.set(player.id, {
        total_points: 0,
        sessions_played: 0,
        championships: 0,
        name: player.name,
        avatar_url: player.avatar_url,
      });
    });

    // Aggregate results
    results.forEach(result => {
      const stats = playerStats.get(result.player_id);
      if (stats) {
        stats.total_points += result.total_points;
        stats.sessions_played += 1;
        if (result.result_type === 'champion') {
          stats.championships += 1;
        }
      }
    });

    // Find the most recent session
    const latestSession = sessions.length > 0 ? sessions[0] : null;
    
    // Get results excluding the latest session to calculate previous rankings
    const previousResults = latestSession 
      ? results.filter(r => r.session_id !== latestSession.id)
      : results;
    
    // Get player IDs who participated in the latest session
    const latestSessionPlayerIds = latestSession
      ? new Set(results.filter(r => r.session_id === latestSession.id).map(r => r.player_id))
      : new Set<string>();
    
    // Calculate previous rankings
    const previousRankMap = calculateRankingsFromResults(players, previousResults);

    // Convert to array and sort with tiebreakers
    const rankingList = Array.from(playerStats.entries())
      .map(([player_id, stats]) => ({
        player_id,
        player_name: stats.name,
        avatar_url: stats.avatar_url,
        total_points: stats.total_points,
        sessions_played: stats.sessions_played,
        championships: stats.championships,
        rank: 0,
        rank_change: 0,
        is_new: false,
      }))
      .sort((a, b) => {
        // 1. Total points (descending)
        if (b.total_points !== a.total_points) return b.total_points - a.total_points;
        // 2. Championships (descending)
        if (b.championships !== a.championships) return b.championships - a.championships;
        // 3. Sessions played (ascending - fewer is better at same points)
        if (a.sessions_played !== b.sessions_played) return a.sessions_played - b.sessions_played;
        // 4. Alphabetical by name
        return a.player_name.localeCompare(b.player_name);
      });

    // Assign ranks and calculate rank changes
    rankingList.forEach((item, index) => {
      item.rank = index + 1;
      
      const previousRank = previousRankMap.get(item.player_id);
      const hadPointsBefore = previousResults.some(r => r.player_id === item.player_id);
      
      if (!hadPointsBefore && latestSessionPlayerIds.has(item.player_id)) {
        // Player just joined in the latest session
        item.is_new = true;
        item.rank_change = 0;
      } else if (previousRank !== undefined && hadPointsBefore) {
        // Player had a previous rank
        item.rank_change = previousRank - item.rank; // Positive = moved up
      }
    });

    return rankingList;
  }, [players, results, sessions]);

  // Calculate consecutive championship streak for a player
  const calculateStreakBonus = async (playerId: string): Promise<number> => {
    // Get all sessions ordered by date
    const { data: orderedSessions } = await supabase
      .from('tournament_sessions')
      .select('id')
      .order('session_date', { ascending: false });

    if (!orderedSessions || orderedSessions.length === 0) return 0;

    // Get player's results
    const { data: playerResults } = await supabase
      .from('session_results')
      .select('session_id, result_type')
      .eq('player_id', playerId);

    if (!playerResults) return 0;

    const championSessions = new Set(
      playerResults
        .filter(r => r.result_type === 'champion')
        .map(r => r.session_id)
    );

    // Count consecutive championships from most recent
    let streak = 0;
    for (const session of orderedSessions) {
      if (championSessions.has(session.id)) {
        streak++;
      } else {
        break;
      }
    }

    // Calculate bonus (0 for first win, +1 for 2nd, +2 for 3rd, +3 for 4th, +4 for 5+)
    if (streak <= 1) return 0;
    if (streak === 2) return 1;
    if (streak === 3) return 2;
    if (streak === 4) return 3;
    return 4; // 5+ consecutive
  };

  // Add a new player
  const addPlayer = async (name: string, avatarUrl?: string) => {
    const { error } = await supabase.from('players').insert({ 
      name,
      avatar_url: avatarUrl || null 
    });
    if (error) throw error;
  };

  // Update player avatar
  const updatePlayerAvatar = async (playerId: string, avatarUrl: string | null) => {
    const { error } = await supabase
      .from('players')
      .update({ avatar_url: avatarUrl })
      .eq('id', playerId);
    if (error) throw error;
  };

  // Delete a player
  const deletePlayer = async (id: string) => {
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (error) throw error;
  };

  // Create a new session
  const createSession = async (sessionDate: string, sessionType: SessionType, name?: string) => {
    const { data, error } = await supabase
      .from('tournament_sessions')
      .insert({ session_date: sessionDate, session_type: sessionType, name })
      .select()
      .single();
    if (error) throw error;
    return data as TournamentSession;
  };

  // Delete a session
  const deleteSession = async (id: string) => {
    const { error } = await supabase.from('tournament_sessions').delete().eq('id', id);
    if (error) throw error;
  };

  // Get base points for a result type and session type
  const getBasePoints = (sessionType: SessionType, resultType: ResultType): number => {
    if (sessionType === '3_teams') {
      switch (resultType) {
        case 'champion': return 3;
        case 'runner_up': return 2;
        case 'attendance': return 1;
      }
    } else {
      switch (resultType) {
        case 'champion': return 2;
        case 'runner_up': return 1;
        case 'attendance': return 0;
      }
    }
  };

  // Record session results for multiple players
  const recordResults = async (
    sessionId: string,
    sessionType: SessionType,
    champions: string[],
    runnerUps: string[],
    attendance: string[]
  ) => {
    const resultsToInsert: Array<{
      session_id: string;
      player_id: string;
      result_type: ResultType;
      base_points: number;
      streak_bonus: number;
      total_points: number;
    }> = [];

    // Process champions with streak bonus
    for (const playerId of champions) {
      const basePoints = getBasePoints(sessionType, 'champion');
      const streakBonus = await calculateStreakBonus(playerId);
      resultsToInsert.push({
        session_id: sessionId,
        player_id: playerId,
        result_type: 'champion',
        base_points: basePoints,
        streak_bonus: streakBonus,
        total_points: basePoints + streakBonus,
      });
    }

    // Process runner-ups (no streak bonus)
    for (const playerId of runnerUps) {
      const basePoints = getBasePoints(sessionType, 'runner_up');
      resultsToInsert.push({
        session_id: sessionId,
        player_id: playerId,
        result_type: 'runner_up',
        base_points: basePoints,
        streak_bonus: 0,
        total_points: basePoints,
      });
    }

    // Process attendance (only for 3-team sessions)
    if (sessionType === '3_teams') {
      for (const playerId of attendance) {
        const basePoints = getBasePoints(sessionType, 'attendance');
        resultsToInsert.push({
          session_id: sessionId,
          player_id: playerId,
          result_type: 'attendance',
          base_points: basePoints,
          streak_bonus: 0,
          total_points: basePoints,
        });
      }
    }

    const { error } = await supabase.from('session_results').insert(resultsToInsert);
    if (error) throw error;
  };

  // Update session results (delete existing and re-record)
  const updateSessionResults = async (
    sessionId: string,
    sessionType: SessionType,
    champions: string[],
    runnerUps: string[],
    attendance: string[]
  ) => {
    // Delete existing results for this session
    const { error: deleteError } = await supabase
      .from('session_results')
      .delete()
      .eq('session_id', sessionId);
    
    if (deleteError) throw deleteError;

    // Re-record the results
    await recordResults(sessionId, sessionType, champions, runnerUps, attendance);
  };

  return {
    players,
    sessions,
    results,
    rankings,
    loading,
    addPlayer,
    deletePlayer,
    updatePlayerAvatar,
    createSession,
    deleteSession,
    recordResults,
    updateSessionResults,
    refetch: fetchData,
  };
}
