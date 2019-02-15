import React, {Component} from "react";

import "./App.css";

import Follower from "./Follower.js";

// const App = function () {
//   return (<div className="App">
//     Hola John!
//   </div>);
// };

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  renderFollowers() {
    return this.state.data.map((f, i) => <Follower follower={f.follower.screen_name} key={i} />);
  }

  componentDidMount() {
    fetch("/api")
      .then((response) => {
        // Got the data, transform it into json
        return response.json();
      })
      .then((data) => this.setState({
        data:data
      }));
  }

  render() {
    return (
      <div className="App">
        <h1>Followers</h1>

        {this.renderFollowers()}

        <div> Total # of followers: {this.state.data.length} </div>

        <div>
          Made by John with <span role="img">♥️</span>
        </div>
      </div>
    );
  }
}

export default App;