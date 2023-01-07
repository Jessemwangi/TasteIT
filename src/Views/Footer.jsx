import React from 'react';
import './CSS/Views.css';

const Footer = () => {
    return (
      <main>
        <footer className='footer'>
             <div className="disclaimer">
              <p style={{display:"inline-block",marginBottom:"0rem"}}> 
        picture curtersy of
        <a className="disclaimer__link"
          href="https://source.unsplash.com"
          target="_blank" rel='noreferrer'>
          unsplash.
        </a></p>
        Jesse mwangi 2023
      </div>
        </footer>
        </main>
    );
};

export default Footer;