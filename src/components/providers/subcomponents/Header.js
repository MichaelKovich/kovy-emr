import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userAuthenticate} from '../../../ducks/reducer';
import {Link} from 'react-router-dom';

import '../../../App.css';

class Header extends Component {
  componentWillMount(req, res, next) {
    this.props.userAuthenticate();
  }

  render() {
    const style = {fontFamily: 'Raleway'};

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={style}>
        <Link className="navbar-brand" to="/providers" style={{marginLeft: '1%'}}>
          IyashiEMR | <span style={{color: '#5383d3'}}>Providers</span>
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
                <Link className="dropdown-item" to="/providers/messages">
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
                Billing
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/providers/billing/add">
                  Add Bills
                </Link>
                <Link className="dropdown-item" to="/providers/billing/update">
                  Update Bills
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/providers/profile">
                Profile
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
                Blog
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/providers/blog">
                  See Posts
                </Link>
                <Link className="dropdown-item" to="/providers/blog/create">
                  Create a Post
                </Link>
              </div>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/patients">
                Patient Dash
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(state => state, {userAuthenticate})(Header);
