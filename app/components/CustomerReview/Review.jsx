import React, {Component} from 'react';

// ToDo: Прототип
class Review extends Component {
  state = {
    body: '',
    rating: 0,
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    },
    images: [],
    videos: [],
  }

  setGrade = (key, value) => {
    const ratings = {...this.state.ratings, [key]: value};

    this.setState({ratings});
  }

  setRating = (value) => {
    this.setState({rating: value});
  }

  render() {
    const {props, state} = this;

    return (
      <div style={{marginBottom: 20}}>
        <div>
          <div>Rating: <b>{state.rating}</b></div>
          <div>Grade 1: <b>{state.ratings[1]}</b></div>
        </div>
        <div onClick={() => { this.setGrade(1, 4); }}>setGrade(1,4)</div>
        <div onClick={() => { this.setRating(3); }}>setRating(3)</div>
      </div>
    );
  }
}

export default Review;
