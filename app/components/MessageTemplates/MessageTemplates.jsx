import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RcDropdown from 'rc-dropdown';
import Loading from 'react-loading';
import DropOutBox from '../base/DropOutBox/DropOutBox';
import DropDown from './DropDown';
import Dialog from '../base/Dialog/Dialog';
import * as messageTemplatesActions from '../../actions/messageTemplates';
import {handleChange, handleBlur, block} from '../../utils/';
import Button from '../base/Button/Button';
import Input from '../base/Input/Input';
import TextArea from '../base/TextArea/TextArea';
import MaxLength from '../base/MaxLength/MaxLength';
import Link from '../base/Link/Link';
import Label from '../Label/Label';
import './do-message-templates.scss';

const b = block('do-message-templates');
const modal = block('dashboard-modal');
const control = block('dashboard-control-box');

const defaultFormErrors = Object.freeze({
  templateName: false,
  templateText: false,
});

const defaultFormState = Object.freeze({
  templateText: '',
  templateName: '',
  templateId: null,
});

class MessageTemplates extends Component {
  static propTypes = {
    maxTextLength: PropTypes.number,
    maxNameLength: PropTypes.number,
    isLoaded: PropTypes.bool,
    isFetching: PropTypes.bool,
    messageTemplates: PropTypes.array,
    applyTemplate: PropTypes.func,
    fetchMessageTemplates: PropTypes.func,
    addMessageTemplate: PropTypes.func,
    updateMessageTemplate: PropTypes.func,
    deleteMessageTemplate: PropTypes.func,
  }

  static defaultProps = {
    messageTemplates: [],
    maxTextLength: 500,
    maxNameLength: 75,
  }

  state = {
    modalOpen: false,
    dropDownOpen: false,
    ...defaultFormState,
    validationErrors: defaultFormErrors,
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  isNotValidForm = () => {
    const state = this.state;
    const validationErrors = {...defaultFormErrors};
    let error = false;

    if (!state.templateName) {
      error = true;
      validationErrors.templateName = 'Поле "Введите название шаблона" не должно быть пустым.';
    }
    if (!state.templateText) {
      error = true;
      validationErrors.templateText = 'Поле "Введите текст шаблона" не должно быть пустым.';
    }

    this.setState({validationErrors});

    return error;
  }

  handleCloseModal = () => {
    this.resetForm();
  }

  handleChange = handleChange.bind(this)

  handleBlur = handleBlur.bind(this)

  handleSaveTemplate = () => {
    if (!this.isNotValidForm()) {
      this.saveTemplate();
    }
  }

  handleClickOutside = (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({dropDownOpen: false});
    }
  }

  handleCallModal = (id) => {
    const currentTemplate = this.props.messageTemplates.find(template => template.id === id);
    this.setState({
      modalOpen: true,
      templateId: id,
      templateText: currentTemplate ? currentTemplate.text : '',
      templateName: currentTemplate ? currentTemplate.name : '',
    });
  }

  handleOpenDropDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.isLoaded) {
      this.openDropDown();
    } else {
      this.props.fetchMessageTemplates().then(() => { this.openDropDown(); });
    }
  }

  openDropDown() {
    this.setState({
      dropDownOpen: true,
    });
  }

  saveTemplate = () => {
    const data = {
      name: this.state.templateName,
      text: this.state.templateText,
    };
    const id = this.state.templateId;
    if (id) {
      this.props.updateMessageTemplate({...data, id}).then(() => { this.resetForm(); });
    } else {
      this.props.addMessageTemplate(data).then(() => { this.resetForm(); });
    }
  }

  resetForm() {
    this.setState({
      ...defaultFormState,
      modalOpen: false,
      validationErrors: defaultFormErrors,
    });
  }

  insertTemplate = (template) => {
    this.setState({dropDownOpen: false});
    this.props.applyTemplate({template});
  }

  render() {
    const {props, state} = this;
    return (
      <div className={b} ref={(node) => { this.node = node; }}>
        <div className={b('head-box')}>
          <RcDropdown
            closeOnSelect={false}
            visible={state.dropDownOpen}
            trigger={['click']}
            overlay={
              <DropOutBox mix='is-message-templates'>
                {(!props.isLoaded && props.isFetching) &&
                  <div className={b('loader')}>
                    <Loading height={20} width={20} type='spin' color='#06c' />
                  </div>
                }
                <DropDown
                  messageTemplates={props.messageTemplates}
                  onAdd={this.handleCallModal}
                  onEdit={this.handleCallModal}
                  onRemove={(id) => { !props.isFetching && props.deleteMessageTemplate(id); }}
                  onSelect={this.insertTemplate}
                />
              </DropOutBox>
            }
            onVisibleChange={(dropDownOpen) => { this.setState({dropDownOpen}); }}
            animation='slide-up'
          >
            <Link onClick={this.handleOpenDropDown}>Использовать шаблон</Link>
          </RcDropdown>
        </div>

        <Dialog
          visible={state.modalOpen}
          onClose={this.handleCloseModal}
          title={state.templateId ? 'Редактирование шаблона' : 'Создание шаблона'}
          footer={
            <section>
              <Button
                mix={'rc-dialog-button is-cancel is-big-size'}
                onClick={this.handleCloseModal}
              >
                Отменить
              </Button>
              <Button
                mix={'rc-dialog-button is-big-size'}
                onClick={this.handleSaveTemplate}
                disabled={props.isFetching}
              >
                Сохранить
              </Button>
            </section>
          }
        >
          <div>
            <div className={control.is({error: state.validationErrors.templateName})}>
              <MaxLength
                charLeft={props.maxNameLength - state.templateName.length}
                mix={'is-input'}
              >
                <Input
                  mix={'is-size-mid'}
                  id='templateName'
                  placeholder='Название шаблона'
                  invalid={state.validationErrors.templateName}
                  type='text'
                  value={state.templateName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  maxLength={props.maxNameLength}
                />
              </MaxLength>
            </div>
            <div className={control.mix(state.validationErrors.templateText && 'is-error')}>
              <MaxLength charLeft={props.maxTextLength - state.templateText.length}>
                <TextArea
                  style={{height: 108}}
                  id='templateText'
                  placeholder='Текст шаблонного ответа'
                  invalid={state.validationErrors.templateText}
                  maxLength={props.maxTextLength}
                  value={state.templateText}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </MaxLength>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messageTemplates: state.order.messageTemplates.templates.sort((text1, text2) => {
    const textA = text1.name.toUpperCase();
    const textB = text2.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  }),
  isLoaded: state.order.messageTemplates.isLoaded,
  isFetching: state.order.messageTemplates.isFetching,
});

export default connect(mapStateToProps, messageTemplatesActions)(MessageTemplates);
