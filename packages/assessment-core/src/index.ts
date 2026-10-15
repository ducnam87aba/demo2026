/** Server-only deterministic demo primitive; never import this package from a client. */
export function normalizeFrequency(value: number, reverse = false): number {
  if (!Number.isInteger(value) || value < 1 || value > 5) {
    throw new RangeError('Frequency response must be an integer from 1 to 5.');
  }
  const scoredValue = reverse ? 6 - value : value;
  return ((scoredValue - 1) / 4) * 100;
}