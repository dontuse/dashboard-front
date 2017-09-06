import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../../../utils';
import './e-button.scss';

const b = block('e-button');

const Button = (props) => {
  const {mix, ...rest} = props;

  return (
    <button
      {...rest}
      type='button'
      onClick={(e) => { e.preventDefault(); rest.onClick(); }}
      className={b.mix(mix)()}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  mix: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  mix: '',
};

export default Button;
