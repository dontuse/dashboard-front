import React, {Component} from 'react';
import './do-no-reviews.scss';

class NoReviews extends Component {
  render() {
    const {props} = this;
    return (
      <div className='do-no-reviews'>
        {props.children}
      </div>
    );
  }
}

export default NoReviews;
