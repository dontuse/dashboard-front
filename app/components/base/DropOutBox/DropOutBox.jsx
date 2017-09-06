import React, {Component, PropTypes} from 'react';
import {block} from '../../../utils';
import './do-drop-out-box.scss';


const b = block('do-drop-out-box');

class DropOutBox extends Component {
  static propTypes = {
    mix: PropTypes.string,
  }

  static defaultProps = {
    mix: '',
  }
  render() {
    const {props} = this;
    return (
      <div className={b.mix(this.props.mix)}>
        {props.children}
      </div>
    );
  }
}

export default DropOutBox;
