import { API_BASE_URL } from '@/api/constants';
import { ApiPaths, Page } from '@/types';

/**
 * Extracts the ID from a given URL string based on the specified type.
 *
 * @param {string} url - The URL string from which to extract the ID.
 * @param {string} type - The type of ID to extract.
 * @return {number | null} The extracted ID as a number, or null if no ID is found.
 */
export const getId = (url: string, type: string): number | null => {
  if (!url || !type) return null;

  const urlParts = url.split('/');
  const index = urlParts.findIndex((part) => part === type) + 1;

  if (index > 0 && index < urlParts.length - 1) {
    const numberString = urlParts[index];
    return parseInt(numberString);
  }

  return null;
};

/**
 * A function that creates chunks from an input array based on the specified chunk size.
 *
 * @param {any[]} inputArray - The array to create chunks from.
 * @param {number | undefined} chunkSize - The size of each chunk. Defaults to 10 if not provided.
 * @return {any[]} The array of created chunks.
 */
export const createChunks = <T>(
  inputArray: T[],
  chunkSize: number | undefined = 10
) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = {
        results: [],
        count: inputArray.length,
        next: null,
        previous: null
      };
    }

    resultArray[chunkIndex].results.push(item);

    return resultArray;
  }, [] as Page<T>[]);
};

/**
 * Retrieves custom URLs based on the provided items, object key, and path identifier.
 *
 * @param {Object} options - The options object.
 * @param {T[]} options.items - The array of items.
 * @param {keyof T} options.objectKey - The key of the object to retrieve URLs from.
 * @param {ApiPaths} options.pathIdentifier - The path identifier.
 * @return {string[]} The array of custom URLs.
 */
export const getCustomUrls = <T extends Record<string, any>>({
  items,
  objectKey,
  pathIdentifier
}: {
  items: T[];
  objectKey: keyof T;
  pathIdentifier: ApiPaths;
}) => {
  return items.reduce((acc: string[], item: any) => {
    // Add type annotations for acc and item
    if (item[objectKey]) {
      if (Array.isArray(item[objectKey])) {
        const urls = item[objectKey]?.map(
          (itemUrl: any) =>
            `${API_BASE_URL}/${pathIdentifier}/${getId(
              itemUrl,
              pathIdentifier
            )}/`
        );
        acc.push(...urls);
      } else {
        acc.push(item[objectKey]);
      }
    }
    return acc;
  }, []);
};
