export const ORDERS_REMIND_CREATE = 'ORDERS_REMIND_CREATE';
export const ORDERS_REMIND_CREATE_START = 'ORDERS_REMIND_CREATE_START';
export const ORDERS_REMIND_CREATE_SUCCESS = 'ORDERS_REMIND_CREATE_SUCCESS';
export const ORDERS_REMIND_CREATE_ERROR = 'ORDERS_REMIND_CREATE_ERROR';

export const ORDERS_REMIND_UPDATE = 'ORDERS_REMIND_UPDATE';
export const ORDERS_REMIND_UPDATE_SUCCESS = 'ORDERS_REMIND_UPDATE_SUCCESS';

export const ORDERS_REMIND_EDIT = 'ORDERS_REMIND_EDIT';

export const ORDERS_REMIND_GET_SUCCESS = 'ORDERS_REMIND_GET_SUCCESS';

export const create = data => ({
  type: ORDERS_REMIND_CREATE,
  payload: data,
});

export const createDone = data => ({
  type: ORDERS_REMIND_CREATE_SUCCESS,
  payload: data,
});

export const update = data => ({
  type: ORDERS_REMIND_UPDATE,
  payload: data,
});

export const updateDone = data => ({
  type: ORDERS_REMIND_UPDATE_SUCCESS,
  payload: data,
});

export const editRemind = data => ({
  type: ORDERS_REMIND_EDIT,
  payload: data,
});

export const getDone = data => ({
  type: ORDERS_REMIND_GET_SUCCESS,
  payload: data,
});
