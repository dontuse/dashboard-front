import React, {Component} from 'react';
import {connect} from 'react-redux';
import {block} from '../../utils';

const b = block('do-product-list');

class ProductsList extends Component {
  render() {
    const {props} = this;
    const tdStyle = {border: '1px solid black'};

    if (!props.items.length) { return false; }
    return (
      <div>
        <table style={{width: '100%', 'border-collapse': 'collapse'}}>
          <tbody>
            {props.items.map(item => (
              <tr key={item.id}>
                <td style={{...tdStyle}}>
                  <div>{item.name}</div>
                  {item.article && <div>Арт.: {item.article}</div>}
                  <div>{item.formatted_price}</div>
                </td>
                <td style={{...tdStyle}}>{item.quantity}</td>
                <td style={{...tdStyle}}>{item.formatted_price}</td>
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
