import { useState } from 'react';

const InputPrice = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <input
        id="price"
        type="number"
        value={value}
        placeholder="Введите стоимость..."
        onChange={handleChange}
        className="border border-gray-300 h-[38px] rounded-md p-2"
      />
    </div>
  );
};

export default InputPrice;
