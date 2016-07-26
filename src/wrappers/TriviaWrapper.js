import React from 'react';
import Trivia from '../components/Trivia';
import UserStore from '../stores/UserStore';
import { socket } from '../socket';

export default class TriviaWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triviaResults: []
    };
  }

  componentDidMount() {
    if (UserStore.isMaster) {
      // Comes from the master room. Includes the name
      // email and timeDiff as recorded by the client
      socket.on('triviaResult', (data) => {
        let triviaResults = this.state.triviaResults;
        triviaResults.push({
          name: data.name,
          time: ((data.time - Date.now()) / 1000).toFixed(1)
        });
        this.setState({
          triviaResults
        });
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
        <ul className='trivia-results-list'>
        {this.state.triviaResults.slice(0, 3).map((result, i) => {
          return (<li className='trivia-results-list-item' key={i}>
            <span>{(i + 1)}</span>
            <span>{result.name}</span>
            <span className='time'>{result.time + ' s'}</span>
          </li>);
        })}
        </ul>
      </div>
    );
  }

  handleCorrectAnswer(timeDiff) {
    socket.emit('triviaAnswer', {
      time: timeDiff
    });
  }
}