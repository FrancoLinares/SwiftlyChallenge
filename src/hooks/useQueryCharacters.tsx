import { API_PATHS } from '@/api/constants';
import { fetchData } from '@/api/fetch';
import { Character, HttpMethodsE, Page } from '@/types';
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

type PageParam = number | undefined;

const useQueryCharacters = () => {
  const queryOptions = {
    queryKey: ['characters'],
    queryFn: ({ pageParam }: { pageParam: PageParam }) => {
      if (!pageParam) pageParam = 1;

      return fetchData<Page<Character>>(
        API_PATHS.CHARACTERS,
        { method: HttpMethodsE.GET },
        { page: pageParam }
      );
    },
    getNextPageParam: (
      lastPage: Page<Character>,
      allPages: Page<Character>[]
    ) => (lastPage?.results.length > 0 ? allPages.length + 1 : undefined),
    initialPageParam: 0
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery<
    Page<Character>,
    Error,
    { pages: Page<Character>[] },
    QueryKey,
    PageParam
  >(queryOptions);

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage
  };
};

export default useQueryCharacters;
