import { API_PATHS } from '@/api/constants';
import { ApiPaths, Character, Planet, Specie } from '@/types';
import { getId } from '@/utils/shared';

export const getCharacterUrlsBySearchedPlanets = (
  planets: Planet[],
  searchString: string
) =>
  planets?.reduce((acc, planet) => {
    if (planet.name.toLowerCase().includes(searchString.toLowerCase())) {
      acc.push(...planet.residents);
    }

    return acc;
  }, [] as string[]) || [];

export const getCharacterUrlsBySearchedSpecies = (
  species: Specie[],
  searchString: string
) =>
  species?.reduce((acc, specie) => {
    if (specie.name.toLowerCase().includes(searchString.toLowerCase())) {
      acc.push(...specie.people);
    }

    return acc;
  }, [] as string[]) || [];

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
