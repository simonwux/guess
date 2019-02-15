import React from "react";

import "./App.css";

import Follower from "./Follower.js";


// const App = function () {
//   return (<div className="App">
//     Hola John!
//   </div>);
// };

const App = () => {
  let data = ["John", "Mafe", "Suhas"];

  function renderFollowers() {
    return data.map((f,i) =>
      <Follower follower={f} key={i}/>
    );
  }


  return (<div className="App">
    <h1>Followers</h1>

    { renderFollowers() }

    <div>Made by John with ♥️</div>
  </div>
  );
};



export default App;