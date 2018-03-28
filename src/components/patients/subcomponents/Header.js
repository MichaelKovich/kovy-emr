import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userAuthenticate} from '../../../ducks/reducer';

import '../styles/patients.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(req, res, next) {
    this.props.userAuthenticate();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navigation">
        <a className="navbar-brand" href="/patients">
          Iyashi EMR
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Messages
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Health
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Medications
                </a>
                <a className="dropdown-item" href="#">
                  Genomics
                </a>
                <a className="dropdown-item" href="#">
                  Visits
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(state => state, {userAuthenticate})(Header);
