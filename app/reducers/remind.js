import * as remindsActions from '../actions/reminds';

const initialState = Object.freeze({
  editRemind: false,
});


export default function remind(state = initialState, action) {
  switch (action.type) {
    case remindsActions.ORDERS_REMIND_EDIT:
      return {...state, editRemind: action.payload.id};
    default:
      return state;
  }
}
