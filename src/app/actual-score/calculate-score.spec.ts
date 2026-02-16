import { calculateScore } from './calculate-score';

describe('calculateScore', () => {
  it('adds all non-zero entries', () => {
    expect(calculateScore([5, 10, 2])).toBe(17);
  });

  it('resets to zero after three consecutive zeroes', () => {
    expect(calculateScore([4, 3, 0, 0, 0, 8])).toBe(8);
  });

  it('does not reset for non-consecutive zeroes', () => {
    expect(calculateScore([4, 0, 3, 0, 2])).toBe(9);
  });
});
