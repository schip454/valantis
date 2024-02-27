import { compact, sortBy, uniq } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getFields, setItemOffset, swapFilter } from '../../redux/items/slice';

const SelectItem = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.items);

  const [defaultValue, setDefaultValue] = useState(null);

  useEffect(() => {
    dispatch(getFields());
  }, []);
  // const filteredArray = compact(brands);
  // const uniqueArray = uniq(brands);
  // const sortedArray = sortBy(brands);
  // console.log(filteredArray, 'filteredArray');
  // console.log(uniqueArray, 'uniqueArray');
  // console.log(sortedArray, 'sortedArray');
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

  // console.log(sortedUniqueArrayWithoutNulls, 'sortedUniqueArrayWithoutNulls');

  return (
    <Select
      defaultValue={defaultValue}
      placeholder="Бренды..."
      onChange={(e) => handleSearch(e)}
      options={newOptions}
    />
  );
};

export default SelectItem;
