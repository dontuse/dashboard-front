import {put, call, select} from 'redux-saga/effects';
import {api} from '../utils';
import * as ordersActions from '../actions/order';


export function* get(action) {
  try {
    const query = action.payload;
    const userRole = yield select(state => state.userRole);
    const customerId = yield select(state => state.order.order.user.id);
    const extendedQuery = {
      ...{
        details_view: true,
        per_page: 10,
        folder: 'default',
        user_id: customerId,
      },
      ...query,
    };

    yield put(ordersActions.getUserOrdersStar());

    const res = yield call(api.get, `/${userRole}/orders`, {params: extendedQuery});

    yield put(ordersActions.getUserOrdersDone({
      orders: res.data.orders,
      pagination: {
        perPage: +res.headers['x-per-page'],
        totalPages: +res.headers['x-total-pages'],
        activePage: +res.headers['x-page'],
        totalCount: +res.headers['x-total-count'],
      },
    }));
  } catch (error) {
    console.error(error);
  }
}
