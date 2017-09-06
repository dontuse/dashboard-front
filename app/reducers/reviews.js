import * as reviewsActions from '../actions/reviews';

const initialState = {
  isFetching: false,
  reviews: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case reviewsActions.ORDERS_REVIEW_REQUEST_START:
      return {...state, isFetching: true};

    case reviewsActions.ORDERS_REVIEW_REQUEST_SUCCESS:
      return {...state, isFetching: false, reviews: action.payload.reviews};
    default:
      return state;
  }
};
