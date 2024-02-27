import { compact, sortBy, uniq } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getFields, setItemOffset, swapFilter } from '../../redux/items/slice';

const SelectItem = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(getFields());
  }, []);

  const sortedUniqueArrayWithoutNulls = sortBy(uniq(compact(brands)), [
    'field1',
    'field2',
  ]);

  const newOptions = [
    ...sortedUniqueArrayWithoutNulls.map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })),
  ];

  const handleSearch = (e) => {
    const params = {
      brand: e.value,
    };
    dispatch(swapFilter(params));
    dispatch(setItemOffset(0));
  };

  return (
    <Select
      placeholder="Бренды..."
      onChange={(e) => handleSearch(e)}
      options={newOptions}
    />
  );
};

export default SelectItem;
