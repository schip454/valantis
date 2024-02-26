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

function Items({handlePageClick}) {
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


  return (
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

    </div>
  );
}

export default Items;
