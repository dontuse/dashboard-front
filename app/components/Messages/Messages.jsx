import React, {Component} from 'react';
import {connect} from 'react-redux';
import _throttle from 'lodash/throttle';
import _map from 'lodash/map';
import Message from '../Message/Message';
import Notification from '../base/Notification/Notification';
import {block} from '../../utils';
import {read as readMessages} from '../../actions/messages';

import './do-messages.scss';

const b = block('do-messages');

class Messages extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll, false);
    this.readMessages();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll, false);
  }

  getUnreadMessages = () => this.props.messages.filter(message => !message.readed)

  readMessages = () => {
    const unreadMessagesIds = _map(this.getUnreadMessages(), 'id');

    if (this.isInViewport && unreadMessagesIds.length) {
      this.props.dispatch(readMessages({ids: unreadMessagesIds}));
    }
  }

  isInViewport = () => {
    const rect = this.node.getBoundingClientRect();
    const html = document.documentElement;

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
  }

  handleWindowScroll = _throttle(() => { this.readMessages(); }, 10000);

  render() {
    const {props} = this;

    return (
      <div ref={(node) => { this.$node = node; }} className={b()}>
        {props.messages.map(message => (
          <div key={message.id} className={b('message').is({[message.message_type]: true})}>
            {message.message_type === 'dialog' &&
            <Message
              key={message.id}
              attachments={message.attachments}
              text={message.text}
              senderName={message.sender ? message.sender.profile.name : ''}
              time={message.created_at}
            />
            }
            {message.message_type === 'notification' &&
            <Notification
              key={message.id}
              text={message.text.replace(/<|>/g, '"')}
              time={message.created_at}
            />
            }
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: (state.order.messages.messages || []).filter(message =>
    message.message_type === 'dialog' || message.message_type === 'notification'
  ),
});

export default connect(mapStateToProps)(Messages);
