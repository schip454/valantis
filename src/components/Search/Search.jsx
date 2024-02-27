import { debounce } from 'lodash';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  setItemOffset,
  setPageCount,
  setSearchValue,
  swapFilter,
} from '../../redux/items/slice';

const Search = () => {
  const dispatch = useDispatch();
  const { currentIds, pageCount } = useSelector((state) => state.items);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
    // updateSearchValue(e.target.value);
  };

  const handleSearch = () => {
    const params = {
      product: value,
    };
    console.log(value);
    dispatch(setSearchValue(value));
    dispatch(swapFilter(params));
    dispatch(setItemOffset(0));
    console.log('swapFilter');

    if (currentIds.length > 0) {
      dispatch(setPageCount(Math.ceil(currentIds.length / 50)));
    } else {
      alert('Ничего не найдено');
    }

    // if (!currentIds.length > 0) {
    //   console.log('asduasidjasidaisdasi');
    //   alert('Ничего не найдено');
    // }
  };

  return (
    <div className=" flex items-center w-full">
      <div className="relative flex h-10 pl-5 border border-[#303030] w-full rounded-3xl group-focus-within:border-blue-500 ">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent outline-none text-black pr-8 pl-0 w-full   group-focus-within:pl-0  placeholder:text-zinc-600"
          onChange={onChangeInput}
          value={value}
          onFocus={() => {}}
          placeholder="Поиск продуктов..."
        />
      </div>
      <button
        className="text-white rounded-3xl flex items-center justify-center w-[120px] h-[40px] ml-2 hover:bg-slate-700 transition-colors"
        onClick={handleSearch}>
        Поиск
      </button>
    </div>
  );
};

export default Search;
