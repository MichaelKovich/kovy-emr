import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveReports} from '../../ducks/reducer';

import GenomicsCard from './subcomponents/GenomicsCard';
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
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: '1%',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '10px',
      minHeight: '60vh',
      fontFamily: 'Raleway',
    };

    let mappedReports = [];

    if (this.props.genomicsData && this.props.genomicsData.length > 0) {
      mappedReports = this.props.genomicsData.map(report => (
        <GenomicsCard
          key={report.report_id}
          title={report.title}
          gene={report.details.genes[0].id}
          chromosome={report.details.genes[0].chromosome}
          geneOverview={report.details.genes[0].gene_overview}
          explanation={report.details.markers[0].biological_explanation}
          snp={report.details.markers[0].id}
          assessment={report.summary.assessment.message}
        />
      ));
    }

    return (
      <div>
        {this.props.genomicsData && this.props.genomicsData.length > 0 ? (
          <div style={styles}>{mappedReports}</div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default connect(state => state, {retrieveReports})(GenomicsReports);
