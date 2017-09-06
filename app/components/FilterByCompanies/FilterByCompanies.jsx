import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Checkbox from '../base/Checkbox/Checkbox';
import {get as getOrdersList} from '../../actions/ordersList';
import {block} from '../../utils';
import './do-filter-by-companies.scss';

const b = block('do-filter-by-companies');

class FilterByCompanies extends Component {
  render() {
    const query = this.props.location.query;
    const props = this.props;
    let qs = query.company_ids || [];
    qs = Array.isArray(qs) ? qs : [qs];

    return (
      <div className={b()}>
        {props.companies.map(company =>
          <div className={b('company')}>
            <Checkbox
              mix={b('checkbox')}
              checked={qs.includes(`${company.id}`)}
              onChange={(checked) => {
                const queryIds = checked ? [...qs, company.id] : qs.filter(id => id !== `${company.id}`);
                props.dispatch(getOrdersList({...query, page: 1, company_ids: queryIds}));
              }}
            />
            {company.name_rest} {company.name}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.userCompanies.companies,
});

export default withRouter(connect(mapStateToProps)(FilterByCompanies));
