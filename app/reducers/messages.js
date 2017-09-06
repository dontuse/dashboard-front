import * as messagesActions from '../actions/messages';

const initialState = {
  open: false,
  updatedAt: false,
  messages: [],
  comment: '',
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case messagesActions.ORDERS_MESSAGE_REQUEST_SUCCESS:
      return {...state, messages: action.payload.messages};

    case messagesActions.ORDERS_MESSAGE_CREATE_SUCCESS:
      return {...state, messages: [action.payload.message, ...state.messages]};

    case messagesActions.ORDERS_MESSAGES_READ_SUCESS:
      return {
        ...state,
        messages: state.messages.map((message) => {
          const readedMessage = action.payload.messages.find(m => m.id === message.id);

          if (readedMessage) {
            return readedMessage;
          }
          return message;
        }),
      };

    default:
      return state;
  }
}
