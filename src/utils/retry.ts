'use client';

/**
 * Retries a promise a given number of times with exponential backoff.
 *
 * @param {number} retries The number of times to retry the promise
 * @param {() => Promise<T>} fn The promise to retry
 * @returns {Promise<T>} The result of the promise if it succeeds, otherwise throws the last error
 */
export async function retryPromise<T>(retries: number, fn: () => Promise<T>): Promise<T> {
  let attempt = 1;
  let delay = 1000; // initial delay of 1 second
  while (attempt <= retries) {
    try {
      const result = await fn();
      return result;
    } catch (error) {
      attempt++;
      if (attempt > retries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2; // exponential backoff
    }
  }
  throw new Error('Promise failed after all retries and did not return a result');
}
