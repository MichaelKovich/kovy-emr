import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userAuthenticate} from '../../../ducks/reducer';
import {Link} from 'react-router-dom';

import '../styles/providers.css';

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
        <Link className="navbar-brand" to="/providers">
          Iyashi EMR | Providers
        </Link>
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
              <Link className="nav-link" to="/providers">
                Dashboard
              </Link>
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
                Messages
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">
                  Inbox
                </Link>
                <Link className="dropdown-item" to="/providers/messages/send">
                  Send Messages
                </Link>
              </div>
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
                <Link className="dropdown-item" to="/providers/medications/add">
                  Add Medications
                </Link>
                <Link className="dropdown-item" to="/providers/medications/update">
                  Update Medications
                </Link>
                <Link className="dropdown-item" to="/providers/visits/add">
                  Add Visits
                </Link>
                <Link className="dropdown-item" to="/providers/visits/update">
                  Update Visits
                </Link>
                <Link className="dropdown-item" to="#">
                  Genomics
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(state => state, {userAuthenticate})(Header);
