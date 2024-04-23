import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { NEXT, PREVIOUS } from './constants';
import Pages from './Pages';

export type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchNextPage: (nextPage: number) => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  allCharactersCount: number;
};

const Pagination = ({
  currentPage,
  setCurrentPage,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  allCharactersCount
}: PaginationProps) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0">
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <Pages
            currentPage={currentPage}
            allCharactersCount={allCharactersCount}
          />
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                disabled={currentPage === 0}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  currentPage === 0 && 'opacity-25'
                }`}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >
                <span className="sr-only">{PREVIOUS}</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                disabled={!hasNextPage || isFetchingNextPage}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  (!hasNextPage || isFetchingNextPage) && 'opacity-25'
                }`}
                onClick={() => {
                  if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage(currentPage + 2);
                  }
                  setCurrentPage(currentPage + 1);
                }}
              >
                <span className="sr-only">{NEXT}</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Pagination;
