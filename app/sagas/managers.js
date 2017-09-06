import {put, select, take, all} from 'redux-saga/effects';
import {api} from '../utils';
import * as actions from '../actions/managers';
import {ORDERS_ORDER_REQUEST_SUCCESS} from '../actions/order';
import {ORDERS_USER_COMPANIES_REQUEST_SUCCESS} from '../actions/userCompanies';

export function* get() {
  try {
    yield put(actions.getStart());
    // const userRole = yield select(state => state.userRole);
    yield all([take(ORDERS_USER_COMPANIES_REQUEST_SUCCESS), take(ORDERS_ORDER_REQUEST_SUCCESS)]);
    const companies = yield select(state => state.userCompanies.companies);
    console.log('todo: check user ---', companies);
    const isOwner = true;

    if (isOwner) {
      const companyId = yield select(state => state.order.order.company.id);
      const res = yield api.get(`/companies/${companyId}/company_users`, {params: {role: 'owner'}});
      const managers = res.data.company_users;
      yield put(actions.getDone({managers}));
    } else {
      yield put(actions.getDone({managers: []}));
    }
  } catch (error) {
    console.error(error);
    yield put(actions.getFail());
  }
}
