import { PAGE_SIZE } from '@/constants';
import { ApiPaths } from '@/types';

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

  if (index > 0 && index < urlParts.length) {
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
  chunkSize: number | undefined = PAGE_SIZE
) => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, [] as T[][]);
};

/**
 * Generates a hash map from an array of items, where the key is the ID extracted
 * from the item's URL using the provided path, and the value is the item itself.
 *
 * @param {T[]} items - The array of items to generate the hash map from.
 * @param {ApiPaths} path - The path to extract the ID from the item's URL.
 * @return {Record<string, T>} The generated hash map.
 */
export const generateHashMap = <T extends { url: string }>(
  items: T[],
  path: ApiPaths
) => {
  const hashMap: Record<string, T> = {};
  items.forEach((obj: T) => {
    if (getId(obj.url, path) !== null) {
      hashMap[`${getId(obj.url, path)}`] = obj;
    }
  });
  return hashMap;
};

/**
 * Calculates the total length of a two-dimensional array by flattening it and returning the length of the resulting one-dimensional array.
 *
 * @param {any[][]} arr - The two-dimensional array to calculate the total length of.
 * @return {number} The total length of the flattened array.
 */
export const getTotalLength = (arr: any[][]) => {
  return arr.flat().length;
};
