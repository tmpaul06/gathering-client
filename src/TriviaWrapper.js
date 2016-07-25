import React from 'react';
import Trivia from './Trivia';
import UserStore from './stores/UserStore';
import { socket } from './socket';

export default class TriviaWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (UserStore.isMaster) {
      // Comes from the master room. Includes the name
      // email and timeDiff as recorded by the client
      socket.on('triviaResult', function(data) {
        console.log(data);
      });
    }
  }

  render() {
    return (
      <div>
        <Trivia
          imageUrl={this.props.imageUrl}
          question={this.props.question}
          answer={this.props.answer}
          onCorrectAnswer={this.handleCorrectAnswer}
        />
      </div>
    );
  }

  handleCorrectAnswer(timeDiff) {
    socket.emit('triviaAnswer', {
      time: timeDiff
    });
  }
}