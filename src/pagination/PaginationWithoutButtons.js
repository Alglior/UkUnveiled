import React, { useState } from "react";
import ListItem from "./ListItem";
import data from "./data";

function PaginationWithoutButtons() {
  const itemsPerPage = 5;
  
  const [currentPage,] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = data.slice(startIndex, endIndex);

  const handleItemClick = (item) => {
    console.log("Élément cliqué :", item);
  };





  return (
    <div>
      <div id="site_content"></div>
      <div className="border">
      <div className="item-list">
        {currentItems.map((item) => (
          <ListItem key={item.id} item={item} onItemClick={handleItemClick} />
        ))}
      </div>
      </div>
      <div id="site_content"></div>
    </div>
  );
}

export default PaginationWithoutButtons;
