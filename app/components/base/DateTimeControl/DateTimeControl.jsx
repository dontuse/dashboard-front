import React, {Component} from 'react';
import DateTime from 'react-datetime';
import {block} from '../../../utils';
import './do-date-time-control.scss';

const b = block('do-date-time-control');

class DateTimeControl extends Component {
  render() {
    const {props} = this;
    return (
      <div className={b}>
        <DateTime
          locale='ru'
          {...props}
        />
      </div>
    );
  }
}

export default DateTimeControl;
