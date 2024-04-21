import { useEffect, useState } from 'react';
import { API_PATHS } from '@/api/constants';
import { fetchData } from '@/api/fetch';
import { HttpMethodsE, Page } from '@/types';
import { getPageNumber } from '@/utils/shared';

type ApiKeys = keyof typeof API_PATHS;
type ApiPaths = (typeof API_PATHS)[ApiKeys];

const useFetch = <T,>(path: ApiPaths) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

  /**
   * Asynchronously makes requests to fetch data from the API and updates the state with the results.
   *
   * A closure is used to avoid modifying the react status each time a request is completed,
   * this improves readability and makes the function more efficient.
   *
   * @param {number | undefined} page - The page number to fetch data from. Defaults to 1.
   * @return {Promise<void>} A Promise that resolves when all requests are completed and the state is updated.
   */
  const makeRequests = async () => {
    const tempData: T[] = [];

    const makeRequest = async (page: number | undefined = 1) => {
      setIsLoading(true);

      try {
        const data = await fetchData<Page<T>>(
          path,
          { method: HttpMethodsE.GET },
          {
            page
          }
        );

        // Save the data in temporal array to avoid unwanted re-renders(on every completed request)
        if (data.results) {
          tempData.push(...data.results);
        }

        if (data.next) {
          const page = getPageNumber(data.next);

          if (page) makeRequest(page);
        }
      } catch (error) {
        // Log error
        console.error(error);
      } finally {
        // Update the state when all the request finished
        setData(tempData);
        setIsLoading(false);
      }
    };

    makeRequest();
  };

  useEffect(() => {
    makeRequests();
  }, []);

  return {
    data,
    isLoading
  };
};

export default useFetch;
