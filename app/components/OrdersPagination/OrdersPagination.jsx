import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pagination from '../base/Pagination/Pagination';
import {block} from '../../utils';
import {get as getOrdersList} from '../../actions/ordersList';
import Link from '../base/Link/Link';
import './do-orders-pagination.scss';

const b = block('do-orders-pagination');

class OrdersPagination extends Component {
  render() {
    const {props} = this;
    const page = +props.location.query.page || 1;
    const perPage = props.location.query.per_page || 50;

    return (
      <div className={b()}>
        <div className={b('show-more')}>
          {(page === 1 && perPage < props.maxPerPage && props.totalPages > 1) &&
            <Link
              onClick={() => {
                props.dispatch(getOrdersList({...props.location.query, per_page: 100}));
              }}
            >
              Показать ещё
            </Link>}
        </div>
        <Pagination
          mix={b('pagination')}
          items={props.totalPages}
          onSelect={(pageNumber) => {
            props.dispatch(getOrdersList({...props.location.query, page: pageNumber}));
          }}
          activePage={props.activePage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalPages: state.ordersList.pagination.totalPages,
  activePage: state.ordersList.pagination.activePage,
  maxPerPage: 100,
});

export default connect(mapStateToProps)(OrdersPagination);
