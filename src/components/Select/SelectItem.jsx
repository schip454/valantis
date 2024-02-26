import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const SelectItem = () => {
  return (
    <>
      <h1 className="text-3xl text-red-300">Filter</h1>
      <Select onChange={(e) => console.log(e.value)} options={options} />
    </>
  );
};

export default SelectItem;
