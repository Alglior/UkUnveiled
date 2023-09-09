import React, { useState } from "react";
import ListItem from "./ListItem";
import data from "./data";

function Pagination() {
  const itemsPerPage = 8; // Nombre d'éléments à afficher par page
  const maxVisibleButtons = 5; // Nombre maximum de boutons de pagination visibles à la fois
  const [currentPage, setCurrentPage] = useState(1);

  // Calcul de la plage d'index pour la page actuelle
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = data.slice(startIndex, endIndex);

  const handleItemClick = (item) => {
    // Gérer le clic sur l'élément ici
    console.log("Élément cliqué :", item);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const visibleButtons = [];

  // Calculer le premier et le dernier bouton de pagination visibles
  let firstVisibleButton = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
  let lastVisibleButton = Math.min(firstVisibleButton + maxVisibleButtons - 1, totalPages);

  // Ajuster le premier bouton si nous sommes près de la fin
  if (lastVisibleButton - firstVisibleButton + 1 < maxVisibleButtons) {
    firstVisibleButton = Math.max(lastVisibleButton - maxVisibleButtons + 1, 1);
  }

  // Remplir le tableau des boutons de pagination visibles
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

  return (
    <div>
      <div id="site_content"></div>
      <div className="pagination">
        <button onClick={goToFirstPage} className={currentPage === 1 ? "disabled" : ""}>
          First
        </button>
        {visibleButtons}
        <button onClick={goToLastPage} className={currentPage === totalPages ? "disabled" : ""}>
          Last
        </button>
      </div>
      <div className="border">
      <div className="item-list">
        {currentItems.map((item) => (
          <ListItem key={item.id} item={item} onItemClick={handleItemClick} />
        ))}
      </div></div>
      <div id="site_content"></div>
      <div className="pagination">
        <button onClick={goToFirstPage} className={currentPage === 1 ? "disabled" : ""}>
          First
        </button>
        {visibleButtons}
        <button onClick={goToLastPage} className={currentPage === totalPages ? "disabled" : ""}>
          Last
        </button>
      </div>
    </div>
  );
}

export default Pagination;
