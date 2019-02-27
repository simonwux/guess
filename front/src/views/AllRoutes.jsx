import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import "assets/scss/guess-react.scss";

// pages for this product
import GuessPage from "views/GuessPage/GuessPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import BoardPage from "views/BoardPage/BoardPage.jsx";
import ProtectedRoute from "views/ProtectedRoute.jsx";

class AllRoutes extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.openBoard = this.openBoard.bind(this);
    this.state = {
      authenticated: false,
      email: ""
    };
  }

  login(e) {
    this.setState({ authenticated: true, email: e });
    this.props.history.push("/guess");
  }

  logout() {
    this.setState({ authenticated: false, email: "" });
    this.props.history.push("/");
  }

  openBoard() {
    this.setState({ authenticated: false, email: "" });
    this.props.history.push("/");
  }

  render() {
    return (
      <Switch>
        {/*      <Route path="/guess" component={GuessPage} />*/}
        <ProtectedRoute
          path="/guess"
          component={GuessPage}
          login={this.login}
          logout={this.logout}
          openBoard={this.openBoard}
          authenticated={this.state.authenticated}
          email={this.state.email}
        />
        <Route
          exact
          path="/"
          render={() => (
            <LoginPage
              login={this.login}
              logout={this.logout}
              openBoard={this.openBoard}
              authenticated={this.state.authenticated}
              email={this.state.email}
            />
          )}
        />
        <Route
          path="/board"
          render={() => (
            <BoardPage
              login={this.login}
              logout={this.logout}
              openBoard={this.openBoard}
              authenticated={this.state.authenticated}
              email={this.state.email}
            />
          )}
        />
        {/*<Route
          path="/board"
          component={BoardPage}
          login={this.login}
          logout={this.logout}
          openBoard={this.openBoard}
          authenticated={this.state.authenticated}
          email={this.state.email}
        />*/}
      </Switch>
    );
  }
}

AllRoutes.propTypes = {
  history: PropTypes.object
};

export default AllRoutes;
