import { describe, expect, it } from 'vitest';
import { getStreakBonus } from './streak';

describe('getStreakBonus', () => {
  it('1st title gives +0', () => expect(getStreakBonus(1)).toBe(0));
  it('4 in a row gives +3', () => expect(getStreakBonus(4)).toBe(3));
  it('5 in a row gives +4', () => expect(getStreakBonus(5)).toBe(4));
  it('6 in a row gives +5 (no cap)', () => expect(getStreakBonus(6)).toBe(5));
});
