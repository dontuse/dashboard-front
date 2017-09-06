import {combineReducers} from 'redux';
import * as ordersActions from '../actions/ordersList';
import folder from '../constants/folders';
import companies from '../../mock/seller/companies';

function orders(state = [], action) {
  switch (action.type) {
    case ordersActions.ORDERS_ORDERS_REQUEST_SUCCESS:
      return action.payload.orders;

    default:
      return state;
  }
}

function lifecycle(state = {isFetching: false, isInited: false}, action) {
  switch (action.type) {
    case ordersActions.ORDERS_ORDERS_REQUEST_START:
      return {...state, isFetching: true};

    case ordersActions.ORDERS_ORDERS_REQUEST_SUCCESS:
      return {...state, isFetching: false, isInited: true};

    default:
      return state;
  }
}

function folders(state = folder, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function myСompanies(state = companies, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function filters(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function updatedAt(state = 0, action) {
  switch (action.type) {
    case ordersActions.ORDERS_ORDERS_SET_UPDATED_AT:
      return action.payload.updatedAt

    default:
      return state;
  }
}

const paginationInitState = {
  perPage: 0,
  totalPages: 0,
  totalCount: 0,
};

function pagination(state = paginationInitState, action) {
  switch (action.type) {
    case ordersActions.ORDERS_ORDERS_REQUEST_SUCCESS:
      return {...state, ...action.payload.pagination};

    default:
      return state;
  }
}

export default combineReducers({
  orders,
  folders,
  filters,
  myСompanies,
  updatedAt,
  pagination,
  lifecycle,
});
