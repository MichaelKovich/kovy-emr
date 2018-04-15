import React from 'react';
import {Link} from 'react-router-dom';

import '../../../App.css';

function genomicsCard(props) {
  return (
    <div className="card" style={{marginTop: '5px', fontFamily: 'Raleway'}}>
      <div className="card-body">
        <h5 className="card-title">
          <span style={{fontWeight: '600'}}>{props.title}</span>
        </h5>
        <p className="card-text" id="card-text-bold">
          <span style={{fontWeight: '600'}}>Chromosome: </span>
          {props.chromosome}
          <br />
          <span style={{fontWeight: '600'}}>Gene: </span>
          {props.gene}
          <br />
          <span style={{fontWeight: '600'}}>SNP: </span>
          {props.snp}
          <br />
          <br />
          <p className="card-text">
            <span style={{fontWeight: '600'}}>Personal Assessment: </span>
            <br />
            {props.assessment}
          </p>
        </p>
        <p className="card-text">
          <span style={{fontWeight: '600'}}>Overview: </span>
          {props.geneOverview}
        </p>
        <p className="card-text">
          <span style={{fontWeight: '600'}}>Biological Explanation: </span>
          {props.explanation}
        </p>
        <Link to="/patients/blog" className="btn btn-outline-primary">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default genomicsCard;
