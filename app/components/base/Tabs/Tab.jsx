import React from 'react';

class Tab extends React.Component {
  render() {
    return (
      <div>
        Заголовок: {this.props.children}
      </div>
    );
  }
}

export default Tab;
