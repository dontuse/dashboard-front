import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import DateTimeControl from '../base/DateTimeControl/DateTimeControl';
import Input from '../base/Input/Input';
import Button from '../base/Button/Button';
import {handleChange, handleBlur, block} from '../../utils/';
import {
  create as createRemind,
  update as updateRemind,
} from '../../actions/reminds';
import './do-remind-schedule.scss';


const b = block('do-remind-schedule');

const defaultFormState = Object.freeze({
  comment: '',
  dateTime: moment().add(5, 'm'),
});

class RemindSheldule extends Component {
  static defaultProps = {
    maxCommentLength: 80,
  }

  state = {...defaultFormState}

  componentDidMount() {
    if (this.props.id) {
      this.initRemindFromExist();
    }
  }

  initRemindFromExist = () => {
    this.setState({
      comment: this.props.remind.text,
      dateTime: moment(this.props.remind.on_time),
    });
  }

  handleDateTimeChange = (dateTime) => {
    this.setState({dateTime: dateTime <= moment() ? moment().add(5, 'm') : dateTime});
  }

  validDate = current => current > moment().add(-1, 'd')

  dateTimeBlur = (current) => {
    if (typeof current === 'string') {
      this.setState({dateTime: moment().add(30, 'm')});
    }
  }

  tomorrow = () => {
    this.setState({dateTime: moment().add(1, 'd')});
  }

  afterTomorrow = () => {
    this.setState({dateTime: moment().add(2, 'd')});
  }

  submit = () => {
    const {props, state} = this;
    const dateTime = state.dateTime <= moment() ? moment().add(5, 'm') : state.dateTime;

    const data = {
      type: 'CallToCustomer',
      subject_id: props.orderId,
      on_time: moment(dateTime).format('YYYY-MM-DD HH:mm:ss Z'),
      text: state.comment,
    };

    if (props.id) {
      data.id = props.id;
      data.status = 'deferred';
      props.dispatch(updateRemind({remind: data}));
      return;
    }

    props.dispatch(createRemind({remind: data}));
  }

  handleChange = handleChange.bind(this)

  handleBlur = handleBlur.bind(this)

  render() {
    const {props, state} = this;

    return (
      <div>
        <div className={b('title')}>
          {props.id ? 'Отложить звонок' : 'Запланировать новый звонок'}
        </div>
        <div className={b('label-box')}>Укажите, когда вы хотите созвониться с клиентом:</div>
        <div className={b('time-box')}>
          <div>
            <DateTimeControl
              viewMode='time'
              value={this.state.dateTime}
              onChange={this.handleDateTimeChange}
              // isValidDate={this.validDate}
              onBlur={this.dateTimeBlur}
            />
          </div>
          <div onClick={this.tomorrow} className={b('time-lnk')}>
            <span className='do-ps-link'>Завтра</span>
          </div>
          <div onClick={this.afterTomorrow} className={b('time-lnk')}>
            <span className='do-ps-link'>Послезавтра</span>
          </div>
        </div>
        <div className={b('label-box')}>Примечание:</div>
        <div className={b('note-box')}>
          <Input
            id='comment'
            type='text'
            value={state.comment}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            maxLength={props.maxCommentLength}
          />
          <div className={b('counter-helper')}>
            {props.maxCommentLength - state.comment.length}
          </div>
        </div>
        <div className={b('user-box')}>
          <span>Имя покупателя:</span>
          <b>{props.userName}</b>
        </div>
        <div className={b('user-box')}>
          <span>Контактный телефон:</span>
          <b>{props.userPhone}</b>
        </div>
        <div>
          <Button onClick={this.submit}>
            {props.id ? 'Отложить звонок' : 'Запланировать звонок'}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.order.remind.editRemind,
  remind: state.order.order.reminds.find(remind => remind.id === state.order.remind.editRemind),
  userPhone: state.order.order.customer_phone,
  userName: state.order.order.user.profile.name,
  orderId: state.order.order.id,
});

export default connect(mapStateToProps)(RemindSheldule);
