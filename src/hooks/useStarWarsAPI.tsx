import { API_BASE_URL, API_PATHS } from '@/api/constants';
import { fetchData } from '@/api/fetch';
import { PAGE_SIZE } from '@/constants';
import { Character, HttpMethodsE, Planet, Specie } from '@/types';
import { createChunks, generateHashMap, getTotalLength } from '@/utils/shared';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export const useCharacters = () => {
  const [charactersPages, setCharactersPages] = useState<Character[][]>([]);

  const {
    data: characters,
    isLoading: isCharactersLoading,
    error: charactersError
  } = useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: () =>
      fetchData({
        url: `${API_BASE_URL}/${API_PATHS.CHARACTERS}`,
        request: { method: HttpMethodsE.GET }
      })
  });

  const charactersChunks = useMemo(
    () => characters && createChunks(characters, PAGE_SIZE),
    [characters]
  );

  useEffect(
    () => charactersChunks && setCharactersPages(charactersChunks),
    [charactersChunks]
  );

  const allCharactersCount = useMemo(
    () => charactersPages && getTotalLength(charactersPages),
    [charactersPages]
  );

  return {
    characters,
    isCharactersLoading,
    charactersError,
    charactersPages,
    setCharactersPages,
    allCharactersCount
  };
};

export const usePlanets = () => {
  const {
    data: planets = [],
    isLoading: isPlanetsLoading,
    error: planetsError
  } = useQuery<Planet[]>({
    queryKey: ['planets'],
    queryFn: () =>
      fetchData({
        url: `${API_BASE_URL}/${API_PATHS.PLANETS}`,
        request: { method: HttpMethodsE.GET }
      })
  });

  const planetsHashMap = useMemo(
    () => generateHashMap(planets, API_PATHS.PLANETS),
    [planets]
  );

  return { planets, isPlanetsLoading, planetsError, planetsHashMap };
};

export const useSpecies = () => {
  const { data: species = [], error: speciesError } = useQuery<Specie[]>({
    queryKey: ['species'],
    queryFn: () =>
      fetchData({
        url: `${API_BASE_URL}/${API_PATHS.SPECIES}`,
        request: { method: HttpMethodsE.GET }
      })
  });

  const speciesHashMap = useMemo(
    () => generateHashMap(species, API_PATHS.SPECIES),
    [species]
  );

  return { species, speciesError, speciesHashMap };
};
