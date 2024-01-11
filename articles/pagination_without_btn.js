// Function to load JSON data from a file
const loadData = async (fileName) => {
  try {
      const response = await fetch(fileName);
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

const itemsPerPage = 3;
let jsonData = [];
let customData = [];
let currentPageMain = 0; // Current page for the main data
let currentPageCustom = 0; // Current page for the custom data

const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const customResultsContainer = document.getElementById('customResults');

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
  if (searchValue === '') {
      currentPageMain = 0; // Reset the page to 0 when the search is cleared
      displayItems(jsonData, currentPageMain, resultsContainer);
      displayItems(customData, currentPageCustom, customResultsContainer);
  } else {
      const searchResultsMain = jsonData.filter(item => item.text.toLowerCase().includes(searchValue));
      const searchResultsCustom = customData.filter(item => item.text.toLowerCase().includes(searchValue));
      displayItems(searchResultsMain, currentPageMain, resultsContainer);
      displayItems(searchResultsCustom, currentPageCustom, customResultsContainer);
  }
};

const displayItems = (data, page, container) => {
  // Reverse the order of the data array
  const reversedData = [...data].reverse();

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = reversedData.slice(startIndex, endIndex);

  container.innerHTML = '';

  for (const item of itemsToDisplay) {
      const itemContainer = document.createElement('div');

      // Create an anchor element (a) to make the image clickable
      const linkElement = document.createElement('a');
      linkElement.href = item.link; // Set the link based on the "link" property
      linkElement.target = "_blank"; // Open the link in a new tab/window

      const imgElement = document.createElement('img');
      imgElement.src = item.imageUrl;
      imgElement.style.maxWidth = '100%';
      imgElement.style.height = 'auto';
      imgElement.style.marginTop = '10px';

      // Append the image element to the anchor element
      linkElement.appendChild(imgElement);

      const textDiv = document.createElement('p');
      textDiv.textContent = item.text;

      // Append the anchor element with the image to the item container
      itemContainer.appendChild(linkElement);

      // Append the textDiv to the item container
      itemContainer.appendChild(textDiv);

      // Append the item container to the results container
      container.appendChild(itemContainer);
  }
};

// Load data and initialize the page
loadData('data.json').then(data => {
  jsonData = data;
  displayItems(data, currentPageMain, resultsContainer);
  searchInput.addEventListener('input', handleSearch);
});

// Load custom data and initialize the custom results page
loadData('data_copy.json').then(data => {
  customData = data;
  displayItems(data, currentPageCustom, customResultsContainer);
});
