import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-table.scss';

const b = block('do-table');

class Td extends Component {
  render() {
    const {mix, ...rest} = this.props;

    return (
      <td className={b('td').mix(mix)} {...rest}>
        {rest.children}
      </td>
    );
  }
}

export default Td;
