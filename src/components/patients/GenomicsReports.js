import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveReports} from '../../ducks/reducer';

import Loading from '../subcomponents/Loading';
import '../../App.css';

class GenomicsReports extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.retrieveReports();
  }

  render() {
    const styles = {
      width: '50%',
      height: '80%',
      marginLeft: '25%',
      marginRight: '25%',
      fontFamily: 'Raleway',
    };

    let mappedReports = [];

    if (this.props.genomicsData && this.props.genomicsData.length > 0) {
      mappedReports = this.props.genomicsData.map(report => (
        <div key={report.report_id}>
          <h3>{report.title}</h3>
        </div>
      ));
    }

    return (
      <div style={styles}>
        {this.props.genomicsData && this.props.genomicsData.length > 0 ? (
          <div>{mappedReports}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrieveReports})(GenomicsReports);
