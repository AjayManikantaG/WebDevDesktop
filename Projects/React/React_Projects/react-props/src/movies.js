import React, { Component } from 'react';

class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Jalsa",
            Genre: "Thriller"
        }
    }
    
    clickedButton() {
        let name = this.props.movies.name;
        let Genre = this.props.movies.Genre;
        this.setState( {
            name,
            Genre
        } )
    }
    
    render() {
         
        return (
            <div>
            <p>Movie Name is {this.state.name} and Genre is {this.state.Genre}</p>
            <button onClick={() => this.clickedButton()}>Click me</button>
            </div>
        )
    }
}

export default Movies;

