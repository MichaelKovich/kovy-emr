import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userAuthenticate} from '../../../ducks/reducer';
import {Link} from 'react-router-dom';

class Header extends Component {
  componentWillMount(req, res, next) {
    this.props.userAuthenticate();
  }

  render() {
    const style = {fontFamily: 'Raleway'};

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={style}>
        <Link className="navbar-brand" to="/patients" style={{marginLeft: '1%'}}>
          Iyashi<span style={{color: '#5383d3'}}>EMR</span>
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
                <Link className="dropdown-item" to="/patients/messages">
                  Inbox
                </Link>
                <Link className="dropdown-item" to="/patients/messages/send">
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
                <Link className="dropdown-item" to="/patients/medications">
                  Medications
                </Link>
                <Link className="dropdown-item" to="/patients/genomics">
                  Genomics
                </Link>
                <Link className="dropdown-item" to="/patients/visits">
                  Visits
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
                <Link className="dropdown-item" to="/patients/billing">
                  Pay a Bill
                </Link>
                <Link className="dropdown-item" to="/patients/billing/history">
                  Billing History
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/patients/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/patients/blog">
                Blog
              </Link>
            </li>
                   <li className="nav-item">
              <Link className="nav-link" to="/providers">
                Provider Dash
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(state => state, {userAuthenticate})(Header);
