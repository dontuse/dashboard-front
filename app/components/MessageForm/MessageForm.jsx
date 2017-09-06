import React, {Component} from 'react';
import PropTypes from 'prop-types';
import accepts from 'attr-accept';
import {connect} from 'react-redux';
import {handleChange, handleBlur, block} from '../../utils/';
import Button from '../base/Button/Button';
import MessageTemplates from '../MessageTemplates/MessageTemplates';
import FileUpload from '../base/FileUpload/FileUpload';
import File from '../base/File/File';
import {create as createMessage} from '../../actions/messages';
import Error from '../base/Error/Error';
import './do-message-form.scss';
import mimeAccept from '../../constants/mimeAccept';
import TextArea from '../base/TextArea/TextArea';
import MaxLength from '../base/MaxLength/MaxLength';

const b = block('do-message-form');

const defaultFormErrors = Object.freeze({
  message: false,
});

const initState = Object.freeze({
  messageText: '',
  files: [],
  existedFiles: [],
  errors: [],
  rejectedFiles: [],
  validationErrors: defaultFormErrors,
});


class MessageForm extends Component {
  static propTypes = {
    maxTextLength: PropTypes.number,
  }

  static defaultProps = {
    maxTextLength: 500,
    maxSize: 5e+6,
    maxLenght: 3,
    accept: mimeAccept.join(),
  }

  state = initState

  componentWillReceiveProps(nextProps) {
    if (nextProps.template && this.props.template.time !== nextProps.template.time) {
      this.setState({messageText: nextProps.template.text});
    }
  }

  getTotalCount = () => this.state.existedFiles.length + this.state.files.length;

  removeImage = (index) => {
    this.setState({
      ...this.state,
      files: this.state.files.filter((image, i) => index !== i),
    });
  }

  send = () => {
    if (!this.isNotValidForm()) {
      this.props.dispatch(createMessage({
        text: this.state.messageText,
        files: this.state.files,
        type: 'dialog',
      }));
      this.setState(initState);
    }
  }

  isNotValidForm = () => {
    const state = this.state;
    const validationErrors = {...defaultFormErrors};
    let error = false;

    if (!state.messageText && !state.files.length) {
      error = true;
      validationErrors.message = 'Бла бла бла тут должен быть текст ошибки';
    }

    this.setState({validationErrors});

    return error;
  }

  handleDrop = (files, rejectedFiles) => {
    const filesCopy = [...files];

    if (this.getTotalCount() >= this.props.maxLenght) { return; }

    if (this.getTotalCount() + files.length >= this.props.maxLenght) {
      filesCopy.splice(0, (this.getTotalCount() + files.length) - this.props.maxLenght);
    }
    this.setState({
      ...this.state,
      files: [...this.state.files, ...filesCopy],
      rejectedFiles,
    });
  }

  handleChange = handleChange.bind(this)

  handleBlur = handleBlur.bind(this)

  render() {
    const {state, props} = this;

    return (
      <div className={b}>
        <div className={b('textarea-box')}>
          <MaxLength charLeft={props.maxTextLength - state.messageText.length}>
            <TextArea
              id='messageText'
              placeholder='Введите текст сообщения и отправьте его напрямую покупателю'
              invalid={state.validationErrors.message}
              maxLength={props.maxTextLength}
              value={state.messageText}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </MaxLength>
        </div>
        <div className={b('control-box')}>
          <div className={b('box-1')}>
            <FileUpload
              disableClick={this.getTotalCount() >= props.maxLenght}
              maxSize={props.maxSize}
              className={b('drop-zone').is({disabled: this.getTotalCount() >= props.maxLenght})()}
              onDrop={this.handleDrop}
              accept={props.accept}
            >
              Прикрепить файл
            </FileUpload>
          </div>
          <div className={b('upload-text')}>
            Размер файла не должен превышать 5 Мб. <br />
            Вы можете прикрепить не более 3 файлов.
          </div>
          <div className={b('box-2')}>
            {props.userRole === 'seller' && <MessageTemplates /> }
            <Button onClick={this.send} mix={b('send-button')}>Отправить</Button>
          </div>
        </div>
        <div className={b('files')}>
          {state.files.map((file, index) =>
            <div className={b('file')}>
              <File><span>{file.name} {Math.round(file.size / 1000)} Кб</span></File>
              <span
                onClick={() => { this.removeImage(index); }}
                title='Удалить'
                className={b('file-remove')}
              />
            </div>
          )}
        </div>
        {state.rejectedFiles.map(file => (
          accepts(file, props.accept) ?
            <div className={b('error')}>
              <Error>{file.name} - превышает 5 Мб</Error>
            </div> :
            <div className={b('error')}>
              <Error>{file.name} - недопустимый формат.</Error>
            </div>
        )
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  template: state.order.messageTemplates.appliedTemplate,
  userRole: state.userRole,
});

export default connect(mapStateToProps)(MessageForm);
