import React from 'react';
import './styles/footer.css';

const footer = () => (
  <footer className="footer-distributed">
    <div className="footer-left">
      <h3>
        Iyashi<span>EMR</span>
      </h3>

      <p className="footer-links">
        <a href="/" style={{marginRight: '1%'}}>
          Home
        </a>
        <a href="/blog" style={{marginRight: '1%'}}>
          Blog
        </a>
        <a href="/about" style={{marginRight: '1%'}}>
          About
        </a>
        <a href="/FAQ" style={{marginRight: '1%'}}>
          FAQ
        </a>
        <a href="/contact">Contact</a>
      </p>

      <p className="footer-company-name">Michael Kovich &copy; 2018</p>
    </div>

    <div className="footer-center">
      <div>
        <i className="fa fa-map-marker" />
        <p>
          <span>500 S. Ervay St.</span> Dallas, Texas
        </p>
      </div>

      <div>
        <i className="fa fa-phone" />
        <p>+1 (484) 464-8640</p>
      </div>

      <div>
        <i className="fa fa-envelope" />
        <p>
          <a href="/contact">hello@IyashiEMR.com</a>
        </p>
      </div>
    </div>

    <div className="footer-right">
      <p className="footer-company-about">
        <span>About the Application</span>
        IyashiEMR makes it easy for patients and providers to access, share, and update information
        in one secure location.
      </p>

      <div className="footer-icons">
        <a href="https://www.michaelkovich.com/blog/">
          <i className="fa fa-facebook" />
        </a>
        <a href="https://twitter.com/MichaelKovich">
          <i className="fa fa-twitter" />
        </a>
        <a href="https://www.linkedin.com/in/michaelkovich/">
          <i className="fa fa-linkedin" />
        </a>
        <a href="https://github.com/MichaelKovich/">
          <i className="fa fa-github" />
        </a>
      </div>
    </div>
  </footer>
);

export default footer;
