import { API_PATHS } from '@/api/constants';
import { ApiPaths, Character } from '@/types';
import { getId } from '@/utils/shared';

/**
 * Filters an array of characters based on a given hash map.
 *
 * @param {Character[]} characters - The array of characters to filter.
 * @param {Record<string, string>} hashMap - The hash map used for filtering.
 * @return {Character[]} The filtered array of characters.
 */
export const getCharacterIdsByHashMap = (
  characters: Character[],
  hashMap: Record<string, string>
) =>
  characters.filter(
    (character) => hashMap[`${getId(character.url, API_PATHS.CHARACTERS)}`]
  );

export const createHashMap = (items: string[], path: ApiPaths) => {
  const hashMap: Record<string, string> = {};
  items.forEach((url) => {
    if (getId(url, path) !== null) {
      hashMap[`${getId(url, path)}`] = url;
    }
  });
  return hashMap;
};
