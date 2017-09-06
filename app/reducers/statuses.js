
const initialState = [];

export default function messages(state = initialState, action) {
  switch (action.type) {
    case 'RECIVE_STATUSES':
      return action.payload;
    default:
      return state;
  }
}
