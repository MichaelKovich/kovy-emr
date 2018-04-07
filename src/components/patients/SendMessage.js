import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMyProviders} from '../../ducks/reducer';
import axios from 'axios';

import './styles/patients.css';

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
    this.props.retrieveMyProviders();
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
    let mappedProviders = [];

    if (this.props.myProviders && this.props.myProviders.length > 0) {
      mappedProviders = this.props.myProviders.map(provider => (
        <option value={provider.userid}>
          {provider.userid} | {provider.given_name} {provider.family_name}
        </option>
      ));
    }

    return (
      <div className="medications-c2">
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
              <option selected>Please select a recipient.</option>
              {this.props.myProviders && this.props.myProviders.length > 0 ? mappedProviders : null}
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

export default connect(state => state, {retrieveMyProviders})(SendMessage);
