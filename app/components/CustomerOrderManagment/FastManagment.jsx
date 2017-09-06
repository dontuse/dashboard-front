import React, {Component} from 'react';
import {connect} from 'react-redux';
import statuses from '../../constants/statuses';
import {block} from '../../utils';
import {changeReject} from '../../actions/order';

const b = block('do-order-managment');

class FastManagment extends Component {
  render() {
    const {props} = this;

    const events = {
      reject: props.possibleEvents.find(event => event.slug === 'reject'),
    };

    if (!events.reject) {
      return false;
    }

    return (
      <div className={b('box').is({'fast-managment': true})}>
        <div className={b('actions')}>
          {events.reject &&
            <span
              className={b('action').is({reject: true})}
              onClick={() => props.dispatch(changeReject({wantsRejected: true}))}
            >
              Отменить заказ
            </span>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  possibleEvents: state.order.order.possible_events,
  orderStatus: state.order.order.status,
  statuses,
});


export default connect(mapStateToProps)(FastManagment);
