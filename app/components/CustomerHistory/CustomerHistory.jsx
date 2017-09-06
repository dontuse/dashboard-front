import React, {Component} from 'react';
import Loading from 'react-loading';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router';
import moment from 'moment';
import {block} from '../../utils';
import './do-customer-history.scss';
import Pagination from '../base/Pagination/Pagination';
import {getUserOrders} from '../../actions/order';
import statuses from '../../constants/statuses';
import paymentsStatuses from '../../constants/paymentsStatuses';

const b = block('do-customer-history');


class CustomerHistory extends Component {
  componentDidMount() {
    this.props.dispatch(getUserOrders());
  }

  render() {
    const {props} = this;

    if (props.isFetching) {
      return (
        <div style={{margin: '0 auto', width: 100}}>
          <Loading height={100} width={100} type='bars' color='#5e5e5e' />
        </div>
      );
    }
    return (
      <div className={b()}>
        <div className={b('table-box')}>
          <table className={b('table')}>
            <tbody>
              {props.userOrders.map((order) => {
                const link = `/dashboard/seller/orders/${order.id}`;
                const statusMod = order.status.replace('_', '-');
                const curStatus = props.statuses.find(status => status.slug === order.status);

                return (
                  <tr key={order.id} className={b('row').is({[statusMod]: true})}>
                    <td className={b('td').is({center: true})}>
                      <Link className={b('link')} to={link}>
                        <div>{order.id}</div>
                        {order.status === 'pending' &&
                          <div className={b('status').is({[statusMod]: true})}>новый</div>
                        }
                        {order.has_planned_reminds &&
                          <div className={b('icon').is({'has-reminds': true})} />
                        }
                        {order.has_overdue_reminds &&
                          <div className={b('icon').is({'has-overdue-reminds': true})} />
                        }
                        {order.order_type === 'callback' &&
                          <div className={b('icon').is({callback: true})} />
                        }
                      </Link>
                    </td>
                    <td className={b('td').is({center: true})}>
                      <Link className={b('link')} to={link}>
                        <div>
                          {moment(order.created_at).format('L')}
                        </div>
                        <div>
                          {moment(order.created_at).format('LT')}
                        </div>
                      </Link>
                    </td>
                    <td className={b('td')}>
                      <Link className={b('link')} to={link}>
                        {!!order.items.length && order.items.map(item => (
                          <div className={b('product')}>
                            <div className={b('product-pic').is({empty: !item.image})}>
                              {item.image && <img src={item.image.src} alt='' />}
                            </div>
                            <div className={b('text')}>
                              {item.name}
                            </div>
                          </div>
                        ))}
                      </Link>
                    </td>
                    <td className={b('td')}>
                      <Link className={b('link')} to={link}>
                        <div className={b('price')}>{order.formatted_total}</div>
                      </Link>
                    </td>
                    <td className={b('td').is({center: true, [statusMod]: true})}>
                      <Link className={b('link').is({[statusMod]: true})} to={link}>
                        {curStatus && curStatus.title}
                      </Link>
                    </td>
                    <td className={b('td')}>
                      <Link className={b('link')} to={link}>
                        <div className={b('pay-status')}>
                          {props.paymentsStatuses.find(status => status.slug === order.payment_status).title}
                        </div>
                      </Link>
                    </td>
                  </tr>
                );
              })
              }
            </tbody>
          </table>
        </div>
        <div className={b('pagination-box')}>
          <Pagination
            mix={b('pagination')}
            items={props.totalPages}
            onSelect={(pageNumber) => {
              this.props.dispatch(getUserOrders({...props.location.query, page: pageNumber}));
            }}
            activePage={props.activePage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  statuses,
  paymentsStatuses,
  userOrders: state.order.userOrdersList.orders,
  isFetching: state.order.userOrdersList.isFetching,
  totalPages: state.order.userOrdersList.pagination.totalPages,
  activePage: state.order.userOrdersList.pagination.activePage,
});

export default withRouter(connect(mapStateToProps)(CustomerHistory));
