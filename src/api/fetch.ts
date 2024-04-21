import { API_BASE_URL } from './constants';

export const fetchData = async <T>(
  path: string,
  request: RequestInit,
  query?: Record<string, unknown>
): Promise<T> => {
  const queryString = new URLSearchParams({
    ...query,
    format: 'json'
  }).toString();
  const url = new URL(`${API_BASE_URL}/${path}`);

  const fullUrl = queryString ? `${url}?${queryString}` : url.toString();

  const res = await fetch(fullUrl, request);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();

  console.log('data', data);

  return data;
};
