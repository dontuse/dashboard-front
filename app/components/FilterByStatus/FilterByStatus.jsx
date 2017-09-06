import React, {Component} from 'react';
import {connect} from 'react-redux';
import folders from '../../constants/folders';
import Checkbox from '../base/Checkbox/Checkbox';
import {block} from '../../utils';
import {get as getOrdersList} from '../../actions/ordersList';
import statuses from '../../constants/statuses';
import './do-filter-by-status.scss';

const b = block('do-filter-by-status');

class FilterByStatus extends Component {
  onChange = () => {
    getOrdersList({statuses: ['rejected']});
  }

  render() {
    const props = this.props;
    const query = this.props.location.query;
    const activeFolder = query.folder || 'default';
    const folderStatuses = props.folders.find(folder => (folder.slug === activeFolder)).statuses;
    let qs = query.statuses || [];
    qs = Array.isArray(qs) ? qs : [qs];

    return (
      <div className={b()}>
        {folderStatuses.map(status =>
          (<div key={status.slug} className={b('status').is({[status.slug.replace(/_/g, '-')]: true})}>
            <Checkbox
              onChange={(checked) => {
                const qstatuses = checked ?
                  [...qs, status.slug] :
                  qs.filter(st => st !== status.slug);

                props.dispatch(getOrdersList({
                  ...query,
                  page: 1,
                  statuses: qstatuses,
                }));
              }}
              checked={qs.includes(status.slug)}
              mix={b('checkbox')}
            />
            {status.title}
          </div>),
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  statuses,
  folders: folders.folders,
});

export default connect(mapStateToProps)(FilterByStatus);
