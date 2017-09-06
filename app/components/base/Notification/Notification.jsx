import React, {Component, PropTypes} from 'react';
import {block} from '../../../utils';
import moment from 'moment';
import './do-notification.scss';

const b = block('do-notification');

class Notification extends Component {
  static propTypes = {
    text: PropTypes.string,
    time: PropTypes.any,
  };

  render() {
    const {props} = this;
    return (
      <div className={b.mix(props.mix)}>
        <div className={b('message')}>{props.text}</div>
        <div className={b('time-box')}>
          <span className={b('date')}>
            {moment(props.time).format('L')}
          </span>
          <span className={b('time')}>
            {moment(props.time).format('LT')}
          </span>
        </div>
      </div>
    );
  }
}

export default Notification;
