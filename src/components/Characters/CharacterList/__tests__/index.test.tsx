import '@testing-library/jest-dom';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import CharactersContainer from '@components/Characters';
import { PLACEHOLDER } from '@ui/Search/constants';
import * as hooks from '@hooks/useStarWarsAPI';
import {
  charactersMock,
  planetsMock,
  planetsMockHashMap,
  speciesMock,
  speciesMockHashMap
} from '@/hooks/__mocks__/fetch';
import { createChunks, getId } from '@/utils/shared';
import { PAGE_SIZE } from '@/constants';
import { API_PATHS } from '@/api/constants';

// const dataMock = [
//   {
//     name: 'test-1',
//     url: 'https://swapi.dev/api/people/1/',
//     homeworld: 'https://swapi.dev/api/planets/1/',
//     species: ['https://swapi.dev/api/species/2/'],
//     gender: 'MALE',
//     height: '100'
//   }
// ];
// const planet = {
//   name: 'planet-1',
//   residents: ['https://swapi.dev/api/people/1/'],
//   url: 'https://swapi.dev/api/planets/1/'
// };
// const specie = {
//   name: 'specie-2',
//   people: ['https://swapi.dev/api/people/1/'],
//   url: 'https://swapi.dev/api/species/2/'
// };
// const dataForMakeRequests = [dataMock[0], planet, specie, dataMock[0]];
// const fetchMock = {
//   data: [dataMock[0]],
//   cache: {
//     [dataMock[0].name]: dataMock[0]
//   },
//   pages: [
//     {
//       count: 1,
//       next: null,
//       previous: null,
//       results: dataMock
//     }
//   ],
//   isLoading: false
// } as unknown as ReturnType<typeof useFetch>;

jest.mock('@/constants', () => ({
  DEV: 'test',
  MODE: 'test',
  PAGE_SIZE: 30
}));
jest.mock('@hooks/useStarWarsAPI', () => ({
  useCharacters: jest.fn(),
  usePlanets: jest.fn(),
  useSpecies: jest.fn()
}));

const renderMockedApp = () => render(<CharactersContainer />);

describe('Characters Container component', () => {
  const setCharactersPagesMock = jest.fn();
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();

    jest.spyOn(hooks, 'useCharacters').mockImplementation(
      jest.fn().mockReturnValue({
        data: charactersMock,
        isLoading: false,
        isSuccess: true,
        characters: charactersMock,
        isCharactersLoading: false,
        charactersError: null,
        charactersPages: createChunks(charactersMock, PAGE_SIZE),
        setCharactersPages: setCharactersPagesMock,
        allCharactersCount: charactersMock.length
      })
    );
    jest.spyOn(hooks, 'usePlanets').mockImplementation(
      jest.fn().mockReturnValue({
        planets: planetsMock,
        isPlanetsLoadig: false,
        planetsError: null,
        planetsHashMap: planetsMockHashMap
      })
    );
    jest.spyOn(hooks, 'useSpecies').mockImplementation(
      jest.fn().mockReturnValue({
        species: speciesMock,
        speciesError: false,
        speciesHashMap: speciesMockHashMap
      })
    );
  });

  test('should show error when request fail', async () => {
    jest.spyOn(hooks, 'useCharacters').mockImplementation(
      jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
        isSuccess: true,
        characters: charactersMock,
        isCharactersLoading: false,
        charactersError: new Error('Error'),
        charactersPages: [],
        setCharactersPages: setCharactersPagesMock,
        allCharactersCount: 0
      })
    );
    renderMockedApp();

    expect(await screen.findByText(/Error/)).toBeInTheDocument();

    jest.restoreAllMocks();
  });
  test('should update search state on input change', async () => {
    renderMockedApp();

    const input = (await screen.getByPlaceholderText(
      PLACEHOLDER
    )) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(input.value).toBe('Luke');
  });

  test('should render cards with all the information', async () => {
    renderMockedApp();

    const cardNames = await screen.getAllByTestId('card-name');
    expect(cardNames).toHaveLength(2);
    cardNames.forEach((element, index) => {
      expect(element).toHaveTextContent(charactersMock[index].name);
    });

    const cardGenders = await screen.getAllByTestId('card-gender');
    expect(cardGenders).toHaveLength(2);
    cardGenders.forEach((element, index) => {
      expect(element).toHaveTextContent(
        charactersMock[index].gender.toUpperCase()
      );
    });

    const cardHeights = await screen.getAllByTestId('card-height');
    expect(cardHeights).toHaveLength(2);
    cardHeights.forEach((element, index) => {
      expect(element).toHaveTextContent(charactersMock[index].height);
    });

    const cardPlanets = await screen.getAllByTestId('card-planet');
    expect(cardPlanets).toHaveLength(2);
    cardPlanets.forEach((element, index) => {
      expect(element).toHaveTextContent(
        planetsMockHashMap[
          `${getId(charactersMock[index].homeworld, API_PATHS.PLANETS)}`
        ]?.name
      );
    });

    const cardSpecies = await screen.getAllByTestId('card-specie');
    expect(cardSpecies).toHaveLength(2);
    cardSpecies.forEach((element, index) => {
      expect(element).toHaveTextContent(
        speciesMockHashMap[
          `${getId(charactersMock[index].species[0], API_PATHS.SPECIES)}`
        ]?.name || '...'
      );
    });
  });

  test('should run filter request when input value is not empty - run search flow', async () => {
    renderMockedApp();

    const input = (await screen.getByPlaceholderText(
      PLACEHOLDER
    )) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Luke' } });
    const button = await screen.getByTestId('search-button');
    fireEvent.click(button);

    act(async () =>
      expect(setCharactersPagesMock).toHaveBeenCalledWith([[charactersMock[0]]])
    );
  });
});
