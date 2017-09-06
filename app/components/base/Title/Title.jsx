import React, {Component, PropTypes} from 'react';
import {block} from '../../../utils';
import './do-title.scss';

const b = block('do-title');

class Title extends Component {
  static propTypes = {
    mix: PropTypes.string,
  }

  render() {
    const {props} = this;

    return (
      <div className={b.mix(props.mix)} {...props}>{props.children}</div>
    );
  }
}

export default Title;
