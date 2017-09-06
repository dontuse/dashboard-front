import React, {Component} from 'react';
import {connect} from 'react-redux';
import {block} from '../../utils';
import statuses from '../../constants/statuses';
import CustomerReview from '../CustomerReview/CustomerReview';
import {event as eventOrder} from '../../actions/order';
import RejectDialog from '../RejectDialog/RejectDialog';
import FastManagment from './FastManagment';

import '../OrderManagment/do-order-managment.scss';

const b = block('do-order-managment');

class CustomerOrderManagment extends Component {
  state = {
    changeStatusOpen: false,
    changePaymentOpen: false,
    changeManagersOpen: false,
    scheduleRemindOpen: false,
    rejectDialogOpen: false,
  }

  componentDidMount() {
    this.makeOrderViewed();
  }

  componentDidUpdate() {
    this.makeOrderViewed();
  }

  makeOrderViewed() {
    const viewEvent = this.props.order.possible_events.find(event => event.slug === 'view');
    if (viewEvent) {
      this.props.dispatch(eventOrder({event: viewEvent}));
    }
  }

  openConfirmRejectModal = () => {
    this.setState({rejectDialogOpen: true});
  }

  render() {
    const {props} = this;
    const currentStatus = props.statuses.find(status => status.slug === props.order.status);

    return (
      <div className={b()}>
        <div className={b('box')}>
          <span className={b('label')}>Статус:</span>
          <div className={b('for-customer-status').is({[currentStatus.slug.replace(/_/g, '-')]: true})}>
            {currentStatus.title}
          </div>
        </div>
        <FastManagment />
        <div className={b('box')}>
          <div className={b('box-title')}>Оставьте отзыв о поставщике:</div>
          <CustomerReview />
        </div>
        <RejectDialog />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders || [],
  order: state.order.order,
  statuses,
});

export default connect(mapStateToProps)(CustomerOrderManagment);
