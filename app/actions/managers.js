// get
export const ORDERS_MANAGERS_GET = 'ORDERS_MANAGERS_GET';

export const ORDERS_MANAGERS_REQUEST_START = 'ORDERS_MANAGERS_REQUEST_START';
export const ORDERS_MANAGERS_REQUEST_SUCCESS = 'ORDERS_MANAGERS_REQUEST_SUCCESS';
export const ORDERS_MANAGERS_REQUEST_ERROR = 'ORDERS_MANAGERS_REQUEST_ERROR';

export const get = data => ({
  type: ORDERS_MANAGERS_GET,
  payload: data,
});

export const getStart = data => ({
  type: ORDERS_MANAGERS_REQUEST_START,
  payload: data,
});

export const getDone = data => ({
  type: ORDERS_MANAGERS_REQUEST_SUCCESS,
  payload: data,
});

export const getFail = data => ({
  type: ORDERS_MANAGERS_REQUEST_ERROR,
  payload: data,
});
