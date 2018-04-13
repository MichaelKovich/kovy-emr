import React, {Component} from 'react';
import {connect} from 'react-redux';
import {retrieveMessages} from '../ducks/reducer';

import Messages from './subcomponents/Messages';
import Loading from './subcomponents/Loading';

class Inbox extends Component {
  componentDidMount() {
    this.props.retrieveMessages();
  }

  render() {
    const styles = {
      width: '50%',
      height: '80%',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '1%',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignContent: 'center',
      fontFamily: 'Raleway',
    };

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
          date={message.date}
        />
      ));
    }

    return (
      <div style={styles} id="accordion">
        {this.props.messages && this.props.messages.length > 0 ? mappedMessages : <Loading />}
      </div>
    );
  }
}

export default connect(state => state, {retrieveMessages})(Inbox);
