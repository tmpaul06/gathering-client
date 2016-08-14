import React from 'react';
import UserStore from '../stores/UserStore';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.setUserName = this.setUserName.bind(this);
    this.setUserEmail = this.setUserEmail.bind(this);
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div className='login-container'>
        <div className='screen monitor'>
          <div className='content'>
            <form>
              <p>Username</p>
              <input className='field' type='text' placeholder={'Enter name...'} value={UserStore.userName} onChange={this.setUserName}/>
              <p>Email</p>
              <input className='field' type='text' placeholder={'____@nineleaps.com'} value={UserStore.userEmail} onChange={this.setUserEmail}/>
              <div>
                <input className='submit-button' type='submit' value={'Go'} onClick={this.login}/>
              </div>
            </form>
          </div>
          <div className='base'>
            <div className='grey-shadow'></div>
            <div className='foot top'></div>
            <div className='foot bottom'></div>
            <div className='shadow'></div>
          </div>
        </div>
      </div>
    );
  }

  setUserName(e) {
    UserStore.userName = e.target.value;
    this.forceUpdate();
  }

  setUserEmail(e) {
    UserStore.userEmail = e.target.value;
    this.forceUpdate();
  }

  login(e) {
    e.preventDefault();
    // Proceed to next page.
    if (this.props.onLogin) {
      this.props.onLogin();
    }
    return false;
  }
}