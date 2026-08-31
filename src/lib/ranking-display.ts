import type { PlayerRanking, SessionResult, TournamentSession } from '@/types/ranking';

export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getWinRate(ranking: PlayerRanking) {
  return ranking.sessions_played > 0
    ? Math.round((ranking.championships / ranking.sessions_played) * 100)
    : 0;
}

export function getAveragePoints(ranking: PlayerRanking) {
  return ranking.sessions_played > 0
    ? (ranking.total_points / ranking.sessions_played).toFixed(1)
    : '0.0';
}

export function getBestChampionshipStreak(
  playerId: string,
  sessions: TournamentSession[],
  results: SessionResult[],
) {
  const resultBySession = new Map(
    results
      .filter((result) => result.player_id === playerId)
      .map((result) => [result.session_id, result.result_type]),
  );

  let current = 0;
  let best = 0;

  [...sessions]
    .sort((a, b) => a.session_date.localeCompare(b.session_date))
    .forEach((session) => {
      if (resultBySession.get(session.id) === 'champion') {
        current += 1;
        best = Math.max(best, current);
      } else {
        current = 0;
      }
    });

  return best;
}
