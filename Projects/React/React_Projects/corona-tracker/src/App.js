/** @format */

import React, { Component } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

export default class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      data: fetchedData,
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log("Ajay");
    this.setState({
      data: fetchedData,
      country: country,
    });
    console.log(fetchedData);
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.spacing}></div>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
