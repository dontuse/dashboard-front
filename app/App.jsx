import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import GlobalLoader from './components/GlobalLoader/GlobalLoader';
import {get as getOrdersList} from './actions/ordersList';
import './fonts.scss';
import './components/styles/index.scss';
import './components/styles/print.scss';
import './App.css';

class App extends Component {
  componentDidMount() {
    // Костыли, чтобы старое дерьмовое меню связать с реакт приложухой
    this.$legacyMenu = document.querySelector('.js-dashboard-sidebar');
    this.$legacyMenu.addEventListener('click', (e) => {
      if (e.target.matches('.js-orders-history') || e.target.matches('.main-menu-item.seller-orders')) {
        e.preventDefault();
        browserHistory.push(e.target.href);
        this.props.dispatch(getOrdersList(this.props.location.query));
      }
    });
  }

  componentWillUnmount() {
    this.$legacyMenu.removeEventListener('click');
  }

  render() {
    return (
      <div className='App'>
        {this.props.children}
        <GlobalLoader />
      </div>
    );
  }
}

export default connect()(App);
