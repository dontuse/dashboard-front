import React, {Component} from 'react';
import {connect} from 'react-redux';
import Message from '../Message/Message';
import {block} from '../../utils';
import './do-notes.scss';

const b = block('do-notes');

class Notes extends Component {
  render() {
    const {props} = this;

    if (!props.messages.length) {
      return false;
    }
    return (
      <div className={b()}>
        {props.messages.map(message => (
          message.message_type === 'note' &&
          <div className={b('message').is({[message.message_type]: true})}>
            <Message
              text={message.text}
              senderName={message.sender.profile.name}
              time={message.created_at}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.order.messages.messages || [],
});

export default connect(mapStateToProps)(Notes);
