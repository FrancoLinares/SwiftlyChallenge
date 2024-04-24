import { renderHook, waitFor } from '@testing-library/react';
import * as ReactQuery from '@tanstack/react-query';
import { useCharacters } from '@hooks/useStarWarsAPI';
import { charactersMock } from '../__mocks__/fetch';

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
  describe('useCharacters', () => {
    jest.spyOn(ReactQuery, 'useQuery').mockImplementation(
      jest.fn().mockReturnValue({
        data: charactersMock,
        isLoading: false,
        isSuccess: true
      })
    );

    test('should return all props correctly', async () => {
      const { result } = renderHook(() => useCharacters(), { wrapper });

      await waitFor(() => {
        expect(result.current.characters).toEqual(charactersMock);
        expect(result.current.isCharactersLoading).toEqual(false);
        expect(result.current.charactersError).toEqual(undefined);
        expect(result.current.charactersPages).toEqual([charactersMock]);
        expect(result.current.setCharactersPages).toEqual(expect.any(Function));
        expect(result.current.allCharactersCount).toBe(2);
      });
    });
  });
});
