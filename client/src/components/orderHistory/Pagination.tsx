import { getPageNumbers } from "../../pages/OrderHistory/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  totalItems: number;
  onGoToPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  onGoToPage,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="order-pagination">
      <p className="order-pagination-info">
        Showing {startIndex + 1}–
        {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} orders
      </p>
      <div className="order-pagination-buttons">
        <button
          onClick={() => onGoToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="order-page-btn order-page-nav"
        >
          Prev
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onGoToPage(page)}
            className={`order-page-btn order-page-num ${page === currentPage ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onGoToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="order-page-btn order-page-nav"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
