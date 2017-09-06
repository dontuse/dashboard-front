import React, {PropTypes} from 'react';
import RcDropdown from 'rc-dropdown';
import './e-dropdown-menu.scss';
import {block} from '../../../utils';

const b = block('e-dropdown-menu');

export default class DropDownMenu extends React.Component {
  static propTypes = {
    mix: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array,
    trigger: PropTypes.array,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    title: '',
    mix: '',
    items: [],
    trigger: ['click'],
    onSelect: () => {},
  }

  state = {
    visible: false,
  }

  close = () => { this.setState({visible: false}); }

  handleSelect = (e, id) => {
    this.props.onSelect(id, e);
    this.close();
  }

  render() {
    const props = this.props;
    const menu = (
      <div title={this.props.title} className={b.mix(props.mix)()}>
        <div>
          {props.title && <div className={b('title')}>{props.title}</div>}
          <div className={b('menu')}>
            {props.items.map((item, index) =>
              <div
                key={index}
                onClick={(e) => { this.handleSelect(e, item.id); }}
                className={b('menu-item').is({selected: item.active})}
              >
                {item.title}
              </div>
            )}
          </div>
        </div>
      </div>
    );
    return (
      <RcDropdown
        visible={this.state.visible}
        trigger={this.props.trigger}
        overlay={menu}
        onVisibleChange={(visible) => { this.setState({visible}); }}
        closeOnSelect={false}
        animation='slide-up'
      >
        {this.props.children}
      </RcDropdown>
    );
  }
}
