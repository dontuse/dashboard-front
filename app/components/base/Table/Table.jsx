import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-table.scss';

const b = block('do-table');

class Table extends Component {
  render() {
    const {mix, ...rest} = this.props;

    return (
      <div className={b.mix(mix)} {...rest}>
        <table className={b('table')}>
          {rest.children}
        </table>
      </div>
    );
  }
}

export default Table;
