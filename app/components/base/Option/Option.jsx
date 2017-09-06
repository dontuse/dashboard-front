import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-option.scss';

const b = block('do-option');

class Table extends Component {
  render() {
    const {mix, ...rest} = this.props;

    return (
      <div className={b.mix(mix)} {...rest}>
        {rest.children}
      </div>
    );
  }
}

export default Table;
