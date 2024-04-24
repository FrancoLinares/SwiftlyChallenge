import Card from '@ui/Card';
import Skeleton from '@ui/Skeleton';
import { Character, Planet, Specie } from '@/types';
import { getId } from '@/utils/shared';
import { API_PATHS } from '@/api/constants';
import { NOT_FOUND } from './constants';

type Props = {
  charactersPages: Character[][] | undefined;
  error: Error | null;
  currentPage: number;
  isFetching: boolean;
  planetsHashMap: Record<string, Planet> | undefined;
  speciesHashMap: Record<string, Specie> | undefined;
};

const Characters = ({
  charactersPages,
  error,
  currentPage,
  isFetching,
  planetsHashMap,
  speciesHashMap
}: Props) => {
  if (error) return <h2>Error: {error.message}</h2>;
  if (!charactersPages?.length && !isFetching)
    return <h2 className="text-xl">{NOT_FOUND}</h2>;

  return (
    <>
      {!isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-[80px]">
          {charactersPages?.[currentPage]?.map((character: Character) => (
            <Card
              key={`${getId(character.url, API_PATHS.CHARACTERS)}`}
              character={character}
              planet={
                planetsHashMap?.[
                  `${getId(character.homeworld, API_PATHS.PLANETS)}`
                ]?.name || '...'
              }
              specie={
                speciesHashMap?.[
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
