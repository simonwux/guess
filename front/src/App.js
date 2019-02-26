import React, { Component } from "react";
import LoginPage from "views/LoginPage/LoginPage.js";
import Guess from "views/Guess/Guess";
import "assets/scss/guess-react.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      name: "",
      email: ""
    };
  }

  renderLogin() {
    return (
      <LoginPage
        onLogin={emailRes => {
          this.setState({
            loggedIn: true,
            email: emailRes
          });
        }}
      />
    );
  }

  renderApp() {
    return(
      <Guess email={this.state.email}/>
    );
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? this.renderApp() : this.renderLogin()}
      </div>
    );
  }
}

export default App;
