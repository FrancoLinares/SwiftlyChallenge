import { renderHook, waitFor } from '@testing-library/react';
import * as ReactQuery from '@tanstack/react-query';
import { useSpecies } from '@hooks/useStarWarsAPI';
import { speciesMock, speciesMockHashMap } from '../__mocks__/fetch';

jest.mock('@/constants', () => ({
  DEV: 'test',
  MODE: 'test',
  PAGE_SIZE: 30
}));
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn()
}));

const createTestQueryClient = () => {
  const queryClient = new ReactQuery.QueryClient({
    defaultOptions: {
      queries: {
        retry: false // turn off retries for testing
      }
    }
  });
  return queryClient;
};

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <ReactQuery.QueryClientProvider client={queryClient}>
      {children}
    </ReactQuery.QueryClientProvider>
  );
};

describe('useStarWarsAPI hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useSpecies', () => {
    jest.spyOn(ReactQuery, 'useQuery').mockImplementation(
      jest.fn().mockReturnValue({
        data: speciesMock,
        isLoading: false,
        isSuccess: true
      })
    );
    test('should return all props correctly', async () => {
      const { result } = renderHook(() => useSpecies(), { wrapper });

      await waitFor(() => {
        expect(result.current.species).toEqual(speciesMock);
        expect(result.current.speciesError).toEqual(undefined);
        expect(result.current.speciesHashMap).toStrictEqual(speciesMockHashMap);
      });
    });
  });
});
