/** @format */
import React, { Component } from "react";
import { getMovies } from './fakeMovieService'
import "bootstrap/dist/css/bootstrap.css";
import 'font-awesome/css/font-awesome.css';

export default class Movies extends Component {
  state = {
    movies: getMovies()
  };

  render() {
    return (
      <table clasName="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          
          {this.state.movies.map(movie => (
            <tr>
            <td>{movie.title}</td>
            <td>{movie.genre}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>{movie.publishDate}</td>
            <button className="btn-danger btn-sm ">Remove</button>  
          </tr>
          ))}
            
        </tbody>
      </table>
    );
  }
}


