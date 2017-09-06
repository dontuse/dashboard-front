import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {block} from '../../utils';
import File from '../base/File/File';
import './do-message.scss';

const b = block('do-message');

class Message extends Component {
  static propTypes = {
    text: PropTypes.string,
    senderName: PropTypes.string,
    time: PropTypes.any,
    attachments: PropTypes.array,
  };

  static defaultProps = {
    text: '',
    senderName: '',
    attachments: [],
  }

  render() {
    const {props} = this;

    return (
      <div className={b.mix(props.mix)}>
        <div className={b('photo').is({not: true})} />
        <div className={b('main')}>
          <div className={b('head')}>
            <div className={b('sender-name')}>{props.senderName}</div>
            <div className={b('time-box')}>
              <span className={b('date')}>
                {moment(props.time).format('L')}
              </span>
              <span className={b('time')}>
                {moment(props.time).format('LT')}
              </span>
            </div>
          </div>
          <div className={b('message')}>{props.text}</div>
          {!!props.attachments.length &&
            props.attachments.map(attachment => (
              <File
                mix={b('file')}
                key={attachment.id}
                type={attachment.file_content_type}
                size={attachment.file_size}
                downloadLink={attachment.file}
              >
                {attachment.origin_file_name}
              </File>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Message;
