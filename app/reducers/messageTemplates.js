import * as types from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  isLoaded: false,
  templates: [],
  appliedTemplate: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_MESSAGE_TEMPLATES_SUCCESS:
      return {...state, templates: action.payload, isFetching: false, isLoaded: true};

    case types.CREATE_MESSAGE_TEMPLATE_START:
    case types.UPDATE_MESSAGE_TEMPLATE_START:
    case types.DELETE_MESSAGE_TEMPLATE_START:
    case types.REQUEST_MESSAGE_TEMPLATES_START:
      return {...state, isFetching: true};

    case types.CREATE_MESSAGE_TEMPLATE_SUCCESS:
      return {...state, templates: state.templates.concat(action.payload), isFetching: false};

    case types.UPDATE_MESSAGE_TEMPLATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        templates: state.templates.map((template) => {
          if (template.id !== action.payload.id) {
            return template;
          }
          return action.payload;
        }),
      };

    case types.DELETE_MESSAGE_TEMPLATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        templates: state.templates.filter(template => (template.id !== action.payload)),
      };

    case types.APPLY_MESSAGE_TEMPLATE:
      return {
        ...state,
        appliedTemplate: {...action.payload.template, time: new Date()},
      };

    default:
      return state;
  }
};
