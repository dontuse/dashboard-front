const initialState = {
  editRemind: false,
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_EDIT_REMIND_MODAL':
      return {...state, ...action.payload};

    case 'CLOSE_EDIT_REMIND_MODAL':
      return {...state, ...action.payload.editRemind};

    default:
      return state;
  }
}
