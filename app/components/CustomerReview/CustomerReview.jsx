import React, {Component} from 'react';
import {connect} from 'react-redux';
import Review from '../Review/Review';
import Button from '../base/Button/Button';
import {create as createRemind} from '../../actions/reviews';
import Review2 from './Review';

class CustomerReview extends Component {
  render() {
    const {props} = this;

    return (
      <div>
        <Review2 />
        {props.review ?
          <Review review={props.review} /> :
          <Button onClick={() => { props.dispatch(createRemind()); }}>Оставить отзыв</Button>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  review: state.order.reviews.reviews[0],
  isFetching: state.order.reviews.isFetching,
});

export default connect(mapStateToProps)(CustomerReview);
