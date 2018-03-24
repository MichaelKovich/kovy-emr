import React, {Component} from 'react';
import axios from 'axios';

import Button from '../subcomponents/Button';

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homepage-container">
        <a href="/authentication/login">
          <Button title="Login" />
        </a>
      </div>
    );
  }
}

export default Homepage;
