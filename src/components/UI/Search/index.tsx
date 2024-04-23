import { PLACEHOLDER } from './constants';
import SearchIcon from '@icons/SearchIcon';

const Search = ({
  search,
  setSearch,
  handleSearch
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;
}) => {
  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;

    setSearch(value);
  };

  return (
    <label className="mx-auto mt-8 relative min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
      <input
        type="text"
        name="search"
        id="search-bar"
        className="px-6 py-2 w-full rounded-md flex-1 outline-none"
        placeholder={PLACEHOLDER}
        spellCheck={false}
        onChange={onChangeSearch}
        value={search}
        autoComplete="off"
        onKeyPress={(event) => {
          var key = event.keyCode || event.which;
          if (key === 13) {
            // "enter" button pressed
            handleSearch(event);
          }
        }}
      />
      <div className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">
        <div className="flex items-center transition-all opacity-1">
          <button
            className="text-sm font-semibold whitespace-nowrap truncate mx-auto"
            onClick={handleSearch}
            data-testid="search-button"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </label>
  );
};

export default Search;
