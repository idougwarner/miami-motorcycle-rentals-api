import * as Bluebird from 'bluebird';
export async function processInBatches<T, R>(
  items: T[],
  handler: (item: T) => Promise<R>,
  batchSize: number,
  concurrency: number,
): Promise<R[]> {
  const results: R[] = [];

  // Create an array to hold all promise batches
  const allBatches: Promise<R[]>[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    // Instead of awaiting here, push the promise into the array
    allBatches.push(Bluebird.map(batch, handler, { concurrency }));
  }

  /**
   * Wait for all batches to settle
   * Important!:
   *   By it potentially `items`/`batchSize` (`concurrency` images * `items`/`batchSize` batches) images could be processed at the same time.
   *     ex: potentially 6000/100 (10 images * 60 batches) images could be processed at the same time
   *   Thus, By images size of per item, need to adjust `batchSize` and `concurrency` params to avoid hitting aws s3 upload rate limits
   */
  const allSettledResults = await Promise.allSettled(allBatches);

  // Extract the successful results
  for (const result of allSettledResults) {
    if (result.status === 'fulfilled') {
      results.push(...result.value);
    } else {
      console.error('Batch promise rejected:', result.reason);
    }
  }

  return results;
}
