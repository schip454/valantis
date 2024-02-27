import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { ColorRing } from 'react-loader-spinner';
import { uniqBy } from 'lodash';
import {
  getAllIds,
  getCurrentIds,
  getItems,
  setCurrentItems,
  setPageCount,
} from '../../redux/items/slice';
import CardItem from '../Card';
// import { useItemsData } from '../../hooks/useItemsData';

// eslint-disable-next-line react/prop-types
function Items() {
  const dispatch = useDispatch();
  const {
    allIds,
    currentIds,
    isLoading,
    items,
    currentItems,
    pageCount,
    isFiltering,
    itemOffset,
  } = useSelector((state) => state.items);

  // useItemsData(dispatch, itemOffset, allIds, currentIds, items, isFiltering);

  useEffect(() => {
    dispatch(getCurrentIds(itemOffset));
  }, []);

  useEffect(() => {
    dispatch(getAllIds());
    dispatch(setPageCount(Math.ceil(allIds.length / 50)));
  }, []);

  useEffect(() => {
    if (isFiltering) {
      dispatch(setPageCount(Math.ceil(currentIds.length / 50)));
    }
  }, [currentIds.length, dispatch, isFiltering]);

  useEffect(() => {
    if (currentIds.length > 0) {
      dispatch(getItems(currentIds));
    }
  }, [currentIds]);

  useEffect(() => {
    const uniqueItems = uniqBy(items, 'id');
    const endOffset = itemOffset + 50;
    if (isFiltering) {
      dispatch(setCurrentItems(uniqueItems.slice(itemOffset, endOffset)));
    } else {
      dispatch(setCurrentItems(uniqueItems));
    }
  }, [dispatch, itemOffset, items]);

  // console.log(items, 'items');
  // console.log(currentItems, 'currentItems');
  // console.log(currentIds, 'currentIds');

  return (
    <div className="grid grid-cols-4 gap-3 items-start justify-start bg-pink-200">
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
  );
}

export default Items;
