import {put, call, select} from 'redux-saga/effects';
import {api} from '../utils';
import * as actions from '../actions/order';
import * as messagesActions from '../actions/messages';

export function* get(action) {
  try {
    const id = action.payload.id;
    yield put(actions.getStart());
    const userRole = yield select(state => state.userRole);
    const res = yield api.get(`/${userRole}/orders/${id}`);
    yield put(actions.getDone({order: res.data.order}));
  } catch (error) {
    console.error(error);
    yield put(actions.getFail());
  }
}

export function* update(action) {
  const fields = action.payload.fields;
  yield put(actions.updateStart());
  try {
    const userRole = yield select(state => state.userRole);
    const id = yield select(state => state.order.order.id);
    const res = yield api.put(`/${userRole}/orders/${id}`, {order: fields});
    yield put(actions.updateDone({order: res.data.order}));
    yield put(actions.getDone({order: res.data.order}));
  } catch (error) {
    console.error(error);
    yield put(actions.updateFail({error}));
  }
}

export function* event(action) {
  const userRole = yield select(state => state.userRole);
  const id = yield select(state => state.order.order.id);
  const slug = action.payload.event.slug;
  const data = action.payload.data;
  const isFetching = yield select(state => state.order.eventIsFetching);
  if (isFetching) {
    yield false;
  }

  yield put(actions.eventStart());
  try {
    const res = yield api.post(`/${userRole}/orders/${id}/event`, {event: slug, ...data});
    yield put(actions.eventDone({order: res.data.order}));
    yield put(actions.getDone({order: res.data.order}));
  } catch (error) {
    console.error(error);
    yield put(actions.eventFail());
  }
}

export function* watchOrder() {
  try {
    const userRole = yield select(state => state.userRole);
    const id = yield select(state => state.order.order.id);
    const attributesUpdatedAt = yield select(state => state.order.orderLifeCycle.attributesUpdatedAt);
    const messagesUpdatedAt = yield select(state => state.order.orderLifeCycle.messagesUpdatedAt);
    const res = yield call(api.get, `/${userRole}/orders/${id}/updated_at`);

    if (+new Date(res.data.attributes_updated_at) > +new Date(attributesUpdatedAt)) {
      yield put(actions.get({id}));
    }
    if (+new Date(res.data.messages_updated_at) > +new Date(messagesUpdatedAt)) {
      yield put(messagesActions.get({id}));
    }
  } catch (error) {
    console.error(error);
  }
}
