import React, { useState } from 'react';
import data from './data';
import Pagination from './pagination'; // Import the old pagination component
import SearchPagination from './SearchPagination'; // Import the new pagination component
import '../App.css';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State for the current page

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1); // Reset the current page when the user changes the search query
  };

  // Filter the data based on the search query
  const filteredData = data.filter(item =>
    item.text.toLowerCase().includes(searchQuery)
  );

  // Determine how many items per page you want to display
  const itemsPerPage = 8;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get the slice of data to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
        style={{
          width: '70%', /* Adjust the width as needed */
          height: '20px', /* Adjust the height as needed */
          padding: '10px',
          border: '2px solid #0074D9',
          backgroundColor: '#F0F8FF',
          color: '#333',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          fontSize: '16px',
        }}
      />

      {searchQuery.length > 0 ? (
        <div className="centered-content">
          {displayedData.map((item) => (
            <div key={item.id} className="list-item">
              <a href={item.link} className="list-item-content">
                <img
                  src={item.imageUrl}
                  alt={item.text}
                />
                <p>{item.text}</p>
              </a>
            </div>
          ))}
          {/* Display the new pagination component for the search */}
          <SearchPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      ) : (
        // Display the old pagination component when the search query is empty
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </div>
  );
}

export default SearchBar;
