import { getWinRate } from '@/lib/ranking-display';
import type { PlayerRanking, SessionResult, TournamentSession } from '@/types/ranking';

export type RankingView = 'overall' | 'recent5' | 'winRate';

function withViewRanks(
  rows: PlayerRanking[],
  compare: (a: PlayerRanking, b: PlayerRanking) => number,
  isTied: (a: PlayerRanking, b: PlayerRanking) => boolean,
) {
  const sorted = [...rows].sort(compare);

  return sorted.map((row, index) => ({
    ...row,
    rank: index + 1,
    rank_change: 0,
    is_new: false,
    is_tied:
      (index > 0 && isTied(row, sorted[index - 1])) ||
      (index < sorted.length - 1 && isTied(row, sorted[index + 1])),
  }));
}

export function buildRecentRankings(
  rankings: PlayerRanking[],
  sessions: TournamentSession[],
  results: SessionResult[],
  sessionCount = 5,
) {
  const recentSessionIds = new Set(
    [...sessions]
      .sort((a, b) => b.session_date.localeCompare(a.session_date))
      .slice(0, sessionCount)
      .map((session) => session.id),
  );

  const stats = new Map<
    string,
    { total_points: number; sessions_played: number; championships: number }
  >();

  results.forEach((result) => {
    if (!recentSessionIds.has(result.session_id)) return;

    const current = stats.get(result.player_id) ?? {
      total_points: 0,
      sessions_played: 0,
      championships: 0,
    };

    current.total_points += result.total_points;
    current.sessions_played += 1;
    if (result.result_type === 'champion') current.championships += 1;
    stats.set(result.player_id, current);
  });

  const rows = rankings.map((ranking) => ({
    ...ranking,
    ...(stats.get(ranking.player_id) ?? {
      total_points: 0,
      sessions_played: 0,
      championships: 0,
    }),
  }));

  return withViewRanks(
    rows,
    (a, b) =>
      b.total_points - a.total_points ||
      b.championships - a.championships ||
      a.sessions_played - b.sessions_played ||
      a.player_name.localeCompare(b.player_name),
    (a, b) =>
      a.total_points === b.total_points &&
      a.championships === b.championships &&
      a.sessions_played === b.sessions_played,
  );
}

export function buildWinRateRankings(rankings: PlayerRanking[]) {
  const rate = (ranking: PlayerRanking) =>
    ranking.sessions_played > 0 ? ranking.championships / ranking.sessions_played : -1;

  return withViewRanks(
    rankings,
    (a, b) =>
      rate(b) - rate(a) ||
      b.sessions_played - a.sessions_played ||
      b.championships - a.championships ||
      b.total_points - a.total_points ||
      a.player_name.localeCompare(b.player_name),
    (a, b) =>
      getWinRate(a) === getWinRate(b) &&
      a.sessions_played === b.sessions_played &&
      a.championships === b.championships,
  );
}
