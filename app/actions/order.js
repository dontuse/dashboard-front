// get
export const ORDERS_ORDER_GET = 'ORDERS_ORDER_GET';

export const ORDERS_ORDER_REQUEST_START = 'ORDERS_ORDER_REQUEST_START';
export const ORDERS_ORDER_REQUEST_SUCCESS = 'ORDERS_ORDER_REQUEST_SUCCESS';
export const ORDERS_ORDER_REQUEST_ERROR = 'ORDERS_ORDER_REQUEST_ERROR';

// event
export const ORDERS_ORDER_EVENT = 'ORDERS_ORDER_EVENT';

export const ORDERS_ORDER_EVENT_START = 'ORDERS_ORDER_EVENT_START';
export const ORDERS_ORDER_EVENT_SUCCESS = 'ORDERS_ORDER_EVENT_SUCCESS';
export const ORDERS_ORDER_EVENT_ERROR = 'ORDERS_ORDER_EVENT_ERROR';

// update
export const ORDERS_ORDER_UPDATE = 'ORDERS_ORDER_UPDATE';

export const ORDERS_ORDER_UPDATE_START = 'ORDERS_ORDER_UPDATE_START';
export const ORDERS_ORDER_UPDATE_SUCCESS = 'ORDERS_ORDER_UPDATE_SUCCESS';
export const ORDERS_ORDER_UPDATE_ERROR = 'ORDERS_ORDER_UPDATE_ERROR';

export const ORDERS_ORDER_GET_UPDATED_AT = 'ORDERS_ORDER_GET_UPDATED_AT';

export const ORDERS_ORDER_USER_ORDERS_GET = 'ORDERS_ORDER_USER_ORDERS_GET';
export const ORDERS_ORDER_USER_ORDERS_GET_START = 'ORDERS_ORDER_USER_ORDERS_GET_START';
export const ORDERS_ORDER_USER_ORDERS_GET_SUCCESS = 'ORDERS_ORDER_USER_ORDERS_GET_SUCCESS';
export const ORDERS_ORDER_USER_ORDERS_GET_ERROR = 'ORDERS_ORDER_USER_ORDERS_GET_ERROR';

export const ORDERS_ORDER_CHANGE_REJECT = 'ORDERS_ORDER_CHANGE_REJECT';


export const get = data => ({
  type: ORDERS_ORDER_GET,
  payload: data,
});

export const getStart = () => ({
  type: ORDERS_ORDER_REQUEST_START,
});

export const getDone = data => ({
  type: ORDERS_ORDER_REQUEST_SUCCESS,
  payload: data,
});

export const getFail = data => ({
  type: ORDERS_ORDER_REQUEST_ERROR,
  payload: data,
  error: true,
});


export const event = data => ({
  type: ORDERS_ORDER_EVENT,
  payload: data,
});

export const eventStart = data => ({
  type: ORDERS_ORDER_EVENT_START,
  payload: data,
});

export const eventDone = data => ({
  type: ORDERS_ORDER_EVENT_SUCCESS,
  payload: data,
});

export const eventFail = data => ({
  type: ORDERS_ORDER_EVENT_ERROR,
  payload: data,
});

export const update = data => ({
  type: ORDERS_ORDER_UPDATE,
  payload: data,
});

export const updateStart = data => ({
  type: ORDERS_ORDER_UPDATE_START,
  payload: data,
});

export const updateDone = data => ({
  type: ORDERS_ORDER_UPDATE_SUCCESS,
  payload: data,
});

export const updateFail = data => ({
  type: ORDERS_ORDER_UPDATE_ERROR,
  payload: data,
});

export const orderGetUpdated = data => ({
  type: ORDERS_ORDER_GET_UPDATED_AT,
  payload: data,
});


export const getUserOrders = data => ({
  type: ORDERS_ORDER_USER_ORDERS_GET,
  payload: data,
});

export const getUserOrdersStar = () => ({
  type: ORDERS_ORDER_USER_ORDERS_GET_START,
});

export const getUserOrdersDone = data => ({
  type: ORDERS_ORDER_USER_ORDERS_GET_SUCCESS,
  payload: data,
});

export const changeReject = data => ({
  type: ORDERS_ORDER_CHANGE_REJECT,
  payload: data,
});
