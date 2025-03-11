import React, { useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  useEffect(() => {
    const toggle = document.getElementById('visual-toggle');

    function applyModePreference() {
      const mode = localStorage.getItem('mode');
      if (mode === 'light') {
        toggle.checked = true;
        document.body.classList.add('lightcolors');
        document.getElementById('visual-toggle-button').classList.add('lightmode');
      } else {
        toggle.checked = false;
        document.body.classList.remove('lightcolors');
        document.getElementById('visual-toggle-button').classList.remove('lightmode');
      }
    }

    applyModePreference();

    toggle.addEventListener('change', function () {
      if (toggle.checked) {
        localStorage.setItem('mode', 'light');
        document.body.classList.add('lightcolors');
        document.getElementById('visual-toggle-button').classList.add('lightmode');
      } else {
        localStorage.setItem('mode', 'dark');
        document.body.classList.remove('lightcolors');
        document.getElementById('visual-toggle-button').classList.remove('lightmode');
      }
    });
  }, []);

  const visualMode = () => {
    const toggle = document.getElementById('visual-toggle');
    if (toggle.checked) {
      localStorage.setItem('mode', 'light');
      document.body.classList.add('lightcolors');
      document.getElementById('visual-toggle-button').classList.add('lightmode');
    } else {
      localStorage.setItem('mode', 'dark');
      document.body.classList.remove('lightcolors');
      document.getElementById('visual-toggle-button').classList.remove('lightmode');
    }
  };

  return (
    <div>
      <div className="navbar">
        <img className="logo" src={assets.logo} alt="" />
        <img className="profile" src={assets.profile_image} alt="" />
      </div>

      <div className="navbar">
        <label htmlFor="visual-toggle" id="visual-toggle-button" onClick={visualMode}>
          <svg xmlns="http://www.w3.org/2000/svg" className="svgIcon-toggle sun-svg" viewBox="0 0 24 24">
            <g fill="#f1bd00">
              <circle r="5" cy="12" cx="12"></circle>
              <path d="M21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z"></path>
            </g>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" className="svgIcon-toggle moon-svg" fill="#f9ba48" viewBox="0 0 384 512">
            <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
          </svg>
          <input type="checkbox" className="visual-toggle" id="visual-toggle" />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
