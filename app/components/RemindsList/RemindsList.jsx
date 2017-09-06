import React, {Component} from 'react';
import {connect} from 'react-redux';
import _sortBy from 'lodash/sortBy';
import Remind from '../Remind/Remind';
import {block} from '../../utils';
import './do-reminds-list.scss';


const b = block('do-reminds-list');

class RemindsList extends Component {
  state = {
    doneHidden: true,
  }

  toggle = () => {
    this.setState({doneHidden: !this.state.doneHidden});
  }

  render() {
    const {props, state} = this;
    let reminds = [];
    const notDoneReminds = props.reminds.filter(remind => (
      remind.status === 'active' || remind.status === 'overdue' || remind.status === 'deferred'
    ));


    if (state.doneHidden) {
      reminds = notDoneReminds;
    } else {
      reminds = props.reminds;
    }

    const doneRemindsLength = props.reminds.length - notDoneReminds.length;

    return (
      <div className={b()}>
        <section className={b('box')}>
          {reminds.map(remind =>
            (<Remind
              mix={b('remind')}
              key={remind.id}
              id={remind.id}
              onTime={remind.on_time}
              text={remind.text}
              status={remind.status}
            />),
          )}
        </section>
        {!!doneRemindsLength &&
          <div>
            <span onClick={this.toggle} className='do-ps-link'>
              {state.doneHidden ? 'Показать' : 'Скрыть'}
              {' '} выполненные ({doneRemindsLength})
            </span>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reminds: _sortBy(state.order.reminds, o => +new Date(o.on_time)).reverse(),
});

export default connect(mapStateToProps)(RemindsList);
