import React from 'react';

function medicationCard(props) {
  return (
    <div className="card medication-card">
      <div className="card-body">
        <h5 className="card-title">{props.medicationname}</h5>
        {/* <p className="card-text" id="card-text-bold">
          {props.type}
        </p> */}
        <p className="card-text">{props.dosage}</p>
        <a href="#" className="card-link">
          <span className="badge badge-pill badge-primary">{props.prescribed}</span>
        </a>
        {/* <a href="#" className="card-link">
          Cancel Visit
        </a> */}
      </div>
    </div>
  );
}

export default medicationCard;
