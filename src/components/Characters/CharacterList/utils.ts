import { Character } from '@/types';

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
