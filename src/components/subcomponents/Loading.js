import React from 'react';

import './styles/loading.css';
import '../../App.css';

function loading() {
  return (
    <div className="spinner">
      <div className="cube1" />
      <div className="cube2" />
    </div>
  );
}

export default loading;
