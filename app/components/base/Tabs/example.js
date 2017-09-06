import React, {PropTypes} from 'react';
import Tabs from './index';
import Tab from './Tab';

class TabsExample extends React.Component {
  state = {
    active: 'tab-2',
  }
  changeActiveTab(id) {
    this.setState({
      active: id,
    });
  }
  render() {
    return (
      <div>
        <section style={{marginBottom: 20}}>
          <Tabs
            activeId={this.state.active}
            onSelect={::this.changeActiveTab}
            cssMix='some-test-mix'
          >
            <Tab id='tab-1' title='Дело'>
              <ComboBoxExample />
            </Tab>
            <Tab id='tab-2' title='История разработки'>
              <div>
                контент 222
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </Tab>
            <Tab id='tab-3' title='Рабочая группа'>
              <h3>Tab - 3</h3>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Tab>
            <Tab id='tab-4' title={<i><b>Список изменений</b></i>}>
              <h3>Tab - 4</h3>
              контент212312
            </Tab>
          </Tabs>
        </section>
        <section style={{marginBottom: 20}}>
          <Tabs activeId='tab-1'>
            <Tab id='tab-1' title='первый таб'>
              <div>
                <p>dfksdopfkopewkfopw</p>
                <p>dfksdopfkopewkfopw</p>
                <p>dfksdopfkopewkfopw</p>
                <p>dfksdopfkopewkfopw</p>
                <p>dfksdopfkopewkfopw</p>
              </div>
            </Tab>
          </Tabs>
        </section>
      </div>
    );
  }
}

export default TabsExample;
