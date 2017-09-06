import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-system-alert.scss';

const b = block('do-system-alert');

class SystemAlert extends Component {
  render() {
    const {props} = this;
    return (
      <div className={b.mix(props.mix)}>{props.children}</div>
    );
  }
}

export default SystemAlert;
