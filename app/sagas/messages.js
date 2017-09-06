import {put, select} from 'redux-saga/effects';
import {api} from '../utils';
import * as actions from '../actions/messages';

export function* get(action) {
  try {
    const orderId = action.payload.id;
    yield put(actions.getStart());
    const userRole = yield select(state => state.userRole);
    const res = yield api.get(`/${userRole}/orders/${orderId}/messages`);
    const messages = res.data.messages;
    // find max date
    yield put(actions.getDone({messages, updatedAt: messages[0].created_at}));
  } catch (error) {
    console.error(error);
    yield put(actions.getFail());
  }
}

export function* create(action) {
  try {
    const {text, type, files} = action.payload;
    const formData = new FormData();
    const orderId = yield select(state => state.order.order.id);
    formData.append('message[text]', text);
    formData.append('message[message_type]', type);

    if (files && files.length) {
      files.forEach((file, index) => {
        formData.append(`message[attachments_attributes][${index}][local]`, file);
      });
    }
    yield put(actions.createStart());
    const userRole = yield select(state => state.userRole);
    const res = yield api.post(`/${userRole}/orders/${orderId}/messages`, formData);
    yield put(actions.createDone({message: res.data.message}));
  } catch (error) {
    console.error(error);
    yield put(actions.getFail());
  }
}

export function* read(action) {
  try {
    const {ids} = action.payload;
    const orderId = yield select(state => state.order.order.id);
    const userRole = yield select(state => state.userRole);
    yield put(actions.readStart());
    const res = yield api.post(`/${userRole}/orders/${orderId}/messages/view`, {message_ids: ids});
    yield put(actions.readDone({messages: res.data.messages}));
  } catch (error) {
    console.error(error);
  }
}
