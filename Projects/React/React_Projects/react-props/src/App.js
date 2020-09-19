/** @format */

import React, { Component } from "react";
import Movies from "./movies";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    let movie = {
      name: "Terminator",
      Genre: "Action"
    };
    return <Movies movies={movie} />;
  }
}

export default App;
