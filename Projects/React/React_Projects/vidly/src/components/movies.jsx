/** @format */

import React, { Component } from "react";
import { getMovies } from "./fakeMovieService";

export default class Movies extends Component {
  state = {
    movies: getMovies()
  };

  render() {
    return <div>This is {this.state.movies.name}</div>;
  }
}
