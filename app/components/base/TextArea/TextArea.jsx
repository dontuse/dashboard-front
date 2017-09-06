import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-text-area.scss';

const b = block('do-text-area');

class TextArea extends Component {
  render() {
    const {mix, invalid, ...rest} = this.props;

    return (
      <textarea className={b.mix(mix).is({invalid})} {...rest} />
    );
  }
}

export default TextArea;
