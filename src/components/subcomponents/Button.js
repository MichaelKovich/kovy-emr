import React from 'react';

function button(props) {
  return (
    <button className="btn btn-outline-light" onClick={props.click}>
      {props.title}
    </button>
  );
}

export default button;
