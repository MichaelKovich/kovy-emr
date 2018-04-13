import React from 'react';

import '../../../App.css';

function visitCard(props) {
  return (
    <div className="card" style={{marginTop: '5px', fontFamily: 'Raleway'}}>
      <div className="card-body">
        <h5 className="card-title">{props.date}</h5>
        <p className="card-text" id="card-text-bold">
          {props.type}
        </p>
        <p className="card-text">
          Dr. {props.givenname} {props.familyname}
        </p>
        <button className="card-link" onClick={() => props.onCancel(props.visitid, props.date)}>
          Cancel Visit
        </button>
      </div>
    </div>
  );
}

export default visitCard;
