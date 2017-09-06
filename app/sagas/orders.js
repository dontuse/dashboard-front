import {put, call, select, all} from 'redux-saga/effects';
import {browserHistory} from 'react-router';
import {api, ctApiGet} from '../utils';
import * as ordersActions from '../actions/ordersList';

const defaultQuery = {
  details_view: true,
  per_page: 50,
  page: 1,
  folder: 'default',
  'sorting[created_at]': 'desc',
};

export function* getOrders(action) {
  try {
    const query = action.payload || {};
    const userRole = yield select(state => state.userRole);
    const queryParams = {
      'reminds[status]': [],
    };

    query['reminds[filter]'] = query['reminds[filter]'] || [];

    if (query['reminds[filter]'].includes('active')) {
      queryParams['reminds[status]'].push('active', 'deferred', 'overdue');
    }
    if (query['reminds[filter]'].includes('canceled')) {
      queryParams['reminds[status]'].push('canceled');
    }
    if (query['reminds[filter]'].includes('overdue')) {
      queryParams['reminds[status]'].push('overdue');
    }

    if (query) {
      if (query.page === defaultQuery.page) {
        delete query.page;
      }
      if (query['sorting[created_at]'] === defaultQuery['sorting[created_at]']) {
        delete query['sorting[created_at]'];
      }
      if (query.folder === defaultQuery.folder) {
        delete query.default;
      }
      if (query.per_page === defaultQuery.per_page) {
        delete query.per_page;
      }
    }

    browserHistory.replace({
      pathname: location.pathname,
      query,
    });

    const extendedQuery = {
      ...defaultQuery,
      ...query,
      ...queryParams,
    };

    yield put(ordersActions.getStart());

    const [orders, updatedAt] = yield all([
      yield call(ctApiGet, `/${userRole}/orders`, {params: extendedQuery}),
      yield call(api.get, `/${userRole}/orders/updated_at`),
    ]);

    yield put(ordersActions.getDone({
      orders: orders.data.orders,
      pagination: {
        perPage: +orders.headers['x-per-page'],
        totalPages: +orders.headers['x-total-pages'],
        activePage: +orders.headers['x-page'],
        totalCount: +orders.headers['x-total-count'],
      },
    }));
    yield put(ordersActions.setUpdatedAt({updatedAt: updatedAt.data.updated_at}));
  } catch (error) {
    console.error(error);
  }
}

export function* watchOrders(action) {
  try {
    const query = action.payload.query;
    const userRole = yield select(state => state.userRole);
    const updatedAt = yield select(state => state.ordersList.updatedAt);
    const res = yield call(api.get, `/${userRole}/orders/updated_at`);

    if (+new Date(res.data.updated_at) > +new Date(updatedAt)) {
      yield put(ordersActions.get(query));
    }
  } catch (error) {
    console.error(error);
  }
}
