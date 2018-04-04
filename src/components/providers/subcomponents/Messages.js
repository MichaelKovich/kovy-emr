import React from 'react';
import '../styles/providers.css';

const messages = props => (
  <div className="card message">
    <div className="card-header" id={`heading${props.keyid}`}>
      <h5 className="mb-0">
        <button
          className="btn btn-link"
          id="messageheader"
          data-toggle="collapse"
          data-target={`#collapse${props.keyid}`}
        >
          <img src={props.avatar} className="circle" height="32px" width="32px" /> {props.subject}
        </button>
      </h5>
    </div>

    <div id={`collapse${props.keyid}`} className="collapse" data-parent="#accordion">
      <div className="card-body" id="message-body">
        <p id="sender-line">FROM: {props.sender}</p>
        <p>{props.content}</p>
      </div>
    </div>
  </div>
);

export default messages;
