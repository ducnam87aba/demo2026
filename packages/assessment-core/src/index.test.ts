import { describe, expect, it } from 'vitest';
import { normalizeFrequency } from './index.js';

describe('normalizeFrequency', () => {
  it.each([[1, 0], [3, 50], [5, 100]])('normalizes %i to %i', (input, expected) => {
    expect(normalizeFrequency(input)).toBe(expected);
  });

  it('reverses a frequency response', () => {
    expect(normalizeFrequency(1, true)).toBe(100);
  });

  it.each([0, 1.5, 6])('rejects invalid value %s', (input) => {
    expect(() => normalizeFrequency(input)).toThrow(RangeError);
  });
});