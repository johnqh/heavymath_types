import { describe, it, expect } from 'vitest';
import { getCurrentDatetime } from './datetime.js';

describe('getCurrentDatetime', () => {
  it('returns a date close to now by default', () => {
    const before = new Date();
    const result = getCurrentDatetime();
    const after = new Date();

    expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it('returns a date close to now when testMode is false', () => {
    const before = new Date();
    const result = getCurrentDatetime(false);
    const after = new Date();

    expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it('returns a date ~3 years in the past when testMode is true', () => {
    const now = new Date();
    const result = getCurrentDatetime(true);

    const expectedYear = now.getFullYear() - 3;
    expect(result.getFullYear()).toBe(expectedYear);
    expect(result.getMonth()).toBe(now.getMonth());
    expect(result.getDate()).toBe(now.getDate());
  });
});
