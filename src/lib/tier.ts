export interface Tier {
  key: 'legend' | 'master' | 'diamond' | 'platinum' | 'gold';
  /** CSS variable name holding the tier color (HSL triplet). */
  token: string;
  labelZh: string;
  labelEn: string;
  min: number;
}

/** Highest first — first match wins. */
export const TIERS: Tier[] = [
  { key: 'legend', token: '--tier-legend', labelZh: '王者', labelEn: 'LEGEND', min: 60 },
  { key: 'master', token: '--tier-master', labelZh: '宗师', labelEn: 'MASTER', min: 40 },
  { key: 'diamond', token: '--tier-diamond', labelZh: '钻石', labelEn: 'DIAMOND', min: 25 },
  { key: 'platinum', token: '--tier-platinum', labelZh: '白金', labelEn: 'PLATINUM', min: 12 },
  { key: 'gold', token: '--tier-gold', labelZh: '黄金', labelEn: 'GOLD', min: 0 },
];

export function getTier(points: number): Tier {
  return TIERS.find((tier) => points >= tier.min) ?? TIERS[TIERS.length - 1];
}

/** Progress (0-1) toward the next tier; 1 when already at the top tier. */
export function tierProgress(points: number): number {
  const index = TIERS.findIndex((tier) => points >= tier.min);
  if (index <= 0) return 1;
  const current = TIERS[index];
  const next = TIERS[index - 1];
  const span = next.min - current.min;
  if (span <= 0) return 1;
  return Math.min(1, Math.max(0, (points - current.min) / span));
}
