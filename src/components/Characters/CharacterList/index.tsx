import useQueryCharacters from '@hooks/useQueryCharacters';
import Card from '@ui/Card';
import Skeleton from '@ui/Skeleton';
import { Character, Page, Planet, Specie } from '@/types';
import { useEffect, useState } from 'react';
import Pagination from '@ui/Pagination';
import useFetch from '@hooks/useFetch';
import { createChunks, getId } from '@/utils/shared';
import { API_PATHS } from '@/api/constants';
import { filterCharactersBy, getElementById } from './utils';

const Characters = ({ search }: { search: string }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [charactersPages, setCharactersPages] = useState<Page<Character>[]>([]);
  const qParam = search;

  const { data, error, isFetchingNextPage, hashCharacters, allCharacters } =
    useQueryCharacters();

  const { data: planets } = useFetch<Planet>(API_PATHS.PLANETS);
  const { data: species } = useFetch<Specie>(API_PATHS.SPECIES);

  useEffect(() => {
    setCharactersPages(data?.pages || []);
  }, [data?.pages]);

  const allCharactersCount = charactersPages[0]?.count || 0;

  useEffect(() => {
    if (qParam.length > 1 && hashCharacters && allCharacters) {
      const filterCharactersProps = {
        qParam,
        hashCharacters,
        idPropertyType: 'people'
      };

      const charactersFilteredByName = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(qParam.toLowerCase())
      );

      const charactersFilteredByPlanets = filterCharactersBy<Planet>({
        ...filterCharactersProps,
        list: planets,
        listKey: 'residents'
      });

      const charactersFilteredBySpecies = filterCharactersBy<Specie>({
        ...filterCharactersProps,
        list: species,
        listKey: 'people'
      });

      const newPages = createChunks(
        // Uniqueness is needed to avoid duplicates
        Array.from(
          new Set([
            ...charactersFilteredByName,
            ...charactersFilteredByPlanets,
            ...charactersFilteredBySpecies
          ])
        ),
        10
      );
      setCharactersPages(newPages);
    } else {
      setCharactersPages(data?.pages || []);
    }
    setCurrentPage(0);
  }, [qParam]);

  if (error) return <h2>Error: {error.message}</h2>;
  if (qParam && !charactersPages.length)
    return <h2 className="text-xl">No results</h2>;

  const paginationProps = {
    currentPage,
    setCurrentPage,
    isFetchingNextPage,
    hasNextPage: (currentPage + 1) * 10 < allCharactersCount,
    allPagesCount: charactersPages.length,
    allCharactersCount
  };

  return (
    <>
      {charactersPages.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-[80px]">
          {charactersPages[currentPage].results.map((character: Character) => (
            <Card
              key={`${getId(character.url, 'people')}-${character.name}`}
              character={character}
              planet={getElementById({
                list: planets,
                strIdentifier: character.homeworld,
                keyIdentifier: 'planets'
              })}
              specie={getElementById({
                list: species,
                strIdentifier: character.species?.[0],
                keyIdentifier: 'species'
              })}
            />
          ))}
        </div>
      ) : (
        <Skeleton skeletonQuantity={9} />
      )}
      {/* Pagination Controls */}
      <Pagination {...paginationProps} />
    </>
  );
};

export default Characters;
