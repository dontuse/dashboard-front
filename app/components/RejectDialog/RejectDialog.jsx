import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dialog from '../base/Dialog/Dialog';
import {handleChange, handleBlur, block} from '../../utils/';
import Button from '../base/Button/Button';
import TextArea from '../base/TextArea/TextArea';
import MaxLength from '../base/MaxLength/MaxLength';
import {changeReject, event} from '../../actions/order';
import RadioItem from '../RadioItem/RadioItem';
import './do-reject-dialog.scss';

const defaultFormErrors = Object.freeze({text: false});

const defaultFormState = Object.freeze({
  text: '',
  validationErrors: defaultFormErrors,
  activeTemplateId: null,
  self: true,
});

const b = block('do-reject-dialog');

class RejectDialog extends Component {
  static defaultProps = {
    messageTemplates: [],
    maxTextLength: 500,
  }

  state = {
    ...defaultFormState,
  }

  handleChange = handleChange.bind(this)

  handleBlur = handleBlur.bind(this)

  handleClose = () => {
    this.props.dispatch(changeReject({wantsRejected: false}));
  }

  selectTemplate = (template) => {
    this.setState({text: template.text, self: false});
  }

  isNotValidForm = () => {
    const state = this.state;
    const validationErrors = {...defaultFormErrors};
    let error = false;

    if (!state.text) {
      error = true;
      validationErrors.text = 'Бла бла бла тут должен быть текст ошибки';
    }

    this.setState({validationErrors});

    return error;
  }

  handleSend = () => {
    const state = this.state;

    if (!this.isNotValidForm()) {
      this.props.dispatch(changeReject({wantsRejected: false}));
      this.props.dispatch(event({event: {slug: 'reject'}, data: {comment: state.text}}));
    }
  }

  render() {
    const {props, state} = this;

    return (
      <div>
        <Dialog
          visible={props.show}
          onClose={this.handleClose}
          title={<div>Отмена заказа</div>}
          footer={
            <div>
              <Button
                onClick={this.handleClose}
                mix='rc-dialog-button is-cancel is-big-size'
              >
                Не отменять
              </Button>
              <Button
                mix='rc-dialog-button is-big-size'
                onClick={this.handleSend}
              >
                Подвердить отмену
              </Button>
            </div>
          }
        >
          <section className={b('fast-answer-box')}>
            <div className={b('answer-title')}>Вы можете воспользоваться шаблоном быстрого ответа:</div>
            {props.messageTemplates.map((template, index) =>
              <RadioItem
                key={index}
                onSelect={() => {
                  this.selectTemplate(template);
                }}
                title={'title'}
                checked={template.text === this.state.text}
              >
                {template.text}
              </RadioItem>
            )}
            <RadioItem
              onSelect={() => {
                this.setState({self: true, text: ''});
              }}
              title={'title'}
              checked={state.self}
            >
              Свой вариант
            </RadioItem>
          </section>
          {state.self &&
            <MaxLength charLeft={props.maxTextLength - state.text.length}>
              <TextArea
                id='text'
                invalid={state.validationErrors.text}
                placeholder='Причина отмены заказа'
                maxLength={props.maxTextLength}
                value={state.text}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </MaxLength>
          }
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.order.orderLifeCycle.wantsRejected,
  messageTemplates: [
    {text: 'На данный момент товара нет в наличии, приносим свои извинения.'},
    {text: 'К сожалению, наша компания не осуществляет доставку в указанный регион'},
    {text: 'К сожалению, данный товар снят с производства. Приносим свои извинения.'},
    {text: 'Извините, мы продаем только оптом.'},
  ],
});

export default connect(mapStateToProps)(RejectDialog);
