/** @format */

const axios = require("axios");

const typicode = axios.get("https://jsonplaceholder.typicode.com/todos/");

typicode
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
