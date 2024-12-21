import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    let pagesToShow = pages;

    if (totalPages > 7) {
      if (currentPage <= 4) {
        pagesToShow = [...pages.slice(0, 5), '...', totalPages];
      } else if (currentPage >= totalPages - 3) {
        pagesToShow = [1, '...', ...pages.slice(totalPages - 5)];
      } else {
        pagesToShow = [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      }
    }

    return pagesToShow.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === 'number' && onPageChange(page)}
        className={`
          h-10 w-10 flex items-center justify-center rounded-md
          text-sm font-medium transition-all
          ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          }
          ${typeof page === 'number' ? 'cursor-pointer' : 'cursor-default'}
        `}
        disabled={typeof page !== 'number'}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-6">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          h-10 w-10 flex items-center justify-center rounded-md transition-all
          text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          h-10 w-10 flex items-center justify-center rounded-md transition-all
          text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
