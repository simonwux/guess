import React from "react";

import "./App.css";





// const App = function () {
//   return (<div className="App">
//     Hola John!
//   </div>);
// };

const App = () => {
  let data = ["John", "Mafe", "Suhas"];


  return (<div className="App">
    <h1>Followers</h1>

    { data.map((f,i) =>
      <div key={i}>{f}</div>
    )}

    <div>Made by John with ♥️</div>
  </div>
  );
};



export default App;