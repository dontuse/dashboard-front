import React, {Component} from 'react';
import {connect} from 'react-redux';
import {block} from '../../utils';
import './do-product-list.scss';

const b = block('do-product-list');

class ProductsList extends Component {
  render() {
    const {props} = this;

    if (!props.items.length) { return false; }
    return (
      <div className={b.mix(props.mix)}>
        <table className={b('table')}>
          <tbody>
            {props.items.map(item => (
              <tr key={item.id}>
                <td className={b('td')}>
                  <div>{item.name}</div>
                  {item.article && <div>Арт.: {item.article}</div>}
                  <div>{item.formatted_price}</div>
                </td>
                <td className={b('td')}>{item.quantity}</td>
                <td className={b('td')}>{item.formatted_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!(props.orderType === 'tender') && props.totalPrice &&
          <div className={b('total-box')}>
            <span className={b('total-text')}>Итого:</span> <b className={b('total')}>{props.totalPrice}</b>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.order.order.items,
  totalPrice: state.order.order.formatted_total,
  orderType: state.order.order.order_type,
});

export default connect(mapStateToProps)(ProductsList);
