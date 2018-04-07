import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMessages} from '../ducks/reducer';

import Messages from './subcomponents/Messages';
import Loading from './subcomponents/Loading';
import './providers/styles/providers.css';

class Inbox extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.retrieveMessages();
  }

  render() {
    let mappedMessages = [];

    if (this.props.messages && this.props.messages.length > 0) {
      mappedMessages = this.props.messages.map(message => (
        <Messages
          key={message.messageid}
          keyid={message.messageid}
          recipientid={message.recipientid}
          senderid={message.senderid}
          sender={`${message.given_name} ${message.family_name}`}
          subject={message.subject}
          content={message.content}
          avatar={message.picture}
        />
      ));
    }

    return (
      <div className="medications-c2" id="accordion">
        {this.props.messages && this.props.messages.length > 0 ? mappedMessages : <Loading />}
      </div>
    );
  }
}

export default connect(state => state, {retrieveMessages})(Inbox);
