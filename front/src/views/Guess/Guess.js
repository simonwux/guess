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
      .then(res => res.json())
      .then(res => {
        console.log("got data!", res);
        this.setState({winner: res});
      })
      .catch(err => console.log(err));
  }

  searchCount(email2) {
    fetch('/count', {
      headers: {
        email: email2
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log("got data!", res);
        this.setState({count: res});
      })
      .catch(err => console.log(err));
  }

  setWinnerBoard(email2, count2) {
    fetch("/winner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email2,
        count: count2 //set winner count
      })
    })
      .then(response => {
        // response.json().then(data => console.log(data));
        response
          .clone()
          .json()
          .then(data => this.setState({ regisMsg: data.msg }));
      })
      .catch(err => console.log(err));
  }

  addCount(email2) {
    fetch("/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email2
      })
    })
      .then(response => {
        // response.json().then(data => console.log(data));
        response
          .clone()
          .json()
          .then(data => this.setState({ regisMsg: data.msg }));
      })
      .catch(err => console.log(err));
  }

  render() {
    // const title = this.state.signUp ? 'Sign Up' : 'Login';
    // const msg = this.state.signUp ? 'If you already have an account: ' : 'If you don\'t have an account yet: ';
    // const buttonMsg = !this.state.signUp ? 'login' : 'sign up';
    // const buttonChangeMsg = this.state.signUp ? 'login' : 'sign up';
    let winner = null;
    if(this.state.winner) {
        const list = this.state.winner.map(r => {
          return (
            <li>{r["email"]}: {r["count"]}</li>
          );
        });
        winner = (
          <div>
            <h3>Top 10 Winners:</h3>
            <ul>{list}</ul>
          </div>
        );
    }

    let count = null;
    if(this.state.count) {
        const list = this.state.count.map(r => {
          return (
            <li>{r["email"]}: {r["count"]}</li>
          );
        });
        count = (
          <div>
            <h3>Search for counter:</h3>
            <ul>{list}</ul>
          </div>
        );
    }
    return (
      <div>
        <button onClick={() => this.winnerBoard()}>See Winners</button>
        <button onClick={() => this.setWinnerBoard("asdf", 100)}>Add Winners</button>
        <button onClick={() => this.searchCount("a")}>See count</button>
        <button onClick={() => this.addCount("a")}>Add Count</button>
        {count}
        {winner}
      </div>
    );
  }
}

Guess.propTypes = {
  email: PropTypes.string
};

export default Guess;
