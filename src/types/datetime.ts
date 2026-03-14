/**
 * Returns the current datetime, optionally shifted back 3 years for testing.
 *
 * @param testMode - If true, returns a date 3 years in the past (default: false)
 * @returns Current Date (or 3 years ago if testMode is true)
 */
export function getCurrentDatetime(testMode: boolean = false): Date {
  const now = new Date();
  if (testMode) {
    now.setFullYear(now.getFullYear() - 3);
  }
  return now;
}
