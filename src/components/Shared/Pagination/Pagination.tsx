import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

function Pagination({pageCount, handlePageClick, offset}) {

    return (
        <div className="flex justify-center items-center text-center">
  <ReactPaginate
    className="flex gap-2 items-center p-4"
    breakLabel="..."
    onPageChange={handlePageClick}
    pageRangeDisplayed={5}
    pageCount={pageCount}
    renderOnZeroPageCount={null}
    activeClassName="bg-yellow-500 text-white font-bold w-8 h-8 flex justify-center items-center rounded"
    containerClassName="flex gap-1"
    pageClassName="w-8 h-8 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white transition-all duration-200"
    pageLinkClassName="text-blue-900 font-medium"
    breakClassName="text-blue-900 font-medium"
    disabledClassName="opacity-50 cursor-not-allowed"
    previousClassName="w-8 h-8 flex justify-center items-center rounded bg-gray-400 text-white hover:bg-gray-500 transition-all duration-200"
    nextClassName="w-8 h-8 flex justify-center items-center rounded bg-gray-400 text-white hover:bg-gray-500 transition-all duration-200"
    previousLabel={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-arrow-left"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    }
    nextLabel={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-arrow-right"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    }
  />
</div>

    );
}

export default Pagination;