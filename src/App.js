import React, { Component } from 'react';
import Trivia from './Trivia';
require('../less/main.less');
import { socket } from './socket';
import LoginPage from './pages/LoginPage';
import UserStore from './stores/UserStore';
import request from 'superagent';
import LoadingPage from './pages/LoadingPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    if (UserStore.userName === undefined) {
      this.state = {
        authentication: 'loading'
      };
    }
  }

  componentDidMount() {
    if (this.state.authentication === 'loading') {
      this.checkLogin();
    }
  }

  render() {
    if (this.state.authentication === 'loading') {
      // Render loading page...
      return (<LoadingPage/>);
    } else if (this.state.authentication === 'logged-out') {
      return (<LoginPage onLogin={this.handleLogin}/>);
    }
    return (
      <Trivia
        imageUrl={'tim_b_lee.jpg'}
        question={"Who invented the world wide web ?"}
        answer={"Tim Berners Lee"}
        onCorrectAnswer={this.handleCorrectAnswer}
      />
    );
  }

  checkLogin() {
    setTimeout(() => {
      request.get('/api/checkLogin')
        .end((err, response) => {
          if (err) {
            console.error(err);
          } else {
            let body = response.body;
            if (body.loggedIn) {
              UserStore.userName = body.name;
              UserStore.userEmail = body.email;
              UserStore.isMaster = body.isMaster;
              this.setState({
                authentication: 'logged-in'
              });
            } else {
              this.setState({
                authentication: 'logged-out'
              });
            }
          }
        });
    }, 2000);
  }

  handleCorrectAnswer(timeDiff) {
    console.log('Emitting results');
    socket.emit('triviaAnswer', {
      uid: Math.random(),
      time: timeDiff
    });
  }

  handleLogin() {
    request
    .post('/api/login')
    .send({ name: UserStore.userName, email: UserStore.userEmail })
    .set('Accept', 'application/json')
    .end((err, res) => {
      // Calling the end function will send the request
      if (err) {
        console.error('Error logging in ' + err);
      } else {
        // Check if the current user is a master client. If so, let the user
        // join master room
        console.log('Emitting user details');
        socket.emit('userLogin', {
          name: UserStore.userName,
          email: UserStore.userEmail
        });
        this.setState({
          authentication: 'logged-in'
        });
      }
    });
  }
}
