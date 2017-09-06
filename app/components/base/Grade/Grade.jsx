import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-grade.scss';

const b = block('do-grade');

class Grade extends Component {
  render() {
    const {props} = this;

    return (
      <div className={b()}>
        {[...new Array(5)].map((val, index) =>
          <div key={index} className={b('item').is({active: props.rating > index})} />
        )}
      </div>
    );
  }
}

export default Grade;
