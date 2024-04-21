import useQueryCharacters from '@hooks/useQueryCharacters';
import Card from '@ui/Card';
import Skeleton from '@ui/Skeleton';
import { Character, Planet, Specie } from '@/types';
import { useState } from 'react';
import Pagination from '@ui/Pagination';
import useFetch from '@hooks/useFetch';
import { getId } from '@/utils/shared';
import { API_PATHS } from '@/api/constants';

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useQueryCharacters();

  const { data: planets } = useFetch<Planet>(API_PATHS.PLANETS);
  const { data: species } = useFetch<Specie>(API_PATHS.SPECIES);

  const charactersPages = data?.pages || [];
  const allCharactersCount = data?.pages[0].count || 0;

  if (error) return <h2>Error: {error.message}</h2>;

  const paginationProps = {
    currentPage,
    setCurrentPage,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    allPagesCount: charactersPages.length,
    allCharactersCount
  };

  return (
    <>
      {!isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-[80px]">
          {charactersPages[currentPage].results.map((character: Character) => (
            <Card
              key={character.name}
              character={character}
              planet={
                planets[(getId(character.homeworld, 'planets') || 1) - 1]
                  ?.name || ' ... '
              }
              specie={
                species[(getId(character.species?.[0], 'species') || 1) - 1]
                  ?.name || ' ... '
              }
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
