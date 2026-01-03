export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface Team {
  id: string;
  name: string;
  players: string[];
}

export interface SetScore {
  setNumber: number;
  teamAScore: number;
  teamBScore: number;
}

export interface Match {
  id: string;
  court: number;
  matchNumber: number;
  teamA: Team;
  teamB: Team;
  sets: SetScore[];
  currentSet: number;
  status: MatchStatus;
  scheduledTime: Date;
  startedAt?: Date;
  finishedAt?: Date;
}

export interface AuditLog {
  id: string;
  matchId: string;
  setNumber: number;
  team: 'A' | 'B';
  previousScore: number;
  newScore: number;
  timestamp: Date;
  action: 'increment' | 'decrement' | 'reset';
}
