import { API_BASE_URL } from './constants';

export const fetchData = async ({
  url,
  path,
  request,
  query
}: {
  url?: string;
  path?: string;
  request: RequestInit;
  query?: Record<string, unknown>;
}) => {
  const queryString = new URLSearchParams({
    ...query,
    format: 'json'
  }).toString();
  const newUrl = url || new URL(`${API_BASE_URL}/${path}`);

  const fullUrl = queryString ? `${newUrl}?${queryString}` : newUrl.toString();

  const res = await fetch(fullUrl, request);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();

  return data;
};
