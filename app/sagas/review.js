import {put, call, select} from 'redux-saga/effects';
import * as actions from '../actions/reviews';
import {api} from '../utils';


export function* get(action) {
  try {
    yield put(actions.getStart());
    const orderId = action.payload.orderId;
    const res = yield call(api.get, '/reviews', {params: {base_type: 'order', base_id: orderId}});
    yield put(actions.getDone({reviews: res.data}));
  } catch (error) {
    yield put(actions.getFail());
    console.error(error);
  }
}

export function* create(action) {
  try {
    yield put(actions.createStart());
    //const review = action.payload.review;
    const orderId = yield select(state => state.order.order.id);
    const companyId = yield select(state => state.order.order.company.id);
    const reviewSchema = {
      body: 'Спасибо за оперативную доставку',
      rating: 1,
      likes_count: 1,
      dislikes_count: 1,
      base_type: 'order',
      company_id: companyId,
      base_id: orderId,
      subject_type: 'Company',
    };
    const res = yield call(api.post, '/reviews', reviewSchema);
    yield put(actions.createDone({reviews: res.data}));
  } catch (error) {
    yield put(actions.createFail());
    console.error(error);
  }
}
