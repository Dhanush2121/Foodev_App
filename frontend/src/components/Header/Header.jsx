import React, { useState, useEffect } from 'react';
import './Header.css';

const images = [
  "/images/header_img.png",
  "/images/two.webp",
  "/images/three.jpg",
  "/images/four.jpg",
  "/images/five.jpg"
];

const Header = () => {
    const [currentImage, setCurrentImage] = useState(images[0]);
    let index = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            index = (index + 1) % images.length;
            setCurrentImage(images[index]);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
      <div className='header' style={{ backgroundImage: `url(${currentImage})` }}>
          <div className="header-contents">
              <h2>Order your favorite food here</h2>
              <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients. Satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
              <a href="#explore-menu"><button className='buttonwl'>View Menu</button></a>
          </div>
      </div>
    );
};

export default Header;
