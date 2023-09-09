import React from "react";

function SearchPagination({ currentPage, totalPages, onPageChange }) {
  const maxVisibleButtons = 5;

  const calculateVisibleButtons = () => {
    const visibleButtons = [];
    const halfMaxVisibleButtons = Math.floor(maxVisibleButtons / 2);

    let firstVisibleButton = Math.max(currentPage - halfMaxVisibleButtons, 1);
    let lastVisibleButton = Math.min(firstVisibleButton + maxVisibleButtons - 1, totalPages);

    if (lastVisibleButton - firstVisibleButton + 1 < maxVisibleButtons) {
      firstVisibleButton = Math.max(lastVisibleButton - maxVisibleButtons + 1, 1);
    }

    for (let i = firstVisibleButton; i <= lastVisibleButton; i++) {
      visibleButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return visibleButtons;
  };

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const goToFirstPage = () => {
    handlePageChange(1);
  };

  const goToLastPage = () => {
    handlePageChange(totalPages);
  };

  return (
    <div className="pagination">
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
      >
        First
      </button>
      {calculateVisibleButtons()}
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
}

export default SearchPagination;
