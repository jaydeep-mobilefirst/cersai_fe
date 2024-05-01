import React, { useState } from "react";
import BackArrow from "../../assets/images/BackArrow.svg";
import RightArrow from "../../assets/images/RightArrow1.svg";

interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  maxPageNumbersToShow: number;
  currentPage?: number;
  setCurrentPage?: (data: any) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  itemsPerPage,
  maxPageNumbersToShow,
  currentPage,
  setCurrentPage,
}) => {
  // Calculate total pages
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber: number): void => {
    if (setCurrentPage && pageNumber) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate items to display on current page
  const indexOfLastItem: number = currentPage || 1 * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;

  // Generate an array of page numbers to display
  const pageNumbersToShow: (number | string)[] = [];
  if (currentPage) {
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - Math.floor(maxPageNumbersToShow / 2) &&
          i <= currentPage + Math.floor(maxPageNumbersToShow / 2))
      ) {
        pageNumbersToShow.push(i);
      }
    }
  }

  // Add ellipsis dynamically if needed
  if (currentPage && totalPages > maxPageNumbersToShow + 2) {
    if (currentPage > Math.floor(maxPageNumbersToShow / 2) + 1) {
      pageNumbersToShow.splice(1, 0, "ellipsis");
    }
    if (currentPage < totalPages - Math.floor(maxPageNumbersToShow / 2)) {
      pageNumbersToShow.splice(pageNumbersToShow.length - 1, 0, "ellipsis");
    }
  }

  return (
    <>
      <div className="mb-3 border-b-2 border-[#0000001A]"></div>
      <div className="flex flex-col md:flex-row items-center justify-between xl:w-[1197px]">
        <div className="mb-3 sm:mb-0">
          <p className="text-sm text-black font-normal text-gilroy-regular">
            Showing Data &nbsp;
            {Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <button
            onClick={() =>
              handlePageChange(
                currentPage && currentPage > 1 ? currentPage - 1 : 1
              )
            }
            disabled={currentPage === 1}
            className={`w-20 px-2 h-8 border-2 rounded-sm text-xs font-normal text-gilroy-regular flex items-center justify-around ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed mx-10"
                : ""
            } ${currentPage === 1 ? "mt-3 sm:mt-0" : ""} md:mr-12`}
          >
            <img srcSet={BackArrow} alt="backArrow" className="w-5" />
            Previous
          </button>

          <ul className="flex flex-wrap justify-center items-center space-x-4 ">
            {pageNumbersToShow.map((pageNumber, index) => (
              <li key={index}>
                {pageNumber === "ellipsis" ? (
                  <span className="px-3 py-1">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(pageNumber as number)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      currentPage === pageNumber
                        ? "bg-black text-white"
                        : "text-black"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={() =>
              handlePageChange(
                currentPage && currentPage < totalPages
                  ? currentPage + 1
                  : totalPages
              )
            }
            disabled={currentPage === totalPages}
            className={`w-20 h-8 border-2 rounded-sm text-xs font-normal text-gilroy-regular flex items-center justify-around ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed mx-10"
                : ""
            } ${currentPage === totalPages ? "mt-3 sm:mt-0" : ""} md:ml-12`}
          >
            Next
            <img srcSet={RightArrow} alt="RightArrow" className="w-3" />
          </button>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default CustomPagination;
