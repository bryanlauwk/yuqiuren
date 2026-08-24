export interface Tier {
  key: 'lindan' | 'lcw' | 'taufik' | 'gade' | 'rookie';
  /** CSS variable name holding the tier color (HSL triplet). */
  token: string;
  labelZh: string;
  labelEn: string;
  min: number;
}

/** Highest first — first match wins. */
export const TIERS: Tier[] = [
  { key: 'lindan', token: '--tier-legend', labelZh: '林丹杯', labelEn: 'LIN DAN CUP', min: 60 },
  { key: 'lcw', token: '--tier-master', labelZh: '李宗伟杯', labelEn: 'LEE C.W. CUP', min: 40 },
  { key: 'taufik', token: '--tier-diamond', labelZh: '陶菲克杯', labelEn: 'TAUFIK CUP', min: 25 },
  { key: 'gade', token: '--tier-platinum', labelZh: '盖德杯', labelEn: 'GADE CUP', min: 12 },
  { key: 'rookie', token: '--tier-gold', labelZh: '新拍杯', labelEn: 'ROOKIE CUP', min: 0 },
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
