import React, { Component } from "react";
import LoginPage from "views/LoginPage/LoginPage.js";

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
        onLogin={(nameRes, emailRes) => {
          this.setState({
            loggedIn: true,
            name: nameRes,
            email: emailRes
          });
        }}
      />
    );
  }

  renderApp() {
    return <h1>{this.state.name}</h1>;
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
