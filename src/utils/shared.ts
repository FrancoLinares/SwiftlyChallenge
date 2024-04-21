/**
 * Extracts the page number from the given URL string.
 *
 * @param {string} url - The URL string from which to extract the page number.
 * @return {number | null} The extracted page number as a number, or null if no page number is found.
 */
export const getPageNumber = (url: string): number | null => {
  const regex = /page=(\d+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    return parseInt(match[1]);
  }

  return null;
};

/**
 * Extracts the ID from a given URL string based on the specified type.
 *
 * @param {string} url - The URL string from which to extract the ID.
 * @param {string} type - The type of ID to extract.
 * @return {number | null} The extracted ID as a number, or null if no ID is found.
 */
export const getId = (url: string, type: string): number | null => {
  if (!url || !type) return null;

  const urlParts = url.split('/');
  const index = urlParts.findIndex((part) => part === type) + 1;

  if (index > 0 && index < urlParts.length - 1) {
    const numberString = urlParts[index];
    return parseInt(numberString);
  }

  return null;
};
