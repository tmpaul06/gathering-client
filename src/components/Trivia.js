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
  render() {
    return (
      <div className="trivia-container">
        <h3 className="trivia-question">{this.props.question}</h3>
        <GuessText answer={this.props.answer} onCorrectAnswer={this.props.onCorrectAnswer}/>
      </div>
    );
  }
}