import React from 'react';

function button(props) {
  return (
    <button className="btn btn-outline-secondary" onClick={props.click}>
      {props.title}
    </button>
  );
}

export default button;
