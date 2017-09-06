import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-rating.scss';

const b = block('do-rating');

class Rating extends Component {
  render() {
    const {props} = this;

    return (
      <div className={b()}>
        {[...new Array(5)].map((val, index) =>
          <div key={index} className={b('star').is({active: props.rating > index})} />
        )}
      </div>
    );
  }
}

export default Rating;
