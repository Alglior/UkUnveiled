// Function to filter the data based on the search input
function search() {
  const input = document.getElementById("search-input").value.toLowerCase();
  const results = document.getElementById("search-results");
  results.innerHTML = "";

  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        if (item.text.toLowerCase().includes(input)) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          const img = document.createElement("img");

          a.href = item.link;
          img.src = item.imageUrl;
          img.alt = item.text;

          a.appendChild(img);
          li.appendChild(a);
          results.appendChild(li);
        }
      });
    })
    .catch(error => console.error(error));
}