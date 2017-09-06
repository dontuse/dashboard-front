import React, {Component} from 'react';
import {connect} from 'react-redux';
import Review from '../Review/Review';
import NoReviews from '../NoReviews/NoReviews';

class SellerReview extends Component {
  render() {
    const {props} = this;

    return (
      <div>
        {props.review ?
          <Review review={props.review} /> :
          <NoReviews>
            Клиент ещё не написал отзыв о заказе, попросите его сделать это!
          </NoReviews>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  review: state.order.reviews.reviews[0],
  isFetching: state.order.reviews.isFetching,
});

export default connect(mapStateToProps)(SellerReview);
