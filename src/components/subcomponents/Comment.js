import React from 'react';

const comments = props => (
  <div className="media mb-4">
    <img
      className="d-flex mr-3 rounded-circle"
      src={props.image}
      style={{width: '50px', height: '50px'}}
      alt=""
    />
    <div className="media-body">
      <h5 className="mt-0">
        {props.first} {props.last}
      </h5>
      {props.content}
    </div>
  </div>
);

export default comments;
