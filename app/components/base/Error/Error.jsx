import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-error.scss';

const b = block('do-error');

class Error extends Component {
  render() {
    const {props} = this;

    return (
      <div className={b.mix(props.mix)}>
        {props.children}
      </div>
    );
  }
}

export default Error;
