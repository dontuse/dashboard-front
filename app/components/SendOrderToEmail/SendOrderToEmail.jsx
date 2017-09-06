import React, {Component} from 'react';
import RcDropdown from 'rc-dropdown';
import {block} from '../../utils';
import DropOutBox from '../base/DropOutBox/DropOutBox';
import Title from '../base/Title/Title';
import Label from '../Label/Label';
import Input from '../base/Input/Input';
import Button from '../base/Button/Button';
import './do-send-order-to-email.scss';

const b = block('do-send-order-to-email');

class SendOrderToEmail extends Component {
  state = {
    open: false,
  }
  render() {
    const {state} = this;

    return (
      <RcDropdown
        visible={state.open}
        trigger={['click']}
        overlay={
          <DropOutBox>
            <Title>Переслать заказ на Email</Title>
            <Label mix={b('label')}>
              Введите Email и мы вышлем на него сообщение с информацией по заказу:
            </Label>
            <div className={b('control-box')}>
              <div className={b('input')}><Input placeholder='Введите Email' /></div>
              <div className={b('button')}><Button>Отправить</Button></div>
            </div>
          </DropOutBox>
        }
        onVisibleChange={(open) => {
          this.setState({open});
        }}
        animation='slide-up'
      >
        <div className={b('send-email')} />
      </RcDropdown>
    );
  }
}

export default SendOrderToEmail;
