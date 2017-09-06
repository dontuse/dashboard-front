import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import RcDropdown from 'rc-dropdown';
import DropOutBox from '../base/DropOutBox/DropOutBox';
import {block} from '../../utils';
import RemindSchedule from '../RemindSchedule/RemindSchedule';
import {editRemind, update as updateRemind} from '../../actions/reminds';
import remindStatuses from '../../constants/remindStatuses';

import './do-remind.scss';

const b = block('do-remind');

class Remind extends Component {
  state = {
    scheduleRemindOpen: false,
  }

  render() {
    const {props, state} = this;
    const statusText = remindStatuses[props.status];

    return (
      <div className={b.mix(props.mix).is({[props.status]: true})}>
        <div className={b('date-box')}>
          <span className={b('date')}>
            {moment(props.onTime).format('L')}
          </span>{' '}
          <span className={b('time')}>
            в {moment(props.onTime).format('LT')}
          </span>
        </div>
        <div className={b('text')}>
          {props.text}
        </div>
        <section>
          {(props.status !== 'overdue' && props.status !== 'active' && props.status !== 'deferred') ?
            <div className={b('status')}>{statusText}</div> :
            <div className={b('control-box')}>
              <span
                className={b('action').is({done: true})}
                title='ok'
                onClick={() => props.dispatch(updateRemind({
                  remind: {
                    id: props.id,
                    status: 'done',
                  },
                }))}
              />
              <RcDropdown
                visible={state.scheduleRemindOpen}
                trigger={['click']}
                overlay={<DropOutBox mix='is-schedule'><RemindSchedule /></DropOutBox>}
                onVisibleChange={(scheduleRemindOpen) => {
                  this.setState({scheduleRemindOpen});
                  scheduleRemindOpen ?
                    props.dispatch(editRemind({id: props.id})) :
                    props.dispatch(editRemind({id: false}));
                }}
                animation='slide-up'
              >
                <span
                  className={b('action').is({edit: true})}
                  title='редактировать'
                />
              </RcDropdown>
              <span
                className={b('action').is({cancel: true})}
                title='отменить'
                onClick={() => props.dispatch(updateRemind({
                  remind: {
                    id: props.id,
                    status: 'canceled',
                  },
                }))}
              />
            </div>
          }
        </section>
      </div>
    );
  }
}

export default connect()(Remind);
