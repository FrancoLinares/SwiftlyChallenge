import { useState } from 'react';
import { BUTTON_CONTENT, PLACEHOLDER } from './constants';

const Search = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);

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
        onChange={handleSearch}
        value={search}
        autoComplete="off"
      />
      <button
        type="submit"
        className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
      >
        <div className="flex items-center transition-all opacity-1">
          <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
            {BUTTON_CONTENT}
          </span>
        </div>
      </button>
    </label>
  );
};

export default Search;
