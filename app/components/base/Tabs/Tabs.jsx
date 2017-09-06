import React, {PropTypes} from 'react';
import {block} from '../../../utils';
import './do-tabs.scss';

const b = block('do-tabs');

class Tabs extends React.Component {
  static propsTypes = {
    containerProps: PropTypes.array,
    onSelect: PropTypes.func,
    children: React.PropTypes.element.isRequired,
    hideNav: false,
  }

  handleSelectTab(id) {
    this.props.onSelect(id);
  }

  render() {
    const {containerProps, activeId} = this.props;
    let activeTabContent = null;

    React.Children.forEach(this.props.children, (tab) => {
      if (tab.props.id === activeId) {
        activeTabContent = tab.props.children;
      }
    });
    return (
      <div className={b()} {...containerProps}>
        {!this.props.hideNav && <nav className={b('pane-box')}>
          {
            React.Children.map(this.props.children, tab =>
              <div
                className={b('pane').is({active: tab.props.id === activeId})}
                onClick={() => this.handleSelectTab(tab.props.id)}
              >
                {tab.props.title}
              </div>)
          }
        </nav>}
        <section className={b('container')}>
          <div className={b('tabs-pane')}>
            {activeTabContent}
          </div>
        </section>
      </div>
    );
  }
}

export default Tabs;
