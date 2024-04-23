import { PaginationProps } from '.';

const Pages = ({
  currentPage,
  allCharactersCount
}: {
  currentPage: PaginationProps['currentPage'];
  allCharactersCount: PaginationProps['allCharactersCount'];
}) => {
  return (
    <div>
      <p className="text-sm text-gray-700">
        Showing{' '}
        <span className="font-medium">
          {allCharactersCount === 0 ? 0 : currentPage * 10 + 1}
        </span>{' '}
        to{' '}
        <span className="font-medium">
          {(currentPage + 1) * 10 >= allCharactersCount
            ? allCharactersCount
            : (currentPage + 1) * 10}
        </span>{' '}
        of <span className="font-medium">{allCharactersCount}</span> results
      </p>
    </div>
  );
};

export default Pages;
