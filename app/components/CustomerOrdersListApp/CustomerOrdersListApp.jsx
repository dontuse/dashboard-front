import React from 'react';
import {connect} from 'react-redux';
import Loading from 'react-loading';
import {get as getOrdersList} from '../../actions/ordersList';
import {setRole} from '../../actions/userRole';
import OrdersList from '../OrdersList/OrdersList';
import OrderPanel from '../OrdersPanel/OrdersPanel';
import OrdersPagination from '../OrdersPagination/OrdersPagination';
import {block} from '../../utils';


const b = block('do-orders-list-app');

class CustomerOrderListApp extends React.Component {
  componentDidMount() {
    this.props.dispatch(setRole({role: 'customer'}));
    this.props.dispatch(getOrdersList(this.props.location.query));
  }

  render() {
    const {props} = this;
    if (!props.ordersInited) {
      return (
        <div style={{margin: '0 auto', width: 100}} className={b('do-orders-list-app')}>
          <Loading height={100} width={100} type='bars' color='#5e5e5e' />
        </div>
      );
    }
    return (
      <div className={b('do-orders-list-app')}>
        <OrderPanel location={this.props.location} />
        <OrdersList location={this.props.location} />
        <OrdersPagination location={this.props.location} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ordersInited: state.ordersList.lifecycle.isInited,
});

export default connect(mapStateToProps)(CustomerOrderListApp);
