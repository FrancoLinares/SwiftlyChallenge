import Search from '@ui/Search';
import Characters from '@components/Characters/CharacterList';
import { useState } from 'react';
import { getSearchQueryParam } from '@/utils/shared';

const CharactersContainer = () => {
  const [search, setSearch] = useState(getSearchQueryParam() || '');

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <div className="mt-[4vh]">
        <Characters search={search} />
      </div>
    </>
  );
};

export default CharactersContainer;
