import React, {Component} from 'react';
import RcDropdown from 'rc-dropdown';
import {connect} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router';
import DropDownMenu from '../base/DropDownMenu/DropDownMenu';
import {block} from '../../utils';
import FilterByStatus from '../FilterByStatus/FilterByStatus';
import FilterByCompanies from '../FilterByCompanies/FilterByCompanies';
import DropOutBox from '../base/DropOutBox/DropOutBox';
import Title from '../base/Title/Title';
import statuses from '../../constants/statuses';
import paymentsStatuses from '../../constants/paymentsStatuses';
import {get as getOrdersList, orderListGetUpdated} from '../../actions/ordersList';
import './do-orders-list.scss';

moment.locale('ru');

const b = block('do-orders-list');

class OrdersList extends Component {
  state = {
    visible: false,
    companiesOpen: false,
    statusesOpen: false,
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => {
      !this.props.isFetching &&
        this.props.dispatch(orderListGetUpdated(this.props.location.query));
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const {props, state} = this;
    const isSeller = props.userRole === 'seller';

    return (
      <div className={b()}>
        <table className={b('table')}>
          <tr className={b('title-row')}>
            <th className={b('th').is({center: true})}>№ заказа</th>
            <th className={b('th').is({center: true})}>
              Дата
              <DropDownMenu
                title='Сортировать по дате'
                items={[
                  {
                    title: 'От новых к старым',
                    id: 'asc',
                  },
                  {
                    title: 'От старых к новым',
                    id: 'desc',
                  },
                ]}
                onSelect={(id) => {
                  this.props.dispatch(getOrdersList({
                    ...props.location.query,
                    page: 1,
                    'sorting[created_at]': id,
                  }));
                }}
              >
                <div
                  title={'сортировать'}
                  className={b('sorter').is({
                    'sorted-down': props.location.query['sorting[created_at]'] === 'asc',
                  })}
                />
              </DropDownMenu>
            </th>
            {isSeller && props.companies.length > 1 &&
              <th className={b('th').is({center: true})}>
                <RcDropdown
                  visible={state.companiesOpen}
                  trigger={['click']}
                  overlay={
                    <DropOutBox>
                      <Title>Показать заказ для</Title>
                      <FilterByCompanies />
                    </DropOutBox>}
                  onVisibleChange={(companiesOpen) => { this.setState({companiesOpen}); }}
                  animation='slide-up'
                >
                  <div className={b('title').is({filter: true})}>Мои Компании</div>
                </RcDropdown>
              </th>
            }
            {!isSeller && <th className={b('th')}>Компания</th>}
            <th className={b('th')}>Товар / Услуга</th>
            <th className={b('th')}>Сумма</th>
            <th className={b('th').is({center: true})}>
              {isSeller ?
                <RcDropdown
                  visible={state.statusesOpen}
                  trigger={['click']}
                  overlay={
                    <DropOutBox>
                      <Title>Статус</Title>
                      <FilterByStatus location={this.props.location} />
                    </DropOutBox>
                  }
                  onVisibleChange={(statusesOpen) => { this.setState({statusesOpen}); }}
                  animation='slide-up'
                >
                  <div className={b('title').is({filter: true})}>Статус</div>
                </RcDropdown> :
                <div className={b('title')}>Статус</div>
              }
            </th>
            {isSeller && <th className={b('th')}>Оплата</th>}
            <th className={b('th')}>Комментарии</th>
          </tr>
          {!props.orders.length &&
            <tr className={b('row')}>
              <td colSpan={50}>
                <div className={b('not-found')}>Нет ни одного заказа</div>
              </td>
            </tr>
          }
          {props.orders.map((order) => {
            const link = `/dashboard/${props.userRole}/orders/${order.id}`;
            const statusMod = order.status.replace(/_/g, '-');
            const curStatus = props.statuses.find(status => status.slug === order.status);

            return (
              <tr className={b('row').is({[statusMod]: true})}>
                <td className={b('td').is({center: true})}>
                  <Link className={b('link')} to={link}>
                    <div>{order.id}</div>
                    {order.status === 'pending' &&
                      <div className={b('status').is({[statusMod]: true})}>новый</div>
                    }
                    {order.order_type === 'callback' &&
                      <div className={b('icon').is({callback: true})} />
                    }
                    {order.order_type === 'tender' &&
                      <div className={b('icon').is({tender: true})} />
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
                {(props.companies.length > 1 || !isSeller) &&
                  <td className={b('td').is({center: true})}>
                    <Link className={b('link')} to={link}>
                      {order.company.name_rest} {order.company.name}
                    </Link>
                  </td>
                }
                <td className={b('td')}>
                  <Link className={b('link').is({product: true})} to={link}>
                    {order.items.length ?
                      <div className={b('product')}>
                        <div className={b('product-pic').is({empty: !order.items[0].image})}>
                          {order.items[0].image && <img src={order.items[0].image.styles[3].medium.url} alt='' />}
                        </div>
                        <div className={b('product-text')}>
                          {order.items[0].name}
                          {order.items.length > 1 && <div className={b('product-more')}>+ Ещё 4 товара</div>}
                        </div>
                      </div> :
                      <div className={b('dash')}>—</div>
                    }
                  </Link>
                </td>
                <td className={b('td')}>
                  <Link className={b('link').is({'total-price': true})} to={link}>
                    {order.formatted_total}
                  </Link>
                </td>
                <td className={b('td').is({center: true, [statusMod]: true})}>
                  <Link className={b('link').is({[statusMod]: true})} to={link}>
                    {curStatus && curStatus.title}
                    {order.has_planned_reminds &&
                      <div className={b('badge').is({'has-reminds': true})}>
                        Позвонить
                      </div>
                    }
                    {order.has_overdue_reminds &&
                      <div className={b('badge').is({'has-overdue-reminds': true})}>
                        Позвонить
                      </div>
                    }
                  </Link>
                </td>
                {isSeller &&
                <td className={b('td')}>
                  <Link className={b('link').is({payment: true})} to={link}>
                    {props.paymentsStatuses.find(status => status.slug === order.payment_status).title}
                  </Link>
                </td>
                }
                <td className={b('td')}>
                  <Link className={b('link')} to={link}>
                    {(order.comment && order.comment.text) &&
                      <div className={b('message').is({readed: order.comment.readed})}>
                        <div className={b('sender-name')}>
                          <b>{order.comment.sender && order.comment.sender.profile.name}</b>
                        </div>
                        <div className={b('message-text')}>{order.comment.text}</div>
                      </div>
                    }
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  orders: state.ordersList.orders,
  isFetching: state.ordersList.lifecycle.isFetching,
  statuses,
  paymentsStatuses,
  companies: state.userCompanies.companies,
  userRole: state.userRole,
});

export default connect(mapStateToProps)(OrdersList);
