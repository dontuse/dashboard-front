import React, {Component} from 'react';

class Hint extends Component {

  render() {
    const {props} = this;
    return (
      <div>
        {props.children}
      </div>
    );
  }

}

export default Hint;
