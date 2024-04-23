import { API_PATHS } from '@/api/constants';
import { ApiPaths, Character } from '@/types';
import { getId } from '@/utils/shared';

export const getPlanetsUrls = (allCharacters: Character[]) => [
  ...new Set(
    allCharacters?.reduce((planetUrls: string[], character) => {
      if (character.homeworld) {
        planetUrls.push(character.homeworld);
      }
      return planetUrls;
    }, [])
  )
];

export const getSpeciesUrls = (allCharacters: Character[]) => [
  ...new Set(
    allCharacters?.reduce((specieUrls: string[], character) => {
      const species = character.species?.map((specie) => specie);
      if (species) {
        specieUrls.push(...species);
      }
      return specieUrls;
    }, [])
  )
];

export const getCharacterIdsByHashMap = (
  characters: Character[],
  hashMap: Record<string, string>
) =>
  characters.filter((character) => {
    return hashMap[`${getId(character.url, API_PATHS.CHARACTERS)}`];
  });

export const createHashMap = (items: string[], path: ApiPaths) => {
  const hashMap: Record<string, string> = {};
  items.forEach((url) => {
    if (getId(url, path) !== null) {
      hashMap[`${getId(url, path)}`] = url;
    }
  });
  return hashMap;
};
