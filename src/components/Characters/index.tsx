import Search from '@ui/Search';
import Characters from '@components/Characters/CharacterList';
import { useEffect, useMemo, useState } from 'react';
import { createChunks, generateHashMap, getTotalLength } from '@/utils/shared';
import { Character, HttpMethodsE, Planet, Specie } from '@/types';
import { API_BASE_URL, API_PATHS } from '@/api/constants';
import Pagination from '../UI/Pagination';
import { createHashMap, getCharacterIdsByHashMap } from './utils';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/api/fetch';
import { PAGE_SIZE } from '@/constants';

const CharactersContainer = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
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

  const { data: planets, error: planetsError } = useQuery<Planet[]>({
    queryKey: ['planets'],
    queryFn: () =>
      fetchData({
        url: `${API_BASE_URL}/${API_PATHS.PLANETS}`,
        request: { method: HttpMethodsE.GET }
      })
  });

  const planetsHashMap = useMemo(
    () => planets && generateHashMap(planets, API_PATHS.PLANETS),
    [planets]
  );

  const { data: species, error: speciesError } = useQuery<Specie[]>({
    queryKey: ['species'],
    queryFn: () =>
      fetchData({
        url: `${API_BASE_URL}/${API_PATHS.SPECIES}`,
        request: { method: HttpMethodsE.GET }
      })
  });

  const speciesHashMap = useMemo(
    () => species && generateHashMap(species, API_PATHS.SPECIES),
    [species]
  );

  const handleSearch = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (!characters?.length || !search.trim()) return;

    // Filter characters by name
    const charactersFilteredByName = characters?.filter((character) =>
      character.name?.toLowerCase().includes(search.toLowerCase())
    );

    // Filter characters by homeworld(planets)
    // Get all urls from residents field in planets
    const residentsUrlsSearched =
      planets?.reduce((acc, planet) => {
        if (planet.name.toLowerCase().includes(search.toLowerCase())) {
          acc.push(...planet.residents);
        }

        return acc;
      }, [] as string[]) || [];
    // Create hashmap using IDs - for faster filtering
    const planetsHashMap = createHashMap(
      residentsUrlsSearched,
      API_PATHS.CHARACTERS
    );

    // Filter characters by species
    // Get all urls from people field in species
    const speciesUrlsSearched =
      species?.reduce((acc, specie) => {
        if (specie.name.toLowerCase().includes(search.toLowerCase())) {
          acc.push(...specie.people);
        }

        return acc;
      }, [] as string[]) || [];
    // Create hashmap using IDs - for faster filtering
    const speciesHashMap = createHashMap(
      speciesUrlsSearched,
      API_PATHS.CHARACTERS
    );

    const orderedCharacters = [
      ...charactersFilteredByName,
      ...getCharacterIdsByHashMap(characters, planetsHashMap),
      ...getCharacterIdsByHashMap(characters, speciesHashMap)
    ];

    // Combine all characters, planets, and species - get unique characters
    const uniqueOrderedCharacters = [...new Set(orderedCharacters)];

    // Create pages for pagination
    setCharactersPages(createChunks(uniqueOrderedCharacters, PAGE_SIZE));

    setCurrentPage(0);
  };

  // Props for components
  const charactersProps = {
    charactersPages,
    error: charactersError || planetsError || speciesError,
    isFetchingNextPage: isCharactersLoading,
    isFetching: isCharactersLoading,
    planetsHashMap,
    speciesHashMap,
    currentPage
  };
  const paginationProps = {
    currentPage,
    setCurrentPage,
    isFetchingNextPage: isCharactersLoading,
    hasNextPage: (currentPage + 1) * PAGE_SIZE < allCharactersCount,
    allPagesCount: charactersPages?.length,
    allCharactersCount
  };

  return (
    <>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <div className="mt-[4vh]">
        <Characters {...charactersProps} />
      </div>
      {/* Pagination Controls */}
      <Pagination {...paginationProps} />
    </>
  );
};

export default CharactersContainer;
