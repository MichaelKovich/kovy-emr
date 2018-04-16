import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../../App.css';

class GenomicsAuthorization extends Component {
  render() {
    const styles = {
      width: '50%',
      minHeight: '60vh',
      marginLeft: '25%',
      marginRight: '25%',
      marginBottom: 'auto 0',
      marginTop: 'auto 0',
      fontFamily: 'Raleway',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    };

    return (
      <div style={styles}>
        <div>
          <div className="card text-center">
            <div className="card-header">23andMe | Genetic Testing and Analysis</div>
            <div className="card-body">
              <p className="card-text">
                You can securely connect your 23andMe account to the IyashiEMR platform and view
                your Genetic Phenotype Range Interactions right on this page! Click the button below
                to get started.
              </p>
              <a href="https://api.23andme.com/authorize/?redirect_uri=http://iyashiemr.com/receive_code/&response_type=code&client_id=8dbcf90617c73ea960abe7e69e00dae4&scope=report:all&select_profile=True">
                <img
                  src="https://api.23andme.com/res/img/connect-button-example.0e3585418be8.png"
                  alt="Connect With 23AndMe"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(GenomicsAuthorization);
