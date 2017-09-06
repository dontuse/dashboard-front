import {combineReducers} from 'redux';
import * as types from '../constants/ActionTypes';
import * as orderTypes from '../actions/order';
import messages from './messages';
import reminds from './reminds';
import remind from './remind';
import messageTemplates from './messageTemplates';
import userOrdersList from './userOrdersList';
import reviews from './reviews';
import managers from './managers';

const initialState = Object.freeze({
  order: {},
  isFetching: true,
  eventIsFetching: true,
});

function order(state = initialState.order, action) {
  switch (action.type) {
    case orderTypes.ORDERS_ORDER_REQUEST_SUCCESS:
    case types.RECEIVE_ORDER:
      return action.payload.order;
    default:
      return state;
  }
}

function orderLifeCycle(state = {
  isFetching: false,
  isLoaded: false,
  wantsRejected: false,
  attributesUpdatedAt: 0,
  messagesUpdatedAt: 0,
}, action) {
  switch (action.type) {
    case types.REQUEST_ORDER:
    case orderTypes.ORDERS_ORDER_REQUEST_START:
      return {...state, isFetching: true};

    case types.RECEIVE_ORDER:
    case orderTypes.ORDERS_ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isFetching: false,
        attributesUpdatedAt: action.payload.order.attributes_updated_at,
        messagesUpdatedAt: action.payload.order.messages_updated_at,
      };

    case orderTypes.ORDERS_ORDER_CHANGE_REJECT:
      return {
        ...state,
        wantsRejected: action.payload.wantsRejected,
      };

    default:
      return state;
  }
}

const initialStateUserOrders = {
  page: 1,
  orders: [],
};

function userOrders(state = initialStateUserOrders, action) {
  switch (action.type) {
    case types.RECEIVE_USER_ORDERS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

function eventIsFetching(state = false, action) {
  switch (action.type) {
    case 'ORDERS_ORDER_EVENT_START':
      return true;
    case 'ORDERS_ORDER_EVENT_SUCCESS':
    case 'ORDERS_ORDER_EVENT_ERROR':
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  order,
  userOrders,
  messages,
  reminds,
  orderLifeCycle,
  messageTemplates,
  eventIsFetching,
  remind,
  userOrdersList,
  reviews,
  managers,
});
