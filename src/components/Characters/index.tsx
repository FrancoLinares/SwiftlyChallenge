import useQueryCharacters from '@hooks/useQueryCharacters';
import Card from '@ui/Card';
import Skeleton from '@ui/Skeleton';
import { Character } from '@/types';
import { useState } from 'react';
import Pagination from '@ui/Pagination';

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
              planet={'Planet'}
              specie={'Human'}
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
