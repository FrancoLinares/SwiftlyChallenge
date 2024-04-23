import Search from '@ui/Search';
import Characters from '@components/Characters/CharacterList';
import { useEffect, useMemo, useState } from 'react';
import { getCustomUrls } from '@/utils/shared';
import useFetch from '@hooks/useFetch';
import { Character, Page, Planet, Specie } from '@/types';
import { API_BASE_URL, API_PATHS } from '@/api/constants';
import Pagination from '../UI/Pagination';
import { getPlanetsUrls, getSpeciesUrls } from './CharacterList/utils';

const CHARACTERS_INITIAL_PAGE = '1';

const CharactersContainer = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [charactersPages, setCharactersPages] = useState<Page<Character>[]>([]);

  const allCharactersCount = charactersPages[0]?.count || 0;

  const characterUrl = useMemo(
    () => [`${API_BASE_URL}/${API_PATHS.CHARACTERS}`],
    []
  );
  const {
    data: allCharacters,
    pages: characterPages,
    makeRequests: makeCharacterRequest,
    isLoading: isLoadingCharacters,
    error
  } = useFetch<Character>({
    path: API_PATHS.CHARACTERS,
    urls: characterUrl,
    initialQueryParams: {
      page: CHARACTERS_INITIAL_PAGE
    },
    returnPages: true
  });

  useEffect(() => setCharactersPages(characterPages || []), [characterPages]);

  const planetsUrls = useMemo(
    () => getPlanetsUrls(allCharacters || []),
    [allCharacters]
  );

  const speciesUrls = useMemo(
    () => getSpeciesUrls(allCharacters || []),
    [allCharacters]
  );

  const { cache: planetHashMap, makeRequests: makePlanetsRequest } =
    useFetch<Planet>({
      path: API_PATHS.PLANETS,
      urls: planetsUrls
    });

  const { cache: speciesHashMap, makeRequests: makeSpeciesRequest } =
    useFetch<Specie>({
      path: API_PATHS.SPECIES,
      urls: speciesUrls
    });

  const handleSearch = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    // Search for Characters
    const searchedCharacters = await makeCharacterRequest(
      [`${API_BASE_URL}/${API_PATHS.CHARACTERS}`],
      {
        search
      }
    );
    const characterUrls = getCustomUrls<Character>({
      items: searchedCharacters,
      objectKey: 'url',
      pathIdentifier: API_PATHS.CHARACTERS
    });

    // Search for Planets
    const searchedPlanets = await makePlanetsRequest(
      [`${API_BASE_URL}/${API_PATHS.PLANETS}`],
      {
        search
      }
    );
    const residentsUrls = getCustomUrls<Planet>({
      items: searchedPlanets,
      objectKey: 'residents',
      pathIdentifier: API_PATHS.CHARACTERS
    });

    // Search for Species
    const searchedSpecies = await makeSpeciesRequest(
      [`${API_BASE_URL}/${API_PATHS.SPECIES}`],
      {
        search
      }
    );
    const speciesUrls = getCustomUrls<Specie>({
      items: searchedSpecies,
      objectKey: 'people',
      pathIdentifier: API_PATHS.CHARACTERS
    });

    // Combine all urls from characters, planets, and species - get unique urls
    const uniqueUrls = [
      ...new Set([...residentsUrls, ...speciesUrls, ...characterUrls])
    ];

    // Make the character request with the new array of ids that contains unique characters urls
    // State will be updated with the new array of characters
    await makeCharacterRequest(uniqueUrls, {}, true);

    setCurrentPage(0);
  };

  // Props for components
  const charactersProps = {
    charactersPages,
    error: error ? new Error(error.message) : null,
    isFetchingNextPage: false,
    isFetching: isLoadingCharacters,
    planetHashMap,
    speciesHashMap,
    currentPage
  };
  const paginationProps = {
    currentPage,
    setCurrentPage,
    fetchNextPage: (nextPage: number) => {
      if (charactersPages[nextPage]) return;
      makeCharacterRequest([`${API_BASE_URL}/${API_PATHS.CHARACTERS}`], {
        page: `${nextPage}`
      });
    },
    isFetchingNextPage: isLoadingCharacters,
    hasNextPage: (currentPage + 1) * 10 < allCharactersCount,
    allPagesCount: charactersPages.length,
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
