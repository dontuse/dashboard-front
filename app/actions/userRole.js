export const ORDERS_SET_USER_ROLE = 'ORDERS_SET_USER_ROLE';

export const setRole = data => ({
  type: ORDERS_SET_USER_ROLE,
  payload: data,
});
