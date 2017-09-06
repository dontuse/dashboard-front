import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, NoMatch, browserHistory} from 'react-router';
import 'moment/locale/ru';
import configureStore from './store/configureStore';
import App from './App';
import OrdersListApp from './components/OrdersListApp/OrdersListApp';
import OrderCardApp from './components/OrderCardApp/OrderCardApp';
import CustomerOrdersListApp from './components/CustomerOrdersListApp/CustomerOrdersListApp';
import CustomerOrderCardApp from './components/CustomerOrderCardApp/CustomerOrderCardApp';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route name='Главная' path='/dashboard' component={App}>
        <IndexRoute component={OrdersListApp} />
        <Route path='seller/orders' component={OrdersListApp} />
        <Route path='seller/orders/:orderId' component={OrderCardApp} />
        <Route path='customer/orders' component={CustomerOrdersListApp} />
        <Route path='customer/orders/:orderId' component={CustomerOrderCardApp} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
