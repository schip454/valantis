import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from './components/Pagination/Pagination';
import Search from './components/Search/Search';
import Items from './components/Items/Items';
import {
  clearFilters,
  getAllIds,
  getCurrentIds,
  getItems,
  setCurrentItems,
  setItemOffset,
  setPageCount,
} from './redux/items/slice';
import SelectItem from './components/Select/SelectItem';
import InputPrice from './components/Price/Price';

function App() {
  const dispatch = useDispatch();
  const {
    isFiltering,
    items,
    currentItems,
    pageCount,
    currentIds,
    allIds,
    itemOffset,
  } = useSelector((state) => state.items);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 50) % items.length;
    dispatch(setItemOffset(newOffset));
    console.log(newOffset, 'newOffset');
    // dispatch(getCurrentIds(newOffset));
    // window.scrollTo(0, 0);
  };

  // const handleFilterPageClick = (event) => {
  //   console.log('handleFilterPageClick');
  //   // window.scrollTo(0, 0);
  // };

  // const handleReset = () => {
  //   dispatch(getCurrentIds(itemOffset));
  //   dispatch(getAllIds());
  //   const pageCount = Math.ceil(allIds.length / 50);
  //   dispatch(setPageCount(pageCount));
  //   if (currentIds.length > 0) {
  //     dispatch(getItems(currentIds));
  //   }
  //   if (isFiltering) {
  //     const filteredPageCount = Math.ceil(currentIds.length / 50);
  //     dispatch(setPageCount(filteredPageCount));
  //   }
  // };

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
        <button onClick={() => {}}>Сбросить</button>
      </div>

      <Items />
      <Pagination handlePageClick={handlePageClick} />
      {/* {isFiltering ? (
        <Pagination handlePageClick={handleFilterPageClick} />
      ) : (
        <Pagination handlePageClick={handlePageClick} />
      )} */}
    </div>
  );
}

export default App;
