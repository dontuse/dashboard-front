import React, {Component} from 'react';
import {block} from '../../utils';
import './do-user-profile.scss';

const b = block('do-user-profile');

class UserProfile extends Component {
  render() {
    const {props} = this;

    return (
      <div className={b()}>
        <div className={b('property')}>
          <div
            className={b('photo').is({not: true})}
            style={{
              backgroundImage: !true ? 'url(http://panno4ka.net/uploads/posts/2016-04/1460486657_1.jpg)' : ''
            }}
          />
        </div>
        <div className={b('property')}>
          {props.name}
        </div>
        <div className={b('property')}>
          {props.city}
        </div>
        <div className={b('property').is({phone: true})}>
          {props.phone}
        </div>
        <div className={b('property')}>
          <a href='mailto:someone@example.com'>{props.email}</a>
        </div>
      </div>
    );
  }
}

export default UserProfile;
