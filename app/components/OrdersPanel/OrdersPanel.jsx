import React, {Component} from 'react';
import {connect} from 'react-redux';
import RcDropdown from 'rc-dropdown';
import _isEmpty from 'lodash/isEmpty';
import {Option} from 'rc-select';
import {block} from '../../utils';
import ComboSelect from '../base/ComboSelect/ComboSelect';
import FilterByCall from '../FilterByCall/FilterByCall';
import DropOutBox from '../base/DropOutBox/DropOutBox';
import {get as getOrdersList} from '../../actions/ordersList';
import Title from '../base/Title/Title';
import Link from '../base/Link/Link';

import './do-orders-panel.scss';

const b = block('do-orders-panel');

class OrderPanel extends Component {
  state = {
    visible: false,
  }

  renderFilter = () => {
    const {state, props} = this;

    return (
      <div className={b('filter-box')}>
        {true &&
          <div className={b('lnk-box')}>Найдено заказов: {props.totalCount}</div>
        }
        {true &&
          <div className={b('lnk-box')}>
            <Link
              onClick={() => { props.dispatch(getOrdersList({statuses: ['viewied', 'pending']})); }}
            >
              Необработанные заказы
            </Link>
          </div>
        }
        <div className={b('lnk-box')}>
          <RcDropdown
            visible={state.visible}
            trigger={['click']}
            overlay={<DropOutBox><Title>Показать звонки</Title><FilterByCall /></DropOutBox>}
            closeOnSelect
            onVisibleChange={(visible) => { this.setState({visible}); }}
            animation='slide-up'
          >
            <span className={b('show-calls')}>
              <Link>Показать звонки</Link>
            </span>
          </RcDropdown>
        </div>
        {props.showResetFilter &&
          <div className={b('lnk-box')}>
            <span
              onClick={() => {
                props.dispatch(getOrdersList({
                  per_page: props.location.query.per_page,
                }));
              }}
              className={b('reset')}
            >
              Сбросить фильтры и сортировки
            </span>
          </div>
        }
      </div>
    );
  }

  render() {
    const {props} = this;

    return (
      <div className={b}>
        {props.isSeller && this.renderFilter()}
        <div className={b('per-page-box')}>
          <ComboSelect
            style={{width: 60}}
            selected={50}
            value={props.location.query.per_page || 50}
            onSelect={value => props.dispatch(getOrdersList({...props.location.query, per_page: value}))}
          >
            <Option value={25} key={25}>25</Option>
            <Option value={50} key={50}>50</Option>
            <Option value={100} key={100}>100</Option>
          </ComboSelect>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const query = {...ownProps.location.query};
  delete query.per_page;

  return ({
    totalCount: state.ordersList.pagination.totalCount,
    showResetFilter: !_isEmpty(query),
    isSeller: state.userRole === 'seller',
  });
};

export default connect(mapStateToProps)(OrderPanel);
