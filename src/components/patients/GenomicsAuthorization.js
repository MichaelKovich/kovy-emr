import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../../App.css';

class GenomicsAuthorization extends Component {
  render() {
    const styles = {
      width: '50%',
      height: '80%',
      marginLeft: '25%',
      marginRight: '25%',
    };

    return (
      <div style={styles}>
        <a href="https://api.23andme.com/authorize/?redirect_uri=http://localhost:3000/receive_code/&response_type=code&client_id=8dbcf90617c73ea960abe7e69e00dae4&scope=report:all&select_profile=True">
          <img
            src="https://api.23andme.com/res/img/connect-button-example.0e3585418be8.png"
            alt="Connect With 23AndMe"
          />
        </a>
      </div>
    );
  }
}

export default connect(state => state)(GenomicsAuthorization);
