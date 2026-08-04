import type { AbilityKey, AbilityScores } from '@/types/bg3';

export const POINT_BUY_BUDGET = 27;
export const MIN_SCORE = 8;
export const MAX_SCORE = 15;

const COST_TABLE: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export function scoreCost(score: number): number {
  return COST_TABLE[score] ?? 0;
}

export function totalSpent(scores: AbilityScores): number {
  return (Object.values(scores) as number[]).reduce((sum, s) => sum + scoreCost(s), 0);
}

export function pointsRemaining(scores: AbilityScores): number {
  return POINT_BUY_BUDGET - totalSpent(scores);
}

export function canIncrease(scores: AbilityScores, key: AbilityKey): boolean {
  const current = scores[key];
  if (current >= MAX_SCORE) return false;
  const nextCost = scoreCost(current + 1) - scoreCost(current);
  return pointsRemaining(scores) >= nextCost;
}

export function canDecrease(scores: AbilityScores, key: AbilityKey): boolean {
  return scores[key] > MIN_SCORE;
}

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export const DEFAULT_SCORES: AbilityScores = {
  str: 8,
  dex: 8,
  con: 8,
  int: 8,
  wis: 8,
  cha: 8,
};
