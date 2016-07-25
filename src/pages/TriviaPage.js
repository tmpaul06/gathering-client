import React from 'react';

export default class TriviaPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<Trivia
      imageUrl={'tim_b_lee.jpg'}
      question={"Who invented the world wide web ?"}
      answer={"Tim Berners Lee"}
      onCorrectAnswer={this.handleCorrectAnswer}
    />);
  }
}