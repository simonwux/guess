import React, {Component} from "react";
import PropTypes from "prop-types";

class Follower extends Component {
  render() {
    return (
      <div className="follower">
        Follower:
        {this.props.follower}
        <button><span role="img">🤙</span></button>
        Votes : {0}
      </div>
    );
  }
}

Follower.propTypes = {
  follower: PropTypes.string.isRequired
};

export default Follower;