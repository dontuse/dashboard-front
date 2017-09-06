import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Checkbox from '../base/Checkbox/Checkbox';
import {block} from '../../utils';
import {get as getOrdersList} from '../../actions/ordersList';
import './do-filter-by-call.scss';

const b = block('do-filter-by-call');

class FilterByCall extends Component {
  render() {
    const query = this.props.location.query;
    const props = this.props;
    let qs = query['reminds[filter]'] || [];
    qs = Array.isArray(qs) ? qs : [qs];

    console.log(query);

    return (
      <div className={b()}>
        {props.types.map(type =>
          <div className={b('type').is({[type.slug.replace(/_/g, '-')]: true})}>
            <Checkbox
              mix={b('checkbox')}
              checked={qs.includes(`${type.slug}`)}
              onChange={(checked) => {
                const querySlugs = checked ? [...qs, type.slug] : qs.filter(slug => slug !== type.slug);
                props.dispatch(getOrdersList({...query, page: 1, 'reminds[filter]': querySlugs}));
              }}
            />
            {type.title}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  types: [
    {
      title: 'Запланированные',
      slug: 'active',
      status: ['active', 'deferred', 'overdue'],
    },
    {
      title: 'Отмененные',
      slug: 'canceled',
      status: ['canceled'],
    },
    {
      title: 'Просроченные',
      slug: 'overdue',
      status: ['overdue'],
    },
  ],
});

export default withRouter(connect(mapStateToProps)(FilterByCall));
