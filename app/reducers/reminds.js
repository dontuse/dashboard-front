import * as remindsActions from '../actions/reminds';
import * as orderActions from '../actions/order';

const initialState = [];

export default function reminds(state = initialState, action) {
  switch (action.type) {
    case orderActions.ORDERS_ORDER_REQUEST_SUCCESS:
      return action.payload.order.reminds || [];

    case remindsActions.ORDERS_REMIND_CREATE_SUCCESS:
      return [action.payload.remind, ...state];

    case remindsActions.ORDERS_REMIND_UPDATE_SUCCESS:
      return state.map((remind) => {
        if (remind.id !== action.payload.remind.id) {
          return remind;
        }
        return action.payload.remind;
      });

    default:
      return state;
  }
}
