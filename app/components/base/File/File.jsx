import React, {Component} from 'react';
import {block} from '../../../utils';
import './do-file.scss';

const b = block('do-file');

class File extends Component {
  render() {
    const {props} = this;

    const file = (
      <div className={b.mix(props.mix)}>
        <div className={b('icon')}>
          <div className={b('type')}>
            <span className={b('triangle')} />
          </div>
        </div>
        {props.children}
      </div>
    );

    return (
      props.downloadLink ?
        <a download href={props.downloadLink}>
          {file}
        </a> :
        <span>{file}</span>
    );
  }
}

export default File;
