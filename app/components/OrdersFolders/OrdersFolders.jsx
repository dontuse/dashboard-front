import React, {Component} from 'react';
import {connect} from 'react-redux';
import {block} from '../../utils';
import folders from '../../constants/folders';
import {get as getOrdersList} from '../../actions/ordersList';
import './do-orders-folders.scss';


const b = block('do-orders-folders');

class OrdersFolders extends Component {
  render() {
    const props = this.props;

    console.log('pp ====>', props.location);
    return (
      <div className={b}>
        {props.folders.map(folder => (
          <span
            key={folder.slug}
            onClick={() => props.dispatch(getOrdersList({
              folder: folder.slug,
              per_page: props.location.query.per_page,
            }))}
            className={b('folder').is({active: props.activeSlug === folder.slug})}
          >
            {folder.title}
          </span>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  folders: folders.folders.filter(folder => (folder.slug !== 'default')),
  activeSlug: ownProps.location.query.folder,
});

export default connect(mapStateToProps)(OrdersFolders);
