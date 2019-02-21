import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signUp: false
    };
  }

  handleChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  handleChangePassword(e) {
    this.setState({password: e.target.value});
  }

  handleRegister() {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((json) => this.props.onLogin(json.email));
        }
      })
      .catch(err => console.log(err));
  }

  handleLogin() {
    fetch('/users', {
      headers: {
        'email': this.state.email,
        'password': this.state.password
      }
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((json) => this.props.onLogin(json.email));
        }
      })
      .catch(err => console.log(err));
  }

  tryLogin() {
    if(this.state.signUp) this.handleRegister();
    else this.handleLogin();
    this.setState({email: '', password: ''});
  }

  render() {
    const title = this.state.signUp ? 'Sign Up' : 'Login';
    const msg = this.state.signUp ? 'If you already have an account: ' : 'If you don\'t have an account yet: ';
    const buttonMsg = !this.state.signUp ? 'login' : 'sign up';
    const buttonChangeMsg = this.state.signUp ? 'login' : 'sign up';
    return (
      <div className='login-container'>
        <h1>Guess</h1>
        <div className='login-flex-container'>
          <div className='login-modal-container'>
            <h2>{title}</h2>
            <label>Email</label>
            <input type="text" placeholder="" value={this.state.email} onChange={this.handleChangeEmail.bind(this)}/>
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={this.handleChangePassword.bind(this)}/>
            <button className="login-button" onClick={this.tryLogin.bind(this)}>{buttonMsg}</button>
          </div>
          <div className='login-register-change-container'>
            <span>{msg}</span>
            <button onClick={() => this.setState({signUp: !this.state.signUp, email: '', password: ''})}>{buttonChangeMsg}</button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func
};

export default Login;
