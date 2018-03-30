import React from 'react';

function visitCard(props) {
  return (
    <div className="card visit-card">
      <div className="card-body">
        <h5 className="card-title">{props.date}</h5>
        {/* <h6 className="card-subtitle mb-2 t ext-muted">Card subtitle</h6> */}
        <p className="card-text" id="card-text-bold">
          {props.type}
        </p>
        <p className="card-text">
          Dr. {props.givenname} {props.familyname}
        </p>
        <a href="#" className="card-link">
          Update Visit
        </a>
        <a href="#" className="card-link">
          Cancel Visit
        </a>
      </div>
    </div>
  );
}

export default visitCard;
