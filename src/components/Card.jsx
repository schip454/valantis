/* eslint-disable react/prop-types */

const CardItem = ({ item, i }) => {
  return (
    <div className="flex flex-col bg-slate-200 p-3 rounded-lg">
      <p className="text-xs mb-2">{i}</p>
      <p className="text-xs mb-2">{item.id}</p>
      <p className="mb-1">{item.brand ? item.brand : 'Бренд'}</p>
      <h2 className="font-bold leading-5 mb-2 min-h-[40px]">{item.product}</h2>
      <p className="">
        Цена: <span className="font-bold">{item.price} ₽</span>
      </p>
    </div>
  );
};

export default CardItem;
