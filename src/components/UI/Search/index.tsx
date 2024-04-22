import SearchIcon from '../Icons/SearchIcon';
import { PLACEHOLDER } from './constants';

const Search = ({
  search,
  setSearch
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
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
      />
      <span className="w-full md:w-auto px-6 py-3 border-black text-white fill-white overflow-hidden relative rounded-xl">
        <div className="flex items-center transition-all opacity-25">
          <SearchIcon />
        </div>
      </span>
    </label>
  );
};

export default Search;
