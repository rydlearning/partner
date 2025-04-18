import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  title: string
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  paginate,
  title
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers: (string | number)[] = [];

  pageNumbers.push(1);

  if (totalPages <= 5) {
    for (let i = 2; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 2) {
      pageNumbers.push(2, 3, "...");
    } else if (currentPage >= totalPages - 1) {
      pageNumbers.push("...", totalPages - 2, totalPages - 1);
    } else {
      pageNumbers.push(
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "..."
      );
    }

    pageNumbers.push(totalPages);
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="bg-[#F9F9F9] rounded-xl py-2 px-3 text-[#5E5E5E]">
          Page {currentPage}, {totalItems.toLocaleString()} {" Record(s)"}
        </p>

        <ul className="flex items-center space-x-5">
          {pageNumbers.map((pageNumber, i) => (
            <li
              key={i}
              className={`cursor-pointer ${
                pageNumber === currentPage
                  ? "text-white bg-[#1C274C] px-2.5 py-1 rounded-[0.2rem]"
                  : "px-2.5 py-1 border border-[#DADCE0] rounded-[0.2rem]"
              }`}
              onClick={() =>
                typeof pageNumber === "number" && paginate(pageNumber)
              }
            >
              {pageNumber}
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-5">
          <button
            onClick={prevPage}
            className={`flex items-center space-x-2  ${
              currentPage === 1
                ? "cursor-not-allowed text-[#5E5E5E]"
                : "text-black"
            }`}
          >
            <FaArrowLeftLong />
            <p>Previous</p>
          </button>
          <button
            onClick={nextPage}
            className={`flex items-center space-x-2  ${
              currentPage === totalPages
                ? "cursor-not-allowed text-[#5E5E5E]"
                : "tetx-black"
            }`}
          >
            <p>Next</p>
            <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
