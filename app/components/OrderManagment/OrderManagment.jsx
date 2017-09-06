import React, {Component} from 'react';
import RcDropdown from 'rc-dropdown';
import {connect} from 'react-redux';
import {block} from '../../utils';
import statuses from '../../constants/statuses';
import companies from '../../../mock/seller/companies';
import paymentsStatuses from '../../constants/paymentsStatuses';
import DropOutBox from '../base/DropOutBox/DropOutBox';
import Title from '../base/Title/Title';
import Option from '../base/Option/Option';
import RemindsList from '../RemindsList/RemindsList';
import Doer from '../Doer/Doer';
import RemindSchedule from '../RemindSchedule/RemindSchedule';
import SellerReview from '../SellerReview/SellerReview';
import {update as updateOrder, event as eventOrder, changeReject} from '../../actions/order';
import {editRemind} from '../../actions/reminds';
import RejectDialog from '../RejectDialog/RejectDialog';
import FastManagment from './FastManagment';
import './do-order-managment.scss';

const b = block('do-order-managment');

class OrderManagment extends Component {
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
    const {state, props} = this;

    return (
      <div className={b()}>
        <div className={b('box')}>
          <span className={b('label')}>Статус:</span>
          <RcDropdown
            visible={state.changeStatusOpen}
            trigger={['click']}
            overlay={
              <DropOutBox>
                <Title>Изменить статус заказа</Title>
                {props.order.possible_events.map(event =>
                  (<Option
                    key={event.status.slug}
                    onClick={
                      () => {
                        this.setState({changeStatusOpen: false});
                        if (event.slug === 'reject') {
                          this.props.dispatch(changeReject({wantsRejected: true}));
                          return;
                        }
                        props.dispatch(eventOrder({event}));
                      }}
                  >
                    <div className={b('status').mix(`is-${event.status.slug.replace('_', '-')}`)}>
                      {event.status.title}
                    </div>
                  </Option>)
                )}
              </DropOutBox>
            }
            onVisibleChange={(changeStatusOpen) => { this.setState({changeStatusOpen}); }}
            animation='slide-up'
          >
            <div className={b('select')}>
              <div className={b('selected')}>
                {props.statuses.find(status => status.slug === props.order.status).title}
              </div>
            </div>
          </RcDropdown>
        </div>
        <div className={b('box')}>
          <span className={b('label')}>Оплата:</span>
          <RcDropdown
            visible={state.changePaymentOpen}
            trigger={['click']}
            overlay={
              <DropOutBox>
                <Title>Изменить статус оплаты</Title>
                <div>
                  {paymentsStatuses.map(payment => (
                    payment.slug !== props.order.payment_status &&
                    <Option
                      onClick={() => {
                        this.props.dispatch(updateOrder({fields: {payment_status: payment.slug}}));
                        this.setState({changePaymentOpen: false});
                      }}
                      key={payment.slug}
                    >{payment.title}
                    </Option>
                  ),
                  )}
                </div>
              </DropOutBox>
            }
            onVisibleChange={(changePaymentOpen) => { this.setState({changePaymentOpen}); }}
            animation='slide-up'
          >
            <div className={b('select')}>
              <div className={b('selected')}>
                {paymentsStatuses.find(ps => ps.slug === props.order.payment_status).title}
              </div>
            </div>
          </RcDropdown>
        </div>
        <div className={b('box')}>
          <span className={b('label')}>Звонки:</span>
          {props.canSchedule &&
            <RcDropdown
              visible={state.scheduleRemindOpen}
              trigger={['click']}
              overlay={<DropOutBox mix='is-schedule'><RemindSchedule /></DropOutBox>}
              onVisibleChange={(scheduleRemindOpen) => {
                this.setState({scheduleRemindOpen});
                props.dispatch(editRemind({id: false}));
              }}
              animation='slide-up'
            >
              <div className={b('selected')}>Запланировать</div>
            </RcDropdown>
          }
          <RemindsList />

        </div>
        {true &&
          <div className={b('box')}>
            <span className={b('label')}>Исполнитель:</span>
            <RcDropdown
              visible={state.changeManagersOpen}
              trigger={['click']}
              overlay={
                <DropOutBox>
                  <Title>Выбрать исполнителя для заказа</Title>
                  {props.managers.map(manager =>
                    <Option
                      key={manager.id}
                      onClick={() => {
                        this.props.dispatch(updateOrder({fields: {manager_id: manager.user.id}}));
                        this.setState({changeManagersOpen: false});
                      }}
                    >
                      <Doer name={manager.user.profile.name} photo={false} />
                    </Option>
                  )}
                </DropOutBox>
              }
              onVisibleChange={(changeManagersOpen) => { this.setState({changeManagersOpen}); }}
              animation='slide-up'
            >
              <div className={b('select')}>
                <div className={b('selected')}>Изменить</div>
              </div>
            </RcDropdown>
            <div style={{margin: '20px 0 0 0'}}>
              <Doer
                id={props.order.manager.id}
                photo={'http://panno4ka.net/uploads/posts/2016-04/1460486657_1.jpg'}
                name={props.order.manager.profile.name}
              />
            </div>
          </div>
        }
        <FastManagment />
        <div className={b('box')}>
          <div className={b('box-title')}>Отзыв покупателя:</div>
          <SellerReview />
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
  paymentsStatuses,
  companies,
  canSchedule: !state.order.reminds.find(remind =>
    remind.status === 'active' || remind.status === 'overdue' || remind.status === 'deferred',
  ),
  managers: state.order.managers.managers,
});

export default connect(mapStateToProps)(OrderManagment);
