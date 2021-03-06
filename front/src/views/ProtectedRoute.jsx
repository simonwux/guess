import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated
    };
  }

  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={() =>
          this.state.authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  authenticated: PropTypes.bool
};

export default ProtectedRoute;
