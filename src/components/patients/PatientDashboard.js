import React, {Component} from 'react';
import {withRouter} from 'react-router';

import Loading from '../subcomponents/Loading';

// This component makes it easy to add a unique dashboard in the future.
// Simply build out the component and change the URL in Processing.js

class PatientDashboard extends Component {
  componentDidMount() {
    this.props.history.push('/patients/blog');
  }

  render() {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}

export default withRouter(PatientDashboard);
