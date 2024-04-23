import '@testing-library/jest-dom';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import useFetch from '@hooks/useFetch';
import CharactersContainer from '@components/Characters';
import { PLACEHOLDER } from '@ui/Search/constants';

const dataMock = [
  {
    name: 'test-1',
    url: 'https://swapi.dev/api/people/1/',
    homeworld: 'https://swapi.dev/api/planets/1/',
    species: ['https://swapi.dev/api/species/2/'],
    gender: 'MALE',
    height: '100'
  }
];
const planet = {
  name: 'planet-1',
  residents: ['https://swapi.dev/api/people/1/'],
  url: 'https://swapi.dev/api/planets/1/'
};
const specie = {
  name: 'specie-2',
  people: ['https://swapi.dev/api/people/1/'],
  url: 'https://swapi.dev/api/species/2/'
};
const dataForMakeRequests = [dataMock[0], planet, specie, dataMock[0]];
const fetchMock = {
  data: [dataMock[0]],
  cache: {
    [dataMock[0].name]: dataMock[0]
  },
  pages: [
    {
      count: 1,
      next: null,
      previous: null,
      results: dataMock
    }
  ],
  isLoading: false
} as unknown as ReturnType<typeof useFetch>;

jest.mock('@/constants', () => ({
  DEV: 'test',
  MODE: 'test'
}));
jest.mock('@hooks/useFetch');

const renderMockedApp = () => render(<CharactersContainer />);

describe('Characters Container component', () => {
  afterEach(() => {
    cleanup();
  });
  test('should update search state on input change', async () => {
    const makeRequestMock = jest.fn();
    jest.mocked(useFetch).mockImplementation(() => ({
      ...fetchMock,
      makeRequest: makeRequestMock
    }));

    renderMockedApp();

    const input = (await screen.getByPlaceholderText(
      PLACEHOLDER
    )) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(input.value).toBe('Luke');
  });

  test('should render cards with all the information', async () => {
    const makeRequestMock = jest.fn();

    const mock = {
      ...fetchMock,
      cache: {
        ['1']: planet,
        ['2']: specie
      }
    };

    jest.mocked(useFetch).mockImplementation(() => ({
      ...mock,
      makeRequest: makeRequestMock
    }));

    renderMockedApp();

    const cardNames = await screen.getAllByTestId('card-name');
    expect(cardNames).toHaveLength(1);
    cardNames.forEach((element, index) => {
      expect(element).toHaveTextContent(`test-${index + 1}`);
    });

    const cardGenders = await screen.getAllByTestId('card-gender');
    expect(cardGenders).toHaveLength(1);
    expect(cardGenders[0]).toHaveTextContent(/MALE/);

    const cardHeights = await screen.getAllByTestId('card-height');
    expect(cardHeights).toHaveLength(1);
    expect(cardHeights[0]).toHaveTextContent(/100/);

    const cardPlanets = await screen.getAllByTestId('card-planet');
    expect(cardPlanets).toHaveLength(1);
    expect(cardPlanets[0]).toHaveTextContent(mock.cache[1].name);

    const cardSpecies = await screen.getAllByTestId('card-specie');
    expect(cardSpecies).toHaveLength(1);
    expect(cardSpecies[0]).toHaveTextContent(mock.cache[2].name);
  });

  test('should run filter request when input value is not empty - run search flow', async () => {
    const makeRequestMock = jest
      .fn()
      .mockImplementationOnce(() => [dataForMakeRequests[0]])
      .mockImplementationOnce(() => [dataForMakeRequests[1]])
      .mockImplementationOnce(() => [dataForMakeRequests[2]])
      .mockImplementationOnce(() => [dataForMakeRequests[3]]);

    jest.mocked(useFetch).mockImplementation(() => ({
      ...fetchMock,
      makeRequests: makeRequestMock
    }));

    renderMockedApp();

    const input = (await screen.getByPlaceholderText(
      PLACEHOLDER
    )) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test-1' } });
    const button = await screen.getByTestId('search-button');
    fireEvent.click(button);

    act(() => expect(makeRequestMock).toHaveBeenCalled());
  });

  test('should show error when request fail', async () => {
    const makeRequestMock = jest.fn();
    const mockWithError = {
      ...fetchMock,
      error: { message: 'Error' }
    };
    jest.mocked(useFetch).mockImplementation(() => ({
      ...mockWithError,
      makeRequests: makeRequestMock
    }));

    renderMockedApp();

    expect(await screen.findByText(/Error/)).toBeInTheDocument();
  });
});
