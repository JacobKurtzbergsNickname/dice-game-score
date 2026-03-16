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

  it('returns zero for empty entries', () => {
    expect(calculateScore([])).toBe(0);
  });

  it('two consecutive zeroes do not reset', () => {
    expect(calculateScore([10, 0, 0, 5])).toBe(15);
  });

  it('still requires three consecutive zeroes for a second reset after the first reset', () => {
    // one zero after reset — no new reset
    expect(calculateScore([5, 0, 0, 0, 3, 0])).toBe(3);
    // two zeroes after reset — no new reset
    expect(calculateScore([5, 0, 0, 0, 3, 0, 0])).toBe(3);
    // three zeroes after reset — second reset
    expect(calculateScore([5, 0, 0, 0, 3, 0, 0, 0])).toBe(0);
  });

  it('non-zero entry between zero runs resets the zero streak', () => {
    // two zeroes, then a non-zero, then two zeroes: no reset (streak broken)
    expect(calculateScore([10, 0, 0, 5, 0, 0])).toBe(15);
  });

  it('handles multiple consecutive resets', () => {
    expect(calculateScore([5, 0, 0, 0, 4, 0, 0, 0, 3])).toBe(3);
  });

  it('a fourth zero after a reset does not cause a second reset', () => {
    expect(calculateScore([5, 0, 0, 0, 0])).toBe(0); // score was already 0 from first reset
    expect(calculateScore([5, 0, 0, 0, 3, 0])).toBe(3); // one zero after rebuild — no reset
  });
});
