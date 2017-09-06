import {put} from 'redux-saga/effects';
import {api} from '../utils';
import * as remindsActions from '../actions/reminds';

export function* create(action) {
  try {
    const remind = action.payload.remind;
    const res = yield api.post('/reminds', {remind});
    yield put(remindsActions.createDone(res.data));
  } catch (error) {
    console.error(error);
  }
}

export function* update(action) {
  try {
    const remind = action.payload.remind;
    const res = yield api.put(`/reminds/${remind.id}`, {remind});
    yield put(remindsActions.updateDone(res.data));
  } catch (error) {
    console.error(error);
  }
}
