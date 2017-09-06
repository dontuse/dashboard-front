import React, {Component} from 'react';
import getYouTubeID from 'get-youtube-id';
import moment from 'moment';
import YouTube from 'react-youtube';
import {block} from '../../utils';
import Rating from '../base/Rating/Rating';
import Grade from '../base/Grade/Grade';

import './do-review.scss';

const b = block('do-review');


class Review extends Component {
  render() {
    const {props} = this;

    return (
      <div className={b()}>
        <div className={b('name')}>{props.review.author.profile.name}</div>
        <div className={b('time-box')}>
          <span className={b('date')}>
            {moment(props.review.created_at).format('L')}
          </span>{' '}
          <span className={b('time')}>
            в {' '}
            {moment(props.review.created_at).format('LT')}
          </span>
        </div>
        <div className={b('full-rating-box')}>
          <Rating rating={props.review.rating} />
        </div>
        <div>
          <div className={b('rating-box')}>
            <span>Качество обслуживания:</span> <Grade rating={props.review.ratings[1]} />
          </div>
          <div className={b('rating-box')}>
            <span>Скорость обслуживания:</span> <Grade rating={props.review.ratings[2]} />
          </div>
          <div className={b('rating-box')}>
            <span>Актуальность цены:</span> <Grade rating={props.review.ratings[3]} />
          </div>
          <div className={b('rating-box')}>
            <span>Соответствие описанию:</span> <Grade rating={props.review.ratings[4]} />
          </div>
        </div>
        <div className={b('text')}>
          {props.review.body}
        </div>
        {!!props.review.images.length &&
          <section className={b('images')}>
            {props.review.images.map(image =>
              <div className={b('image')}><img src={image.thumb} alt='' /></div>
            )}
          </section>
        }
        {!!props.review.videos.length &&
          <div className={b('video')}>
            <YouTube
              videoId={getYouTubeID(props.review.videos[0].url)}
              opts={{height: 160, width: '100%'}}
            />
          </div>
        }
      </div>
    );
  }
}

export default Review;
