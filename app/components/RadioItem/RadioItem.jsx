import React, {PropTypes} from 'react';
import {block} from '../../utils';
import Checkbox from '../base/Checkbox/Checkbox';
import './do-radio-item.scss';

const b = block('do-radio-item');

const SetItem = props =>
  <div
    onClick={props.onSelect}
    className={b.mix(props.mix)()}
  >
    <div className={b('radio-set')()}>
      <Checkbox
        mix={b('radio').mix('is-radio')()}
        checked={props.checked}
        onChange={() => {}}
      />
    </div>
    <label
      className='e-label'
      htmlFor
    >
      <div className={b('description')()}>
        {props.children}
      </div>
    </label>
  </div>;

SetItem.propTypes = {
  onSelect: PropTypes.func,
  mix: PropTypes.string,
  checked: PropTypes.bool,
  title: PropTypes.node
};

export default SetItem;
