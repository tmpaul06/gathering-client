import React from 'react';
import GuessText from './GuessText';

export default class Trivia extends React.Component {
  //**********************************************
  // Constructor
  //**********************************************
  constructor(props) {
    super(props);
  }
  //**********************************************
  // React methods
  //**********************************************
  componentWillMount() {
    document.body.classList.add('body-bg');
    if (this.props.imageUrl) {
      let url = 'url("/static/images/' + this.props.imageUrl + '")';
      document.body.style.backgroundImage = url;
    } else {
      document.body.style.background = '#212121';
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('body-bg');
    document.body.style.background = undefined;
  }
  render() {
    return (
      <div className="trivia-container">
        <h3 className="trivia-question">{this.props.question}</h3>
        <GuessText answer={this.props.answer} onCorrectAnswer={this.props.onCorrectAnswer}/>
      </div>
    );
  }
}