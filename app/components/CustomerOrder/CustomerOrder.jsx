import React, {Component} from 'react';
import {connect} from 'react-redux';
import {block} from '../../utils';
import Messages from '../Messages/Messages';
import Tabs from '../base/Tabs/Tabs';
import Tab from '../base/Tabs/Tab';
import ProductsList from '../ProductsList/ProductsList';
import MessageForm from '../MessageForm/MessageForm';
import CustomerOrderManagment from '../CustomerOrderManagment/CustomerOrderManagment';
import UserProfile from '../UserProfile/UserProfile';
import SystemAlert from '../base/SystemAlert/SystemAlert';
import {orderGetUpdated} from '../../actions/order';
import SendOrderToEmail from '../SendOrderToEmail/SendOrderToEmail';

import '../Order/do-order.scss';

const b = block('do-order');

class CustomerOrder extends Component {
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
              <div className={b('title')}>Заказ № {props.order.id}</div>
              {props.order.order_type === 'tender' &&
                <div className={b('type')}>на основе заявки спроса</div>
              }
              <div className={b('icon-box')}>
                <SendOrderToEmail />
                <div onClick={() => { window.print(); }} className={b('print')} />
              </div>
            </div>
            <div style={{marginBottom: 20}}>
              <SystemAlert mix='is-attention'>
                Пожалуйста, будьте внимательны при совершении сделок. Ведите переписку в личном кабинете
  и не вносите предоплату, не убедившись в надежности поставщика.
              </SystemAlert>
            </div>
            <ProductsList />
          </div>
          <Tabs
            activeId={this.state.active}
            onSelect={this.changeActiveTab}
            hideNav
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
          </Tabs>
        </div>
        <div className={b('aside')}>
          <CustomerOrderManagment />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  order: state.order.order,
  isFetching: state.order.orderLifeCycle.isFetching,
});

export default connect(mapStateToProps)(CustomerOrder);
