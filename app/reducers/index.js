import {combineReducers} from 'redux';
import order from './order';
import statuses from './statuses';
import ordersList from './ordersList';
import userCompanies from './userCompanies';
import userRole from './userRole';


const rootReducer = combineReducers({
  order,
  ordersList,
  statuses,
  userCompanies,
  userRole,
});

export default rootReducer;
