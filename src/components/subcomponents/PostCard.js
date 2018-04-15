import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {Link} from 'react-router-dom';

const postCard = props => (
  <div className="card" style={{marginTop: '5px', fontFamily: 'Raleway'}}>
    <img
      className="card-img-top"
      src={props.image}
      style={{objectFit: 'cover'}}
      alt="Blog Post Header"
    />
    <div className="card-body">
      <h5 className="card-title">{ReactHtmlParser(props.title)}</h5>
      <p className="card-text">{ReactHtmlParser(props.excerpt)}</p>
      <Link to={`${props.path}/${props.id}`} className="btn btn-outline-secondary">
        Read More
      </Link>
    </div>
  </div>
);

export default postCard;
