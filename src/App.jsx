import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from './components/Pagination/Pagination';
import Search from './components/Search/Search';
import Items from './components/Items/Items';
import { clearFilters, getCurrentIds } from './redux/items/slice';
import SelectItem from './components/Select/SelectItem';
import InputPrice from './components/Price/Price';

function App() {
  const dispatch = useDispatch();
  const { isFiltering, items, currentItems, pageCount } = useSelector(
    (state) => state.items
  );

  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 50) % items.length;
    setItemOffset(newOffset);
    dispatch(getCurrentIds(newOffset));
    // window.scrollTo(0, 0);
  };

  const handleFilterPageClick = (event) => {
    console.log('handleFilterPageClick');
    // window.scrollTo(0, 0);
  };

  console.log(isFiltering, 'isFiltering');

  return (
    <div className=" p-5 max-w-screen-xl mx-auto w-full h-full flex flex-col justify-between gap-6 relative">
      {/* <div className="grid grid-cols-3 gap-3 items-start justify-start "> */}
      <div className="flex flex-col gap-4 items-start justify-start pb-2 border-b-2 border-slate-200">
        <Search />
        <div className="grid w-full grid-cols-2 gap-3">
          <InputPrice />
          <SelectItem />
        </div>
        <button onClick={() => dispatch(clearFilters())}>Сбросить</button>
      </div>

      <Items itemOffset={itemOffset} />
      {isFiltering ? (
        <Pagination handlePageClick={handleFilterPageClick} />
      ) : (
        <Pagination handlePageClick={handlePageClick} />
      )}
    </div>
  );
}

export default App;
