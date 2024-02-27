/* eslint-disable react/prop-types */
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

const Pagination = ({ handlePageClick }) => {
  const { pageCount } = useSelector((state) => state.items);
  return (
    <div className="pb-4">
      <ReactPaginate
        containerClassName={
          'w-full h-full flex gap-2 items-center justify-center bg-slate-100 p-4'
        }
        activeClassName={'bg-black/10 rounded-full'}
        breakClassName={'item break-me '}
        pageLinkClassName={
          'flex items-center justify-center p-2 rounded-full  hover:bg-black/5  w-[42px]'
        }
        previousLinkClassName={
          'p-2 rounded-full flex items-center justify-center w-[42px]  hover:bg-black/5'
        }
        nextLinkClassName={
          'p-2 rounded-full flex items-center justify-center  w-[42px] hover:bg-black/5'
        }
        disabledLinkClassName={
          'p-2 rounded-full flex items-center justify-center  w-[42px] bg-red-300 hover:bg-black/5'
        }
        pageClassName={'text-black'}
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
