import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductsList from './ProductsList';
import statuses from '../../constants/statuses';
import paymentsStatuses from '../../constants/paymentsStatuses';

class OrderPrint extends Component {
  render() {
    const {props} = this;
    const orderStatus = props.statuses.find(status => status.slug === props.order.status).title;

    return (
      <div style={{display: 'none', fontFamily: 'Arial'}} id='OrderPrint'>
        <div style={{fontSize: 18, marginBottom: 20}}>Заказ №{props.order.id}{' '}
          <span style={{fontSize: 13}}>{orderStatus}</span>
        </div>
        <div style={{marginBottom: 20}}>
          <ProductsList />
        </div>
        <div style={{fontSize: 18, marginBottom: 20}}>
          Покупатель
        </div>
        <table>
          <td>
            <table>
              <tr>
                <td>Имя:</td>
                <td>{props.order.user.profile.name}</td>
              </tr>
              {/* Todo: region  */}
              {props.order.region &&
              <tr>
                <td>Регион покупателя:</td>
                <td>{props.order.region}</td>
              </tr>
              }
              <tr>
                <td>Телефон:</td>
                <td>{props.order.customer_phone}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{props.order.user.email}</td>
              </tr>
            </table>
          </td>
          <td style={{paddingLeft: 50}}>
            <table>
              <tr>
                <td>Статус оплаты:</td>
                <td>{paymentsStatuses.find(ps => ps.slug === props.order.payment_status).title}</td>
              </tr>
              <tr>
                <td>Статус заказа:</td>
                <td>
                  {orderStatus}
                </td>
              </tr>
              <tr>
                <td>Дата оплаты:</td>
                <td>{props.order.payment_date || '-'}</td>
              </tr>
            </table>
          </td>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order.order,
  history: [],
  statuses,
  paymentsStatuses,
});

export default connect(mapStateToProps)(OrderPrint);
