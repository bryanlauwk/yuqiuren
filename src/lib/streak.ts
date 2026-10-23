/** Streak bonus for the Nth consecutive title: +0, +1, +2 … with no cap. */
export function getStreakBonus(consecutiveTitles: number): number {
  return Math.max(0, consecutiveTitles - 1);
}
