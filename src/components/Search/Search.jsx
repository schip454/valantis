import { useDispatch, useSelector } from 'react-redux';
import {
  setItemOffset,
  setPageCount,
  setSearchValue,
  swapFilter,
} from '../../redux/items/slice';

const Search = () => {
  const dispatch = useDispatch();
  const { currentIds, searchValue } = useSelector((state) => state.items);

  const onChangeInput = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleSearch = () => {
    const params = {
      product: searchValue,
    };
    dispatch(setSearchValue(searchValue));
    dispatch(swapFilter(params));
    dispatch(setItemOffset(0));

    if (currentIds.length > 0) {
      dispatch(setPageCount(Math.ceil(currentIds.length / 50)));
    } else {
      alert('Ничего не найдено');
    }
  };

  return (
    <div className=" flex items-center w-full">
      <div className="relative flex h-10 pl-5 border border-[#303030] w-full rounded-2xl group-focus-within:border-blue-500 ">
        <input
          type="text"
          className="bg-transparent outline-none text-black pr-8 pl-0 w-full   group-focus-within:pl-0  placeholder:text-zinc-600"
          onChange={onChangeInput}
          value={searchValue}
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
