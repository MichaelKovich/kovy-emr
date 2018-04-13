import React from 'react';

import '../../../App.css';

function medicationCard(props) {
  return (
    <div className="card" style={{marginTop: '5px', fontFamily: 'Raleway'}}>
      <div className="card-body">
        <h5 className="card-title">{props.medicationname}</h5>
        <p className="card-text">{props.dosage}</p>
        <span
          className={
            props.prescribed === 'Prescription'
              ? 'card-link badge badge-pill badge-primary'
              : 'card-link badge badge-pill badge-secondary'
          }
        >
          {props.prescribed}
        </span>
      </div>
    </div>
  );
}

export default medicationCard;
