export interface Player {
  id: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
}

export interface TournamentSession {
  id: string;
  session_date: string;
  session_type: '3_teams' | '2_teams';
  name: string | null;
  created_at: string;
}

export interface SessionResult {
  id: string;
  session_id: string;
  player_id: string;
  result_type: 'champion' | 'runner_up' | 'attendance';
  base_points: number;
  streak_bonus: number;
  total_points: number;
  created_at: string;
}

export interface PlayerRanking {
  player_id: string;
  player_name: string;
  avatar_url: string | null;
  total_points: number;
  sessions_played: number;
  championships: number;
  rank: number;
  rank_change: number; // positive = moved up, negative = moved down, 0 = no change
  is_new: boolean; // true if player joined in the latest session
}

export type SessionType = '3_teams' | '2_teams';
export type ResultType = 'champion' | 'runner_up' | 'attendance';
