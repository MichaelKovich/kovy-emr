import React from 'react';

function button(props) {
  return <button onClick={props.click}>{props.title}</button>;
}

export default button;
