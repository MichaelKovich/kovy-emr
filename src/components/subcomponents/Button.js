import React from 'react';

import '../../App.css';

function button(props) {
  return (
    <button className="btn btn-outline-light" onClick={props.click} style={{fontFamily: 'Raleway'}}>
      {props.title}
      {props.subtitle ? <br /> : null}
      {props.subtitle ? props.subtitle : null}
    </button>
  );
}

export default button;
