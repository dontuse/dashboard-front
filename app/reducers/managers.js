import * as managersActions from '../actions/managers';

const initialState = {
  isFetching: false,
  isInited: false,
  managers: [],
};

export default function managers(state = initialState, action) {
  switch (action.type) {
    case managersActions.ORDERS_MANAGERS_REQUEST_START:
      return {...state, isFetching: true};

    case managersActions.ORDERS_MANAGERS_REQUEST_SUCCESS:
      return {...state, managers: action.payload.managers, isFetching: false, isInited: true};

    default:
      return state;
  }
}
