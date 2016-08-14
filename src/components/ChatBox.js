import React from 'react';
import UserStore from '../stores/UserStore';

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages || [ {
        self: true,
        text: 'Hi there',
        time: Date.now() - 3600 * 1000
      }, {
        self: false,
        text: 'Oh hi how are you',
        time: Date.now() - 30 * 1000
      }, {
        self: false,
        text: 'Hahhaha',
        time: Date.now()
      }, {
        self: true,
        text: ':O',
        time: Date.now()
      } ]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages
    }, () => {
      setTimeout(() => {
        this.refs.chatbox.scrollTop = this.refs.chatbox.scrollHeight;
      }, 300);
    });
  }

  render() {
    let messages = this.state.messages || [];
    return (<div>
      <ol className='chatbox-list clearfix' ref='chatbox'>
        {messages.map((message, i) => {
          return (<li className={message.self ? 'self' : 'other'}>
            <div>
              <span className={'message ' + (message.self ? 'bg-primary' : 'bg-tertiary')}>
                <span className='author'>
                  {message.self ? UserStore.userName : 'Twain The Pain'}
                </span>
                {message.text}
              </span>
            </div>
          </li>);
        })}
      </ol>
      <div className='chatbox-input-container'>
        <input
          className='chatbox-input'
          ref='input'
          type='text'
          onKeyDown={(e) => this.handleInputKeyDown(e)}
          placeholder='Enter message... Press Enter key to send'/>
      </div>
    </div>);
  }

  handleInputKeyDown(e) {
    let code = e.keyCode || e.which;
    if (code === 13) {
      if (this.props.onMessageInput) {
        this.props.onMessageInput(this.refs.input.value);
        this.refs.input.value = '';
      } else {
        let messages = this.state.messages || [];
        messages.push({
          self: true,
          text: this.refs.input.value,
          time: Date.now()
        });
        this.setState({
          messages
        }, () => {
          this.refs.input.value = '';
          this.refs.chatbox.scrollTop = this.refs.chatbox.scrollHeight;
        });
      }
    }
  }
}