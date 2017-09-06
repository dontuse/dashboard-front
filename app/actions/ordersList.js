// get
export const ORDERS_ORDERS_GET = 'ORDERS_ORDERS_GET';

export const ORDERS_ORDERS_REQUEST_START = 'ORDERS_ORDERS_REQUEST_START';
export const ORDERS_ORDERS_REQUEST_SUCCESS = 'ORDERS_ORDERS_REQUEST_SUCCESS';
export const ORDERS_ORDERS_REQUEST_ERROR = 'ORDERS_ORDERS_REQUEST_ERROR';

// updated
export const ORDERS_ORDERS_SET_UPDATED_AT = 'ORDERS_ORDERS_SET_UPDATED_AT';
export const ORDERS_ORDERS_GET_UPDATED_AT = 'ORDERS_ORDERS_GET_UPDATED_AT';

export const get = data => ({
  type: ORDERS_ORDERS_GET,
  payload: data,
});

export const getStart = () => ({
  type: ORDERS_ORDERS_REQUEST_START,
});

export const getDone = data => ({
  type: ORDERS_ORDERS_REQUEST_SUCCESS,
  payload: data,
});

export const getFail = data => ({
  type: ORDERS_ORDERS_REQUEST_ERROR,
  payload: data,
  error: true,
});

export const setUpdatedAt = data => ({
  type: ORDERS_ORDERS_SET_UPDATED_AT,
  payload: data,
});

export const orderListGetUpdated = data => ({
  type: ORDERS_ORDERS_GET_UPDATED_AT,
  payload: data,
});
