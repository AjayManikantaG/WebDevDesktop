/** @format */

import React, { Component } from "react";
import getMovies from "./movie_list";
import "font-awesome/css/font-awesome.css";

export class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movie: getMovies(),
      love: "-"
    };
  }

  deleteHandler(key) {
    const movie = this.state.movie.filter(movieKey => movieKey.key !== key);
    console.log(movie);
    this.setState({
      movie
    });
  }

  loveHandler(love) {
    if (love === "-") {
      love = "+";
    } else {
      love = "-";
    }

    this.setState({
      love
    });
  }

  render() {
    console.log(this.state.movie);
    return (
      <div>
        <p>Showing {this.state.movie.length} movies in the database</p>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movie.map(movie => {
              return (
                <tr key={movie.key}>
                  <td>{movie.name}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.stock}</td>
                  <td>{movie.rate}</td>
                  <td>
                    <i onClick={() => this.loveHandler(this.state.love, this.state.movie.key)}>{this.state.love}</i>
                  </td>
                  <td>
                    <button onClick={() => this.deleteHandler(movie.key)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
