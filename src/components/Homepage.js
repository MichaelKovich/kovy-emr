import React, {Component} from 'react';
import axios from 'axios';

import Button from './subcomponents/Button';

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
  }
}

export default Homepage;
