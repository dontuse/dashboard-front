import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {handleChange, handleBlur, block} from '../../utils/';
import Button from '../base/Button/Button';
import {create as createMessage} from '../../actions/messages';
import './do-note-form.scss';
import TextArea from '../base/TextArea/TextArea';
import MaxLength from '../base/MaxLength/MaxLength';

const b = block('do-note-form');

const defaultFormErrors = Object.freeze({
  message: false,
});

const initState = Object.freeze({
  messageText: '',
  validationErrors: defaultFormErrors,
});


class NoteForm extends Component {
  static propTypes = {
    maxTextLength: PropTypes.number,
  }

  static defaultProps = {
    maxTextLength: 500,
  }

  static defaultProps = {
    maxTextLength: 500,
  }

  state = initState

  handleChange = handleChange.bind(this)

  handleBlur = handleBlur.bind(this)

  send = () => {
    if (!this.isNotValidForm()) {
      this.props.dispatch(createMessage({
        files: this.state.files,
        text: this.state.messageText,
        type: 'note',
      }));
      this.setState(initState);
    }
  }

  isNotValidForm = () => {
    const state = this.state;
    const validationErrors = {...defaultFormErrors};
    let error = false;

    if (!state.messageText) {
      error = true;
      validationErrors.message = 'Бла бла бла тут должен быть текст ошибки';
    }

    this.setState({validationErrors});

    return error;
  }

  render() {
    const {props, state} = this;

    return (
      <div className={b}>
        <div className={b('textarea-box')}>
          <MaxLength charLeft={props.maxTextLength - state.messageText.length}>
            <TextArea
              id='messageText'
              placeholder='Оставьте комментарий к заказу его исполнителю или самому себе'
              mix={b('textarea')}
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
            <Button onClick={this.send} mix={b('send-button')}>Оставить заметку</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(NoteForm);
