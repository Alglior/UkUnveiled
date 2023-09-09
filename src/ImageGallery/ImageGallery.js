import React, { useState, useEffect } from 'react';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Automatically scroll to the next image every 5 seconds
  useEffect(() => {
    const handleInterval = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const intervalId = setInterval(handleInterval, 5000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, images.length]);
  

  return (
    <div>
      <div className="scroll-box">
        <div className="content-wrapper">
          <div className="image-container">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="image-fade"
            />
            <div className="text-container">
              <h2 className="image-title">{images[currentIndex].title}</h2>
              <p className="image-text">{images[currentIndex].text}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrevImage} className="blue-button">
          Previous
        </button>
        <button onClick={handleNextImage} className="blue-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
