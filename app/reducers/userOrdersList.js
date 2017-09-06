import * as order from '../actions/order';

const initialState = {
  orders: [],
  isFetching: false,
  pagination: {
    perPage: 20,
    totalPages: 0,
    activePage: 1,
    totalCount: 0,
  },
};

export default(state = initialState, action) => {
  switch (action.type) {
    case order.ORDERS_ORDER_USER_ORDERS_GET_START:
      return {...state, isFetching: true};

    case order.ORDERS_ORDER_USER_ORDERS_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        orders: action.payload.orders,
        pagination: action.payload.pagination,
      };

    default:
      return state;
  }
};
