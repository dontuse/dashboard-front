import React, {Component} from 'react';
import {connect} from 'react-redux';
import {block} from '../../utils';
import Messages from '../Messages/Messages';
import Tabs from '../base/Tabs/Tabs';
import Tab from '../base/Tabs/Tab';
import ProductsList from '../ProductsList/ProductsList';
import MessageForm from '../MessageForm/MessageForm';
import CustomerHistory from '../CustomerHistory/CustomerHistory';
import Notes from '../Notes/Notes';
import OrderManagment from '../OrderManagment/OrderManagment';
import UserProfile from '../UserProfile/UserProfile';
import SystemAlert from '../base/SystemAlert/SystemAlert';
import NoteForm from '../NoteForm/NoteForm';
import OrderPrint from '../OrderPrint/OrderPrint';
import {orderGetUpdated} from '../../actions/order';
// import SendOrderToEmail from '../SendOrderToEmail/SendOrderToEmail';

import './do-order.scss';

const b = block('do-order');

class Order extends Component {
  state = {
    active: 'tab-1',
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => {
      !this.props.isFetching && this.props.dispatch(orderGetUpdated());
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  changeActiveTab = (id) => {
    this.setState({
      active: id,
    });
  }

  print = () => {
    const $orderPrint = document.getElementById('OrderPrint');
    const newWin = window.open();
    newWin.document.write($orderPrint.innerHTML);
    // newWin.location.reload();
    newWin.focus();
    // newWin.print();
    // newWin.close();
  }

  render() {
    const {props} = this;
    const user = (
      <UserProfile
        phone={props.order.customer_phone}
        name={props.order.user.profile.name}
        email={props.order.user.email}
        city={props.order.region && props.order.region.name}
      />
    );

    return (
      <div className={b.mix(props.mix)}>
        <div className={b('main')}>
          <div className={b('header')}>
            <div className={b('title-box')}>
              <div className={b('title')}>Заказ №{props.order.id}</div>
              {props.order.order_type === 'tender' &&
                <div className={b('type')}>на основе заявки спроса</div>
              }
              {(props.order.order_type === 'callback') &&
                <div className={b('type')}>обратный звонок</div>
              }
              {(props.order.order_type === 'message') &&
                <div className={b('type')}>сообщение</div>
              }
              <div className={b('icon-box')}>
                {/* <SendOrderToEmail /> */}
                <div onClick={this.print} className={b('print')} />
              </div>
            </div>
            <ProductsList />
          </div>
          <Tabs
            activeId={this.state.active}
            onSelect={this.changeActiveTab}
          >
            <Tab id='tab-1' title='Диалоги'>
              <section className={b('box')}>
                {user}
              </section>
              {(props.order.order_type !== 'callback') &&
              <MessageForm />
              }
              <Messages />
            </Tab>
            <Tab id='tab-2' title='Заметки'>
              <div className={b('box')}>
                <SystemAlert>
                  Внимание! Заметки не отображаются покупателю. <br />
                  Используйте заметки, чтобы оставить комментарий к заказу его исполнителю или самому себе.
                </SystemAlert>
              </div>
              <NoteForm />
              <Notes />
            </Tab>
            <Tab id='tab-3' title='История заказов покупателя'>
              <section className={b('box')}>
                {user}
              </section>
              <CustomerHistory />
            </Tab>
            {/* <Tab id='tab-4' title='Статистика просмотров'>
              <section className={b('box')}>
                <Table>
                  {[...new Array(10)].map((v, i) =>
                    <Tr key={i}>
                      <Td>14.06.2017 01:44</Td>
                      <Td><a href=''>http://webbox.pulscen.ru/goods/70321886-dghdfgd</a></Td>
                      <Td>Телефон</Td>
                    </Tr>
                  )}
                </Table>
              </section>
            </Tab> */}
          </Tabs>
        </div>
        <div className={b('aside')}>
          <OrderManagment />
        </div>
        <OrderPrint />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  order: state.order.order,
  isFetching: state.order.orderLifeCycle.isFetching,
});

export default connect(mapStateToProps)(Order);
