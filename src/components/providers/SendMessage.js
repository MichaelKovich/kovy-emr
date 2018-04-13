import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMyPatients, retrieveMyColleagues} from '../../ducks/reducer';
import axios from 'axios';

import '../../App.css';

class SendMessage extends Component {
  constructor() {
    super();

    this.state = {
      recipientid: 0,
      subject: 0,
      content: 0,
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.retrieveMyPatients();
    this.props.retrieveMyColleagues();
  }

  sendMessage() {
    const {recipientid, subject, content} = this.state;
    const {userid} = this.props;

    axios
      .post('/data/send-message', {
        recipientid,
        senderid: userid,
        subject,
        content,
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    const styles = {
      width: '50%',
      height: '80%',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '1%',
      minHeight: '60vh',
      fontFamily: 'Raleway',
    };

    let mappedPatients = [];

    if (this.props.myPatients && this.props.myPatients.length > 0) {
      mappedPatients = this.props.myPatients.map(patient => (
        <option value={patient.userid}>
          {patient.userid} | {patient.given_name} {patient.family_name}
        </option>
      ));
    }

    let mappedProviders = [];

    if (this.props.myColleagues && this.props.myColleagues.length > 0) {
      mappedProviders = this.props.myColleagues.map(provider => (
        <option value={provider.userid}>
          {provider.userid} | {provider.given_name} {provider.family_name}
        </option>
      ));
    }

    return (
      <div style={styles}>
        <form onSubmit={this.sendMessage}>
          <h2>Send a Message</h2>
          <hr />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Recipient:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={event => this.setState({recipientid: event.target.value})}
            >
              <option selected>Please select a recipient:</option>
              <hr />
              <option disabled>Patients:</option>
              {this.props.myPatients && this.props.myPatients.length > 0 ? mappedPatients : null}
              <hr />
              <option disabled>Providers:</option>
              {this.props.myColleagues && this.props.myColleagues.length > 0
                ? mappedProviders
                : null}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Subject:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              maxLength="80"
              required
              onChange={event => this.setState({subject: event.target.value})}
              rows="1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Message:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              required
              onChange={event => this.setState({content: event.target.value})}
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Apply
          </button>
        </form>
      </div>
    );
  }
}

export default connect(state => state, {retrieveMyPatients, retrieveMyColleagues})(SendMessage);
