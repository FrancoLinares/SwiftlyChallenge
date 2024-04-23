import { useEffect, useRef, useState } from 'react';
import { fetchData } from '@/api/fetch';
import { ApiPaths, HttpMethodsE, Page } from '@/types';
import { createChunks, getId } from '@/utils/shared';
import { DEV, MODE } from '@/constants';

// With Strict Mode starting in React 18, whenever a component mounts in development,
// React will simulate immediately unmounting and remounting the component
// To avoid this, we use the useRef hook
// React v18 - Strict Mode
// https://legacy.reactjs.org/docs/strict-mode.html#ensuring-reusable-state
const isDevelopmentRun = DEV && MODE !== 'test';

export type PromiseType<T> = T | Page<T>;

const useFetch = <T extends { url: string }>({
  path,
  urls,
  initialQueryParams,
  returnPages = false
}: {
  path: ApiPaths;
  urls?: string[];
  initialQueryParams?: Record<string, string>;
  returnPages?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [pages, setPages] = useState<Page<T>[]>([]);
  const [cache, setCache] = useState<Record<string, T>>({});
  const [error, setError] = useState<{ message: string } | null>(null);
  const isMountedRef = useRef(false);

  const makeRequests = async (
    urls: string[],
    queryParams?: Record<string, string>,
    mutateState: boolean | undefined = false
  ) => {
    setIsLoading(true);

    try {
      const promises = urls.reduce((promises, url) => {
        const id = getId(url, path);

        // Avoid making duplicate requests, check the cache first
        if (cache[`${id}`]) {
          setData((prevState: T[]) => {
            return [...new Set([...prevState, cache[`${id}`]])];
          });
        } else {
          promises.push(
            fetchData({
              url,
              request: { method: HttpMethodsE.GET },
              query: queryParams
            })
          );
        }
        return promises;
      }, [] as Promise<PromiseType<T>>[]);

      const resolvedItems = await Promise.all(promises);
      const isPage = resolvedItems[0] && 'results' in resolvedItems[0];

      const itemsFromPages = resolvedItems.reduce((acc, item) => {
        if ('results' in item) {
          return [...acc, ...item.results];
        }
        return acc;
      }, [] as T[]);

      let items;
      if (isPage) {
        items = itemsFromPages;
      } else {
        items = resolvedItems as T[];
      }

      if (mutateState) {
        // Get items from cache - the request was not made
        const cachedItems = urls.reduce((acc, url) => {
          const cachedItem = cache[`${getId(url, path)}`];
          if (cachedItem) return [...acc, cache[`${getId(url, path)}`]];
          return acc;
        }, [] as T[]);

        // Save data and hashMap
        setData([...cachedItems, ...itemsFromPages]);
        if (returnPages) {
          setPages(createChunks([...cachedItems, ...items], 10));
        }
      } else {
        // Save data and hashMap
        setData((prevState: T[]) => {
          return [...new Set([...prevState, ...items])];
        });
        if (returnPages) {
          setPages((prevState: Page<T>[]) => {
            return [...prevState, ...(resolvedItems as Page<T>[])];
          });
        }
      }

      // Convert the array of items into a hash map
      const hashMap: Record<string, T> = {};
      items.forEach((obj: T) => {
        if (getId(obj.url, path) !== null) {
          hashMap[`${getId(obj.url, path)}`] = obj;
        }
      });
      // Save cache
      setCache((prevState) => {
        return { ...prevState, ...hashMap };
      });

      // Reset isMountedRef - just for dev mode
      isMountedRef.current = false;

      return items;
    } catch (error: Error | any) {
      setError({ message: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check the comments on the top of the file for more info
    if (urls?.length && !isMountedRef.current) {
      if (isDevelopmentRun) isMountedRef.current = true;
      makeRequests(urls, initialQueryParams);
    }
  }, [urls]);

  return {
    data,
    isLoading,
    cache,
    pages,
    error,
    makeRequests
  };
};

export default useFetch;
