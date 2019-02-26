import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Guess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    };
  }

  // handleChangeEmail(e) {
  //   this.setState({email: e.target.value});
  // }

  // handleChangePassword(e) {
  //   this.setState({password: e.target.value});
  // }

  // handleRegister() {
  //   fetch('/users', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: this.state.email,
  //       password: this.state.password
  //     })
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         response.json().then((json) => this.props.onLogin(json.email));
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }

  // handleLogin() {
  //   fetch('/users', {
  //     headers: {
  //       'email': this.state.email,
  //       'password': this.state.password
  //     }
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         response.json().then((json) => this.props.onLogin(json.email));
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }
  // renderWinners() {
  //   console.log(this.state.winners);
  //   return this.state.winners.map(c => <div>c.email</div> );
  // }

  winnerBoard() {
    fetch('/winner')
      .then(res => {
        res.json().then(json => this.setState({result: json}));
      })
      .catch(err => console.log(err));
  }

  render() {
    // const title = this.state.signUp ? 'Sign Up' : 'Login';
    // const msg = this.state.signUp ? 'If you already have an account: ' : 'If you don\'t have an account yet: ';
    // const buttonMsg = !this.state.signUp ? 'login' : 'sign up';
    // const buttonChangeMsg = this.state.signUp ? 'login' : 'sign up';
    let result = null;
    if(this.state.result) {
        const list = this.state.result.map((r, i) => {
          return (
            <li key={i}>{r}</li>
          );
        });
        result = (
          <div>
            <h3>Results:</h3>
            <ul>{list}</ul>
          </div>
        );
    }
    return (
      <div>
        <button onClick={() => this.winnerBoard()}>Winner
        </button>
        {result}
      </div>
    );
  }
}

Guess.propTypes = {
  email: PropTypes.string
};

export default Guess;
