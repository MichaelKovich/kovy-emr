import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveReports} from '../../ducks/reducer';

import Loading from '../subcomponents/Loading';
import './styles/patients.css';

class GenomicsReports extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.retrieveReports();
  }

  render() {
    let mappedReports = [];

    if (this.props.genomicsData && this.props.genomicsData.length > 0) {
      mappedReports = this.props.genomicsData.map(report => (
        <div key={report.report_id}>
          <h3>{report.title}</h3>
        </div>
      ));
    }

    // if (this.props.medications && this.props.medications.length > 0) {
    //   mappedMedications = this.props.medications.map(medication => (
    //     <MedicationCard
    //       medicationname={medication.medication_name}
    //       dosage={medication.dosage}
    //       prescribed={medication.prescribed ? 'Prescription' : 'Over-the-Counter'}
    //     />
    //   ));
    // }

    return (
      <div className="medications-c2">
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
