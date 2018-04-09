import React from 'react';

function button(props) {
  return (
    <button className="btn btn-outline-light" onClick={props.click}>
      {props.title}
      {props.subtitle ? <br /> : null}
      {props.subtitle ? props.subtitle : null}
    </button>
  );
}

export default button;
