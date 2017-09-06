import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {block} from '../../../utils';


import './do-file-upload.scss';

const b = block('do-file-upload');

class FileUpload extends Component {
  render() {
    const {props} = this;

    return (
      <div className={b()}>
        <div className={b('link')}>
          <Dropzone className={b('link')} {...props}>
            <div className={b('text')}>{props.children}</div>
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default FileUpload;
