import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getAllIds,
  getCurrentIds,
  getFields,
  getItems,
  setCurrentItems,
  setPageCount,
  swapFilter,
} from './redux/items/slice';
import CardItem from './components/Card';
import Pagination from './components/Pagination/Pagination';
import { ColorRing } from 'react-loader-spinner';
import _ from 'lodash';
import Search from './components/Search/Search';

function App() {
  const dispatch = useDispatch();
  const { allIds, currentIds, isLoading, items, currentItems, pageCount } =
    useSelector((state) => state.items);

  const [itemOffset, setItemOffset] = useState(0);

  console.log(pageCount, 'pageCount');

  useEffect(() => {
    dispatch(getCurrentIds(itemOffset));
    // dispatch(getFields());
  }, []);

  useEffect(() => {
    dispatch(getAllIds());
    dispatch(setPageCount(Math.ceil(allIds.length / 50)));
  }, [allIds.length]);

  useEffect(() => {
    if (currentIds.length > 0) {
      dispatch(getItems(currentIds));
    }
  }, [currentIds]);

  useEffect(() => {
    dispatch(setCurrentItems(_.uniqBy(items, 'id')));
    // dispatch(setPageCount(Math.ceil(currentItems.length / 50)));
  }, [items]);

  // useEffect(() => {
  //   dispatch(swapFilter());
  // }, []);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 50) % items.length;
    setItemOffset(newOffset);
    dispatch(getCurrentIds(newOffset));
    window.scrollTo(0, 0);
  };
  // console.log(items, 'items');
  // console.log(currentItems, 'currentItems');
  return (
    <div className=" p-5 max-w-screen-xl mx-auto w-full h-full flex flex-col justify-between gap-6 relative">
      <Search />
      <div className="grid grid-cols-4 gap-3 items-start justify-start ">
        {!isLoading ? (
          currentItems?.map((item, i) => (
            <CardItem key={item.id} i={i} item={item} />
          ))
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 ">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#ccc', '#ccc', '#ccc', '#ccc', '#ccc']}
            />
          </div>
        )}
      </div>

      {currentItems.length > 0 && (
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      )}
    </div>
  );
}

export default App;
