import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import "assets/scss/guess-react.scss";

// pages for this product
import GuessPage from "views/GuessPage/GuessPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ProtectedRoute from "views/ProtectedRoute.jsx";

class AllRoutes extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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

  render() {
    return (
      <Switch>
        {/*      <Route path="/guess" component={GuessPage} />*/}
        <ProtectedRoute
          path="/guess"
          component={GuessPage}
          login={this.login}
          logout={this.logout}
          authenticated={this.state.authenticated}
          email={this.state.email}
        />
        <Route
          path="/"
          render={() => (
            <LoginPage
              login={this.login}
              logout={this.logout}
              authenticated={this.state.authenticated}
            />
          )}
        />
      </Switch>
    );
  }
}

AllRoutes.propTypes = {
  history: PropTypes.object
};

export default AllRoutes;
