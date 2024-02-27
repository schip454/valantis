import { useDispatch, useSelector } from 'react-redux';
import Pagination from './components/Pagination/Pagination';
import Search from './components/Search/Search';
import Items from './components/Items/Items';
import {
  clearFilters,
  getCurrentIds,
  setItemOffset,
  setPageCount,
  setPriceValue,
  setSearchValue,
} from './redux/items/slice';
import SelectItem from './components/Select/SelectItem';
import InputPrice from './components/Price/Price';

function App() {
  const dispatch = useDispatch();

  const { isFiltering, items, allIds } = useSelector((state) => state.items);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 50) % items.length;
    dispatch(setItemOffset(newOffset));
    if (!isFiltering) dispatch(getCurrentIds(newOffset));

    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    dispatch(clearFilters());
    dispatch(setPageCount(Math.ceil(allIds.length / 50)));
    dispatch(getCurrentIds(0));
    dispatch(setPriceValue(''));
    dispatch(setSearchValue(''));
  };

  return (
    <div className=" p-5 max-w-screen-xl mx-auto w-full h-full flex flex-col justify-between gap-6 relative">
      <div className="flex flex-col gap-4 items-start justify-start pb-2 border-b-2 border-slate-200">
        <Search />
        <div className="grid w-full grid-cols-2 gap-3">
          <InputPrice />
          <SelectItem />
        </div>
        <button
          className="text-white hover:bg-gray-700 transition-colors"
          onClick={handleReset}>
          Сбросить фильтры
        </button>
      </div>

      <Items />
      <Pagination handlePageClick={handlePageClick} />
    </div>
  );
}

export default App;
