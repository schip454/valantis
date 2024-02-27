import { useEffect } from "react";
import { getAllIds, getCurrentIds, getItems, setCurrentItems, setPageCount } from "../redux/items/slice";
import { uniqBy } from "lodash";

export const useItemsData = (dispatch, itemOffset, allIds, currentIds, items, isFiltering) => {
  useEffect(() => {
    dispatch(getCurrentIds(itemOffset));
  }, [dispatch, itemOffset]);

  useEffect(() => {
    dispatch(getAllIds());
    const pageCount = Math.ceil(allIds.length / 50);
    dispatch(setPageCount(pageCount));
  }, [dispatch, allIds.length]);

  useEffect(() => {
    if (currentIds.length > 0) {
      dispatch(getItems(currentIds));
    }
    if (isFiltering) {
      const filteredPageCount = Math.ceil(currentIds.length / 50);
      dispatch(setPageCount(filteredPageCount));
    }
  }, [dispatch, currentIds, isFiltering]);

  useEffect(() => {
    const uniqueItems = uniqBy(items, 'id');
    dispatch(setCurrentItems(uniqueItems));
  }, [dispatch, items]);
};
