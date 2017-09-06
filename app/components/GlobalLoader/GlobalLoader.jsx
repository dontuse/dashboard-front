import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from 'react-loading';
import './do-global-loader.scss';
import {block} from '../../utils';

const b = block('do-global-loader');

class GlobalLoader extends Component {
  render() {
    const {props} = this;

    if (!props.isFetching) {
      return false;
    }

    return (
      <div className={b()}>
        <div className={b('loader')}>
          <Loading height={70} width={70} type='bars' color='#5e5e5e' />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.ordersList.lifecycle.isFetching,
});

export default connect(mapStateToProps)(GlobalLoader);
