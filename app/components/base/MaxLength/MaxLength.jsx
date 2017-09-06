import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-max-length.scss';

const b = block('do-max-length');

class MaxLenght extends Component {
  render() {
    const {mix, charLeft, ...rest} = this.props;

    return (
      <div className={b.mix(mix)} {...rest}>
        {rest.children}
        <div className={b('counter')}>{charLeft}</div>
      </div>
    );
  }
}

export default MaxLenght;
