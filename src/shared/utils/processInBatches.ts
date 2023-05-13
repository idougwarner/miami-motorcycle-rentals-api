import * as Bluebird from 'bluebird';
export async function processInBatches<T, R>(
  items: T[],
  handler: (item: T) => Promise<R>,
  batchSize: number,
  concurrency: number,
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Bluebird.map(batch, handler, { concurrency });
    results.push(...batchResults);
  }

  return results;
}
