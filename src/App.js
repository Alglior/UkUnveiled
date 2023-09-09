import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './pagination/SearchBar'; // Import the SearchBar component
import PaginationWithoutButtons from "./pagination/PaginationWithoutButtons"; // Import your PaginationWithoutButtons component
import ImageGallery from './ImageGallery/ImageGallery'; // Import the ImageGallery component
import imageData from './ImageGallery/ImageData'; // Import the image data

function HomePage() {
  return (
    <div>
      <div className="site_content">
      <div className="custom-hr"></div>
			<center><h2 className="welcome-heading">Welcome to UK Unveiled</h2>
      <h1>Inside European Politics: Unmasking the Continent</h1>
      </center>
				<div className="custom-hr"></div>
        
        <ImageGallery images={imageData} />
        <div className="custom-hr"></div>
        
        <center><PaginationWithoutButtons /></center>

    </div>
    </div>
  );
}

function NewsPage() {
  return (
    <div>
      <div className="site_content">

        
      <center><SearchBar /></center>
      </div>
      
      
      
    </div>
  );
}

function Download() {
  return (
    <div>
      <div className="site_content">
      <h1>Download GitHub</h1>
       <p>To further enrich your journey through the intricacies of Brexit, we invite you to explore our GitHub repository at <a href="https://github.com/Alglior/UkUnveiled.git">Click here to visit the repository</a> </p>
		<p> This repository serves as a treasure trove of valuable resources, where you can access additional project materials, code samples, and insightful documentation.</p>
		
      </div>
    </div>
    
  );
}

function App() {
  // Récupérer la valeur actuelle de 'currentPage' depuis le localStorage
  const savedPage = localStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState(savedPage || 'home'); // Utilise 'news' si aucune valeur n'est stockée

  const changePage = (page) => {
    setCurrentPage(page);
    // Stocker la nouvelle valeur de 'currentPage' dans le localStorage
    localStorage.setItem('currentPage', page);
  };

  useEffect(() => {
    // Gérer l'état côté client ici en fonction de 'currentPage'
    // Vous pouvez afficher ou masquer des composants en fonction de 'currentPage'
  }, [currentPage]);

  return (
    <div>
      
      <div className="header">
      
    
      <div className="logo">
  <button onClick={(e) => { e.preventDefault(); changePage('home'); }} className="logo_button"></button>
  <img
  onClick={(e) => { e.preventDefault(); changePage('home'); }}
  className="logo_image"
  src="logo.png"
  alt="Logo"
/>

  <div className="logo_text">
    <h1><button onClick={(e) => { e.preventDefault(); changePage('home'); }} className="logo_button_text"><span>Uk</span> Unveiled</button></h1>
  </div>
</div>



      <div className="menubar">
      <ul className="menu">
      <li><button onClick={(e) => { e.preventDefault(); changePage('home'); }}>Home</button></li>
      <li><button onClick={(e) => { e.preventDefault(); changePage('news'); }}>News</button></li>
      <li><button onClick={(e) => { e.preventDefault(); changePage('download'); }}>Download</button></li>

      </ul>
      </div>
      </div>

      {currentPage === 'home' ? <HomePage /> : currentPage === 'news' ? <NewsPage /> : <Download />}
    
      <div className="footer">
	<img src="logo.png" alt="Logo"></img>
    </div>
    
    
    </div>
  );
}

export default App;
