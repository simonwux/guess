import React, { Component } from "react";
import PropTypes from "prop-types";

class Follower extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votes :0
    };

    this.onVote = this.onVote.bind(this);
  }

  onVote() {
    this.setState({
      votes: this.state.votes + 1
    });
  }

  render() {
    return (
      <div className="follower">
        Follower:
        {this.props.follower}
        <button onClick={this.onVote}>
          <span role="img">🤙</span>
        </button>
         Votes : {this.state.votes}
      </div>
    );
  }
}

Follower.propTypes = {
  follower: PropTypes.string.isRequired
};

export default Follower;