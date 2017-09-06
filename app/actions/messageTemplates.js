import * as types from '../constants/ActionTypes';
import {api} from '../utils';


const receiveTemplatesMessage = json => ({
  type: types.REQUEST_MESSAGE_TEMPLATES_SUCCESS,
  payload: json,
});

export const fetchMessageTemplates = (userRole = 'seller') =>
  (dispatch) => {
    dispatch({type: types.REQUEST_MESSAGE_TEMPLATES_START});
    return api.get(`${userRole}/orders/message_templates`).then(res => dispatch(receiveTemplatesMessage(res.data)));
  };

export const addMessageTemplate = (message, userRole = 'seller') =>
  (dispatch) => {
    dispatch({type: types.CREATE_MESSAGE_TEMPLATE_START});
    return api.post(`${userRole}/orders/message_templates`, {template: message})
      .then(res => dispatch({type: types.CREATE_MESSAGE_TEMPLATE_SUCCESS, payload: res.data}));
  };

export const updateMessageTemplate = (message, userRole = 'seller') =>
  (dispatch) => {
    dispatch({type: types.UPDATE_MESSAGE_TEMPLATE_START});
    return api.put(`${userRole}/orders/message_templates/${message.id}`, {template: message})
      .then(() => dispatch({type: types.UPDATE_MESSAGE_TEMPLATE_SUCCESS, payload: message}));
  };

export const deleteMessageTemplate = (templateId, userRole = 'seller') =>
  (dispatch) => {
    dispatch({type: types.DELETE_MESSAGE_TEMPLATE_START});
    return api.delete(`${userRole}/orders/message_templates/${templateId}`)
      .then(() => dispatch({type: types.DELETE_MESSAGE_TEMPLATE_SUCCESS, payload: templateId}));
  };

export const applyTemplate = data =>
  (dispatch) => {
    dispatch({type: types.APPLY_MESSAGE_TEMPLATE, payload: data});
  };
