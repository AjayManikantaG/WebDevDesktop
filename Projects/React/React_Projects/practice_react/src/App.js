/** @format */

import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  addItem(value) {
    if (value !== "") {
      const newList = {
        id: Date.now(),
        note: value
      };

      const updatedlist = [...this.state.list];
      updatedlist.push(newList);
      console.log(updatedlist);
      this.setState({
        newItem: "",
        list: [...updatedlist]
      });
      console.log(this.state);
    }
  }

  updateItem(updatedValue) {
    this.setState({ newItem: updatedValue });
  }


  render() {
    return (
      <div className="container">
        <h1>What do i need to do today ?</h1>
        <p>Items i need to Add</p>
        <p>Check off items once you have done...!</p>
        <hr />
        <div className="notes">
          <div className="input">
            <input type="checkbox" className="checkbox" />
            <p>Enter the toDo</p>
          </div>
          <div className="buttons">
            <button className="del">Delete</button>
          </div>
        </div>
        <hr />
        <div className="addItem">
          <input
            type="text"
            required
            placeholder="Enter the toDo item"
            value={this.state.newItem}
            onChange={e => this.updateItem(e.target.value)}
          />
          <button
            className="add-note"
            onClick={() => this.addItem(this.state.newItem)}>
            + Add
          </button>
        </div>
      </div>
    );
  }
}

export default App;
