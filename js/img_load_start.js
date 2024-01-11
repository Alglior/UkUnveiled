const buttons = document.querySelectorAll('.nav-button');
const imageTitle = document.querySelector('.image-title'); // Select the title element
const imageText = document.querySelector('.image-text'); // Select the text element

let currentImageIndex = 0;
const titles = [
  'Charting our own course: post-Brexit economic independence',
  "Brexit's ripple effect on global dynamics",
  'The primacy of home: perspective on global issues'
];
const texts = [
  'And after Brexit, we will be free to determine our economic future, with control over our money, laws and borders. Liz Truss',
  'Brexit is the best thing to happen for Russia, for America, for Germany, and for democracy. Nigel Farage',
  "Everything else outside the world - Brexit, the global economy, global warming, everything - nothing matters as much as what's in your house. John Bishop"
];

function changeImage(imageIndex) {
  imageTitle.innerHTML = titles[imageIndex];
  imageText.textContent = texts[imageIndex];
  buttons.forEach((button, index) => {
    button.style.backgroundColor = index === imageIndex ? '#3498db' : 'white';
    button.style.color = index === imageIndex ? 'white' : 'black';
  });
  currentImageIndex = imageIndex;
}

function changeImageSequentially() {
  const nextImageIndex = (currentImageIndex + 1) % titles.length;
  changeImage(nextImageIndex);
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    changeImage(index);
  });
});

// Start automatic image and text change every 2 seconds when the page loads
setInterval(changeImageSequentially, 2000);

// Initial image and text change
changeImage(currentImageIndex);