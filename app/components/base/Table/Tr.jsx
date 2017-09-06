import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-table.scss';

const b = block('do-table');

class Tr extends Component {
  render() {
    const {mix, ...rest} = this.props;

    return (
      <tr className={b('row').mix(mix)} {...rest}>
        {rest.children}
      </tr>
    );
  }
}

export default Tr;
