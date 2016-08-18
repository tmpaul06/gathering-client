import React from 'react';
import { socket } from '../socket';
import ChatBox from '../components/ChatBox';

export default class BotChatWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.handleBotReply = this.handleBotReply.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount() {
    socket.on('botReply', this.handleBotReply);
  }

  componentWillUnmount() {
    socket.off('botReply', this.handleBotReply);
  }

  handleBotReply(message) {
    let messages = this.state.messages;
    messages.push({
      self: false,
      time: Date.now(),
      text: message
    });
    this.setState({
      messages
    });
  }

  handleUserInput(message) {
    let messages = this.state.messages;
    messages.push({
      self: true,
      time: Date.now(),
      text: message
    });
    // If text contains damn..
    if (message.toLowerCase().indexOf('damn') !== -1) {
      
      messages.push({
        self: false,
        time: Date.now(),
        text: undefined,
        pic: require('static/images/ice_cube.jpg')
      });
      return this.setState({
        messages
      });
    }
    this.setState({
      messages
    }, () => {
      socket.emit('botChat');
    });
  }

  render() {
    return (
      <ChatBox
        otherName={this.props.otherName}
        messages={this.state.messages}
        onMessageInput={this.handleUserInput}/>
    );
  }
};