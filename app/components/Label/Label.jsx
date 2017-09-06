import React, {Component} from 'react';
import {block} from '../../utils';
import './do-label.scss';

const b = block('do-label');

class Label extends Component {
  render() {
    const {mix, ...rest} = this.props;

    return (
      <div className={b.mix(mix)}>
        <label className={b('label')} {...rest}>{rest.children}</label>
      </div>
    );
  }
}

export default Label;
