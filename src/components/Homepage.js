import React from 'react';

import Button from './subcomponents/Button';
import '../App.css';

const homepage = () => (
  <div className="homepage-container">
    <div className="homepage-top" />
    <div className="homepage-top" />
    <div className="homepage-top" />
    <div className="homepage-center-left" />
    <div className="homepage-center">
      <div>
        <a href="/authentication/login">
          <Button title="Login" />
        </a>
      </div>
    </div>
    <div className="homepage-center-right" />
    <div className="homepage-bottom" />
    <div className="homepage-bottom" />
    <div className="homepage-bottom" />
  </div>
);

export default homepage;
