import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-input.scss';

const b = block('do-input');

class Input extends Component {
  render() {
    const {mix, invalid, ...rest} = this.props;

    return (
      <input {...rest} className={b.mix(mix).is({invalid})} />
    );
  }
}

export default Input;
