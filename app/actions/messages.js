export const ORDERS_MESSAGE_GET = 'ORDERS_MESSAGE_GET';
export const ORDERS_MESSAGE_REQUEST_START = 'ORDERS_MESSAGE_REQUEST_START';
export const ORDERS_MESSAGE_REQUEST_SUCCESS = 'ORDERS_MESSAGE_REQUEST_SUCCESS';
export const ORDERS_MESSAGE_REQUEST_ERROR = 'ORDERS_MESSAGE_REQUEST_ERROR';

export const ORDERS_MESSAGE_CREATE = 'ORDERS_MESSAGE_CREATE';
export const ORDERS_MESSAGE_CREATE_START = 'ORDERS_MESSAGE_CREATE_START';
export const ORDERS_MESSAGE_CREATE_SUCCESS = 'ORDERS_MESSAGE_CREATE_SUCCESS';
export const ORDERS_MESSAGE_CREATE_ERROR = 'ORDERS_MESSAGE_CREATE_ERROR';

export const ORDERS_MESSAGES_READ = 'ORDERS_MESSAGES_READ';
export const ORDERS_MESSAGES_READ_START = 'ORDERS_MESSAGES_READ_START';
export const ORDERS_MESSAGES_READ_SUCESS = 'ORDERS_MESSAGES_READ_SUCESS';
export const ORDERS_MESSAGES_READ_ERROR = 'ORDERS_MESSAGES_READ_ERROR';


export const get = data => ({
  type: ORDERS_MESSAGE_GET,
  payload: data,
});

export const getStart = data => ({
  type: ORDERS_MESSAGE_REQUEST_START,
  payload: data,
});

export const getDone = data => ({
  type: ORDERS_MESSAGE_REQUEST_SUCCESS,
  payload: data,
});

export const getFail = data => ({
  type: ORDERS_MESSAGE_REQUEST_ERROR,
  payload: data,
});

export const create = data => ({
  type: ORDERS_MESSAGE_CREATE,
  payload: data,
});

export const createStart = data => ({
  type: ORDERS_MESSAGE_CREATE_START,
  payload: data,
});

export const createDone = data => ({
  type: ORDERS_MESSAGE_CREATE_SUCCESS,
  payload: data,
});

export const createFail = data => ({
  type: ORDERS_MESSAGE_CREATE_ERROR,
  payload: data,
});


export const read = data => ({
  type: ORDERS_MESSAGES_READ,
  payload: data,
});

export const readStart = data => ({
  type: ORDERS_MESSAGES_READ_START,
  payload: data,
});

export const readDone = data => ({
  type: ORDERS_MESSAGES_READ_SUCESS,
  payload: data,
});
