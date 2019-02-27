import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class AvoidLoginRoute extends Component {
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
            <Redirect to="/guess" />
          )
        }
      />
    );
  }
}

AvoidLoginRoute.propTypes = {
  component: PropTypes.func,
  authenticated: PropTypes.bool
};

export default AvoidLoginRoute;
