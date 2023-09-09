// ListItem.js
import React from "react";
import "./ListItem.css"; // Import the CSS file for styling

function ListItem({ item }) {
  return (

  <a href={item.link} class="list-item">
    <div class="list-item-content">
      <img src={item.imageUrl} alt={item.text} />
      <p>{item.text}</p>
    </div>
  </a>

  );
}

export default ListItem;
