import Card from '@ui/Card';
import Skeleton from '@ui/Skeleton';
import { Character, Page, Planet, Specie } from '@/types';
import { getId } from '@/utils/shared';
import { API_PATHS } from '@/api/constants';

type Props = {
  charactersPages: Page<Character>[];
  error: Error | null;
  currentPage: number;
  isFetching: boolean;
  planetHashMap: Record<string, Planet>;
  speciesHashMap: Record<string, Specie>;
};

const Characters = ({
  charactersPages,
  error,
  currentPage,
  isFetching,
  planetHashMap,
  speciesHashMap
}: Props) => {
  if (error) return <h2>Error: {error.message}</h2>;
  if (!charactersPages.length && !isFetching)
    return <h2 className="text-xl">No results</h2>;

  return (
    <>
      {!isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-[80px]">
          {charactersPages[currentPage]?.results.map((character: Character) => (
            <Card
              key={`${getId(character.url, API_PATHS.CHARACTERS)}`}
              character={character}
              planet={
                planetHashMap[
                  `${getId(character.homeworld, API_PATHS.PLANETS)}`
                ]?.name || '...'
              }
              specie={
                speciesHashMap[
                  `${getId(character.species[0], API_PATHS.SPECIES)}`
                ]?.name || '...'
              }
            />
          ))}
        </div>
      ) : (
        <Skeleton skeletonQuantity={9} />
      )}
    </>
  );
};

export default Characters;
