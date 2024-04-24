import Search from '@ui/Search';
import Characters from '@components/Characters/CharacterList';
import { useState } from 'react';
import { createChunks } from '@/utils/shared';
import { API_PATHS } from '@/api/constants';
import Pagination from '../UI/Pagination';
import {
  createHashMap,
  getCharacterIdsByHashMap,
  getCharacterUrlsBySearchedPlanets,
  getCharacterUrlsBySearchedSpecies
} from './utils';
import { PAGE_SIZE } from '@/constants';
import { useCharacters, usePlanets, useSpecies } from '@/hooks/useStarWarsAPI';

const CharactersContainer = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const {
    characters,
    isCharactersLoading,
    charactersError,
    charactersPages,
    setCharactersPages,
    allCharactersCount
  } = useCharacters();

  const { planets, planetsError, planetsHashMap } = usePlanets();

  const { species, speciesError, speciesHashMap } = useSpecies();

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
    console.log(
      '🚀 ~ CharactersContainer ~ charactersFilteredByName:',
      charactersFilteredByName
    );

    // Filter characters by homeworld(planets)
    // Get all urls from residents field in planets
    const residentsUrlsSearched = getCharacterUrlsBySearchedPlanets(
      planets,
      search
    );
    // Create hashmap using IDs - for faster filtering
    const planetsHashMap = createHashMap(
      residentsUrlsSearched,
      API_PATHS.CHARACTERS
    );

    // Filter characters by species
    // Get all urls from people field in species
    const speciesUrlsSearched = getCharacterUrlsBySearchedSpecies(
      species,
      search
    );
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
    console.log(
      '🚀 ~ CharactersContainer ~ orderedCharacters:',
      orderedCharacters
    );

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
