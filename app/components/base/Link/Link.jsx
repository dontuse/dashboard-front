import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-link.scss';

const b = block('do-link');

class Link extends Component {
  render() {
    const {mix, children, ...rest} = this.props;

    return (
      <span {...rest} className={b.mix(mix)}>
        {children}
      </span>
    );
  }
}

export default Link;
