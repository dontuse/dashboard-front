export const ORDERS_REVIEW_GET = 'ORDERS_REVIEW_GET';
export const ORDERS_REVIEW_REQUEST_START = 'ORDERS_REVIEW_REQUEST_START';
export const ORDERS_REVIEW_REQUEST_SUCCESS = 'ORDERS_REVIEW_REQUEST_SUCCESS';
export const ORDERS_REVIEW_REQUEST_ERROR = 'ORDERS_REVIEW_REQUEST_ERROR';

export const ORDERS_REVIEW_CREATE = 'ORDERS_REVIEW_CREATE';
export const ORDERS_REVIEW_CREATE_START = 'ORDERS_REVIEW_CREATE_START';
export const ORDERS_REVIEW_CREATE_SUCCESS = 'ORDERS_REVIEW_CREATE_SUCCESS';
export const ORDERS_REVIEW_CREATE_ERROR = 'ORDERS_REVIEW_CREATE_ERROR';

export const get = data => ({
  type: ORDERS_REVIEW_GET,
  payload: data,
});

export const getStart = data => ({
  type: ORDERS_REVIEW_REQUEST_START,
  payload: data,
});

export const getDone = data => ({
  type: ORDERS_REVIEW_REQUEST_SUCCESS,
  payload: data,
});

export const getFail = data => ({
  type: ORDERS_REVIEW_REQUEST_ERROR,
  payload: data,
});


export const create = data => ({
  type: ORDERS_REVIEW_CREATE,
  payload: data,
});

export const createStart = data => ({
  type: ORDERS_REVIEW_CREATE_START,
  payload: data,
});

export const createDone = data => ({
  type: ORDERS_REVIEW_CREATE_SUCCESS,
  payload: data,
});

export const createFail = data => ({
  type: ORDERS_REVIEW_CREATE_ERROR,
  payload: data,
});
