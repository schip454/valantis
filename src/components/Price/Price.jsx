import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setItemOffset,
  setPageCount,
  swapFilter,
} from '../../redux/items/slice';
import { debounce } from 'lodash';

const InputPrice = () => {
  const dispatch = useDispatch();
  const { currentIds, pageCount } = useSelector((state) => state.items);
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  console.log(value);
  const handleSearch = () => {
    const params = {
      price: Number(value),
    };
    console.log(value);
    dispatch(swapFilter(params));
    dispatch(setItemOffset(0));
    console.log('swapFilter');

    if (currentIds.length > 0) {
      dispatch(setPageCount(Math.ceil(currentIds.length / 50)));
    }
  };

  return (
    <div className="flex gap-1 items-center justify-between">
      <input
        id="price"
        type="number"
        value={value}
        placeholder="Введите стоимость..."
        onChange={handleChange}
        className="border border-gray-300 h-[38px] rounded-[4px] p-2 w-full"
      />
      {value && (
        <button
          className=" bg-transparent w-8 h-8 p-0  outline-none border-none flex items-center justify-center hover:bg-gray-300/80 transition-colors"
          onClick={handleSearch}>
          <svg
            className="w-8 h-8 "
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 30 30">
            <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default InputPrice;
