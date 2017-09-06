import React, {Component} from 'react';
import {connect} from 'react-redux';
import statuses from '../../constants/statuses';
import {block} from '../../utils';
import Button from '../base/Button/Button';
import {event as eventOrder, changeReject} from '../../actions/order';

const b = block('do-order-managment');

class FastManagment extends Component {
  render() {
    const {props} = this;

    const events = {
      reject: props.possibleEvents.find(event => event.slug === 'reject'),
      spam: props.possibleEvents.find(event => event.slug === 'blame'),
      complete: props.possibleEvents.find(event => event.slug === 'complete'),
      notSpam: props.possibleEvents.find(event => event.slug === 'not_spam'),
    };

    return (
      <div className={b('box').is({'fast-managment': true})}>
        <div className={b('box-title')}>Управление заказом:</div>
        <div className={b('status-box')}>
          {events.complete &&
            <Button
              onClick={() => props.dispatch(eventOrder({event: events.complete}))}
              mix='is-good'
            >
              Заказ успешно выполнен
            </Button>
          }
          {props.orderStatus === 'completed' &&
            <div className={b('final-status')}>
              Заказ успешно выполнен
            </div>
          }
          {props.orderStatus === 'spam' &&
            <div className={b('final-status').is({spam: true})}>Заказ отмечен как Спам</div>
          }
          {props.orderStatus === 'rejected' &&
            <div className={b('final-status').is({rejected: true})}>Заказ отменен</div>
          }
        </div>
        <div className={b('actions')}>
          {events.reject &&
            <span
              className={b('action').is({reject: true})}
              onClick={() => props.dispatch(changeReject({wantsRejected: true}))}
            >
              Отменить заказ
            </span>
          }
          {events.spam &&
            <span
              onClick={() => props.dispatch(eventOrder({event: events.spam}))}
              className={b('action')}
            >
               Спам
            </span>
          }
          {events.notSpam &&
            <span
              onClick={() => props.dispatch(eventOrder({event: events.notSpam}))}
              className={b('action')}
            >
               Не спам
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
