import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Characters from '..';
import useFetch from '@/hooks/useFetch';
import useQueryCharacters from '@/hooks/useQueryCharacters';

jest.mock('../../../hooks/useFetch');

jest.mock('../../../hooks/useQueryCharacters');

const renderMockedApp = () => render(<Characters />);

describe('Characters component', () => {
  afterEach(() => {
    cleanup();
  });
  test('should card with all the information', async () => {
    const fetchMock = {
      data: [
        {
          name: 'test-1',
          url: 'https://swapi.dev/api/species/1/'
        },
        {
          name: 'test-2',
          url: 'https://swapi.dev/api/planets/2/'
        }
      ],
      isLoading: false
    };
    const queryMock = {
      data: {
        pages: [
          {
            count: 2,
            next: null,
            previous: null,
            results: [
              {
                name: 'name-1',
                height: '100',
                mass: '50',
                hair_color: 'brown',
                skin_color: 'fair',
                eye_color: 'blue',
                birth_year: '19BBY',
                gender: 'male',
                homeworld: 'https://swapi.dev/api/planets/2/',
                films: ['https://swapi.dev/api/films/1/'],
                url: 'https://swapi.dev/api/people/1/',
                species: ['https://swapi.dev/api/species/1/']
              },
              {
                name: 'name-2',
                height: '100',
                mass: '50',
                hair_color: 'brown',
                skin_color: 'fair',
                eye_color: 'blue',
                birth_year: '19BBY',
                gender: 'female',
                homeworld: 'https://swapi.dev/api/planets/2/',
                films: ['https://swapi.dev/api/films/1/'],
                url: 'https://swapi.dev/api/people/2/',
                species: ['https://swapi.dev/api/species/1/']
              }
            ]
          }
        ]
      },
      error: null,
      fetchNextPage: () => Promise.resolve(),
      hasNextPage: false,
      isError: false,
      isFetching: false,
      isFetchingNextPage: false
    };

    jest.mocked(useFetch).mockImplementation(() => fetchMock);
    // @ts-ignore
    jest.mocked(useQueryCharacters).mockImplementation(() => queryMock);

    renderMockedApp();

    const cardNames = await screen.getAllByTestId('card-name');
    expect(cardNames).toHaveLength(2);
    cardNames.forEach((element, index) => {
      expect(element).toHaveTextContent(`name-${index + 1}`);
    });

    const cardGenders = await screen.getAllByTestId('card-gender');
    expect(cardGenders).toHaveLength(2);
    cardGenders.forEach((element, index) => {
      expect(element).toHaveTextContent(
        queryMock.data.pages[0].results[index].gender.toUpperCase()
      );
    });

    const cardHeights = await screen.getAllByTestId('card-height');
    expect(cardHeights).toHaveLength(2);
    cardHeights.forEach((element, index) => {
      expect(element).toHaveTextContent(
        queryMock.data.pages[0].results[index].height
      );
    });

    const cardPlanets = await screen.getAllByTestId('card-planet');
    expect(cardPlanets).toHaveLength(2);
    cardPlanets.forEach((element) => {
      expect(element).toHaveTextContent(fetchMock.data[1].name);
    });

    const cardSpecies = await screen.getAllByTestId('card-specie');
    expect(cardSpecies).toHaveLength(2);
    cardSpecies.forEach((element) => {
      expect(element).toHaveTextContent(fetchMock.data[0].name);
    });
  });

  test('should show error when request fail', async () => {
    const fetchMock = {
      data: [
        {
          name: 'test-1',
          url: 'https://swapi.dev/api/species/1/'
        },
        {
          name: 'test-2',
          url: 'https://swapi.dev/api/planets/2/'
        }
      ],
      isLoading: false
    };

    jest.mocked(useFetch).mockImplementation(() => fetchMock);
    // @ts-ignore
    jest.mocked(useQueryCharacters).mockImplementation(() => ({
      data: undefined,
      error: new Error('Error'),
      fetchNextPage: () => Promise.resolve(),
      hasNextPage: false,
      isError: true,
      isFetching: false,
      isFetchingNextPage: false
    }));

    renderMockedApp();

    expect(await screen.findByText(/Error/)).toBeInTheDocument();
  });
});
