import React, {Component} from 'react';
import {block} from '../../utils';
import './do-doer.scss';

const b = block('do-doer');

class Doer extends Component {
  render() {
    const {props} = this;

    return (
      <div className={b}>
        <span className={b('photo').is({not: true})} />
        <span className={b('name')}>{props.name}</span>
      </div>
    );
  }
}

export default Doer;
