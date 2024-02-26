import { debounce } from 'lodash';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  setPageCount,
  setSearchValue,
  swapFilter,
} from '../../redux/items/slice';

const Search = () => {
  const dispatch = useDispatch();
  const { currentIds, pageCount } = useSelector((state) => state.items);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
      dispatch(swapFilter(str));
    }, 500),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
    if (currentIds.length > 0)
      dispatch(setPageCount(Math.ceil(currentIds.length / 50)));
  };

  return (
    <div className="group flex items-center ">
      <div className="relative flex h-8 md:h-10 md:pl-5 border border-[#303030] rounded-3xl group-focus-within:border-blue-500 ">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent outline-none text-black pr-8 pl-5 md:pl-0 w-80  md:group-focus-within:pl-0  placeholder:text-zinc-600"
          onChange={onChangeInput}
          value={value}
          onFocus={() => {}}
          placeholder="Поиск продуктов..."
        />
        {value && (
          <svg
            className="absolute top-3 right-3 opacity-50 hover:cursor-pointer hover:opacity-80 w-4 h-4"
            onClick={onClickClear}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Search;
