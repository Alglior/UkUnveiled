// Function to load JSON data from a file
const loadData = async () => {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};

const itemsPerPage = 8;
let jsonData = [];
let currentPageMain = 0; // Current page for the main data
let totalPagesMain = 0; // Total pages for the main data
let currentPageSearch = 0; // Current page for search results
let totalPagesSearch = 0; // Total pages for search results

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const paginationContainerMain = document.getElementById('pagination-main');
const paginationContainerSearch = document.getElementById('pagination-search');

// Function to scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Inside the handleSearch function
const handleSearch = () => {
  const searchValue = searchInput.value.trim().toLowerCase();
  const mainPagination = document.getElementById('pagination-main');
  const searchPagination = document.getElementById('pagination-search');
  
  if (searchValue === '') {
    currentPageSearch = 0; // Reset the page to 0 when the search is cleared
    displayItems(jsonData, currentPageMain, mainPagination);
    mainPagination.style.display = 'block';
    searchPagination.style.display = 'none';
  } else {
    const searchResults = jsonData.filter(item => item.text.toLowerCase().includes(searchValue));
    displayItems(searchResults, currentPageSearch, searchPagination);
    searchPagination.style.display = 'block';
    mainPagination.style.display = 'none';
  }
};



const displayItems = (data, page, paginationContainer) => {
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  resultsContainer.innerHTML = '';

  for (const item of itemsToDisplay) {
    const itemContainer = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.src = item.imageUrl;
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';
    imgElement.style.marginTop = '10px';

    const linkElement = document.createElement('a');
    linkElement.href = item.link; // Set the link to the "link" property
    linkElement.target = '_blank'; // Open the link in a new tab

    const textDiv = document.createElement('p');
    textDiv.textContent = item.text;

    linkElement.appendChild(imgElement);
    linkElement.appendChild(textDiv);
    itemContainer.appendChild(linkElement);
    resultsContainer.appendChild(itemContainer);
  }

  // Generate pagination buttons with a maximum of 5 buttons
  generatePaginationButtons(data.length, page, paginationContainer, 5);
};


const generatePaginationButtons = (totalItems, currentPage, paginationContainer, maxButtons) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationContainer.innerHTML = '';

  const halfMaxButtons = Math.floor(maxButtons / 2);
  let startPage = Math.max(0, currentPage - halfMaxButtons);
  let endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);

  // Adjust the startPage and endPage to ensure you have maxButtons buttons
  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(0, endPage - maxButtons + 1);
  }

  // Add "Back" button
  if (currentPage > 0) {
    const backButton = document.createElement('li');
    backButton.textContent = '<';
    backButton.addEventListener('click', () => {
      if (paginationContainer === paginationContainerMain) {
        currentPageMain--;
      } else if (paginationContainer === paginationContainerSearch) {
        currentPageSearch--;
      }
      handleSearch();
      scrollToTop();
    });
    paginationContainer.appendChild(backButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement('li');
    button.textContent = i + 1;
    button.addEventListener('click', () => {
      if (paginationContainer === paginationContainerMain) {
        currentPageMain = i;
      } else if (paginationContainer === paginationContainerSearch) {
        currentPageSearch = i;
      }
      handleSearch();
      scrollToTop();
    });

    if (i === currentPage) {
      button.classList.add('active');
    }

    paginationContainer.appendChild(button);
  }

  // Add "Next" button
  if (currentPage < totalPages - 1) {
    const nextButton = document.createElement('li');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', () => {
      if (paginationContainer === paginationContainerMain) {
        currentPageMain++;
      } else if (paginationContainer === paginationContainerSearch) {
        currentPageSearch++;
      }
      handleSearch();
      scrollToTop();
    });
    paginationContainer.appendChild(nextButton);
  }
};

// Load data and initialize the page
loadData().then(data => {
  jsonData = data;
  totalPagesMain = Math.ceil(data.length / itemsPerPage);
  displayItems(data, currentPageMain, paginationContainerMain);
  generatePaginationButtons(data.length, currentPageMain, paginationContainerMain, 5);
  searchInput.addEventListener('input', handleSearch);

  // Call the generatePaginationButtons function for search results as well
  generatePaginationButtons(data.length, currentPageSearch, paginationContainerSearch, 5);
});

