import {takeLatest} from 'redux-saga/effects';
import * as orderSagas from '../sagas/order';
import * as orderActions from '../actions/order';
import * as messagesActions from '../actions/messages';
import * as messagesSagas from './messages';
import * as ordersListActions from '../actions/ordersList';
import * as ordersSagas from './orders';
import * as remindsActions from '../actions/reminds';
import * as remindsSagas from './reminds';
import * as userCompaniesSagas from './userCompanies';
import * as userCompaniesAction from '../actions/userCompanies';
import * as getUserOrdersSaga from './userOrdersList';
import * as reviewsActions from '../actions/reviews';
import * as reviewsSagas from './review';
import * as managersActions from '../actions/managers';
import * as managersSagas from './managers';

export default function* root() {
  yield takeLatest(orderActions.ORDERS_ORDER_GET, orderSagas.get);
  yield takeLatest(orderActions.ORDERS_ORDER_EVENT, orderSagas.event);
  yield takeLatest(orderActions.ORDERS_ORDER_GET_UPDATED_AT, orderSagas.watchOrder);
  yield takeLatest(orderActions.ORDERS_ORDER_UPDATE, orderSagas.update);

  yield takeLatest(messagesActions.ORDERS_MESSAGE_GET, messagesSagas.get);
  yield takeLatest(messagesActions.ORDERS_MESSAGE_CREATE, messagesSagas.create);
  yield takeLatest(messagesActions.ORDERS_MESSAGES_READ, messagesSagas.read);


  yield takeLatest(ordersListActions.ORDERS_ORDERS_GET, ordersSagas.getOrders);
  yield takeLatest(ordersListActions.ORDERS_ORDERS_GET_UPDATED_AT, ordersSagas.watchOrders);

  yield takeLatest(remindsActions.ORDERS_REMIND_CREATE, remindsSagas.create);
  yield takeLatest(remindsActions.ORDERS_REMIND_UPDATE, remindsSagas.update);

  yield takeLatest(userCompaniesAction.ORDERS_USER_COMPANIES_GET, userCompaniesSagas.get);

  yield takeLatest(orderActions.ORDERS_ORDER_USER_ORDERS_GET, getUserOrdersSaga.get);

  yield takeLatest(reviewsActions.ORDERS_REVIEW_GET, reviewsSagas.get);
  yield takeLatest(reviewsActions.ORDERS_REVIEW_CREATE, reviewsSagas.create);

  yield takeLatest(managersActions.ORDERS_MANAGERS_GET, managersSagas.get);
  // yield takeLatest('ORDERS_ORDERS_GET_UPDATED_AT', watchOrders);
}
