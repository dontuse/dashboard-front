import React, {Component} from 'react';
import {connect} from 'react-redux';
import _isEqual from 'lodash/isEqual';
import Loading from 'react-loading';
import Order from '../Order/Order';
import {get as getOrder} from '../../actions/order';
import {get as getMessages} from '../../actions/messages';
import {get as getReviews} from '../../actions/reviews';
import {get as getManagers} from '../../actions/managers';
import {get as getUserCompanies} from '../../actions/userCompanies';
import {setRole} from '../../actions/userRole';
import {block} from '../../utils';
import './do-order-card-app.scss';

const b = block('do-order-card-app');

class OrderCardApp extends Component {
  componentDidMount() {
    this.props.dispatch(setRole({role: 'seller'}));
    const orderId = this.props.params.orderId;

    window.scrollTo(0, 20);

    this.props.dispatch(getOrder({id: orderId}));
    this.props.dispatch(getUserCompanies());
    this.props.dispatch(getMessages({id: orderId}));
    this.props.dispatch(getReviews({orderId}));
    this.props.dispatch(getManagers({orderId}));
  }

  componentDidUpdate(prevProps) {
    const orderId = this.props.params.orderId;

    if (!_isEqual(orderId, prevProps.params.orderId)) {
      this.props.dispatch(getOrder({id: orderId}));
      this.props.dispatch(getMessages({id: orderId}));
      this.props.dispatch(getReviews({orderId}));
    }
  }

  render() {
    const order = this.props.order;
    const {props} = this;

    if (!order.id || !props.isLoaded) {
      return (
        <div style={{margin: '0 auto', width: 100}} className={b('loading')}>
          <Loading height={100} width={100} type='bars' color='#5e5e5e' />
        </div>
      );
    }

    return (
      <section className={b()}>
        {props.isLocked &&
          <div className={b('lock')}>
            <div style={{margin: '100px auto', width: 170}}>
              <Loading height={170} width={170} type='bars' color='#f6f5f3' />
            </div>
          </div>
        }
        <Order mix={props.isLocked && 'is-locked'} />
      </section>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {order} = state;

  return {
    isLocked: +order.order.id !== +ownProps.params.orderId,
    isLoaded: order.orderLifeCycle.isLoaded,
    order: order.order,
    statuses: state.statuses,
  };
}

export default connect(mapStateToProps)(OrderCardApp);
