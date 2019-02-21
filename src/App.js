import React, { Component } from "react";
import LoginPage from "views/LoginPage/LoginPage.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      Name: "",
      email: ""
    };
  }

  renderLogin() {
    return <LoginPage />;
  }

  renderApp() {
    // return(
    //   <Duozi email={this.state.email}/>
    // );
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
