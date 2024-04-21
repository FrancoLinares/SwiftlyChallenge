import { Character } from '@/types';
import PlanetIcons from '@icons/PlanetIcon';
import SpecieIcon from '@icons/SpecieIcon';

const Card = ({
  character,
  planet,
  specie
}: {
  character: Character;
  planet: string;
  specie: string;
}) => {
  const { name, gender, height } = character;

  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col">
      <a href="#"></a>
      <div className="relative">
        <a href="#!">
          <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            {specie}
          </div>
        </a>
      </div>
      <div className="px-6 py-4 mb-auto">
        <a
          href="#"
          className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          data-testid="card-name"
        >
          {name}
        </a>
        <p data-testid="card-gender" className="text-gray-500 text-sm">
          Gender: {(gender || 'N/A').toUpperCase()}
        </p>
        <p data-testid="card-height" className="text-gray-500 text-sm">
          Height: {(height || 'N/A').toUpperCase()}
        </p>
      </div>
      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <PlanetIcons />
          <span data-testid="card-planet" className="ml-1 font-bold text-sm">
            {planet}
          </span>
        </span>

        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <SpecieIcon />
          <span data-testid="card-specie" className="ml-1 font-bold text-sm">
            {specie}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Card;
