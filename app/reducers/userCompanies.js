import * as userCompanies from '../actions/userCompanies';

const initialState = {
  isFetching: false,
  companies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userCompanies.ORDERS_USER_COMPANIES_REQUEST_START:
      return {...state, isFetching: true};

    case userCompanies.ORDERS_USER_COMPANIES_REQUEST_SUCCESS:
      return {...state, companies: action.payload.companies, isFetching: false};

    case userCompanies.ORDERS_USER_COMPANIES_REQUEST_ERROR:
      return {...state, isFetching: false};

    default:
      return state;
  }
};
