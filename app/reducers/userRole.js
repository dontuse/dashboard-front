import * as actions from '../actions/userRole';

const initialState = 'seller';

export default(state = initialState, action) => {
  switch (action.type) {
    case actions.ORDERS_SET_USER_ROLE:
      return action.payload.role;
    default:
      return state;
  }
};
