import {put} from 'redux-saga/effects';
import {api} from '../utils';
import * as userCompaniesActions from '../actions/userCompanies';

const USER_ID = window.app.config.currentUser.id;

export function* get() {
  const userId = USER_ID;
  yield put(userCompaniesActions.getStart());
  const res = yield api.get(`/users/${userId}/companies`);
  yield put(userCompaniesActions.getDone({companies: res.data.companies}));
}
