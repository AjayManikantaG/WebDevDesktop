/** @format */

const debug = require("debug")("app:start");

getUser(1, displayUser);

console.log("Before");

// To scare away callback hell --> Use, named functions instead of anonymous functions
function displayCommits(message) {
    console.log(`commits done...${message}`);
}

function displayRepo(repos) {
    getCommits(repos, displayCommits);
}

function displayUser(userDetails) {
    console.log(userDetails);
    getRepos(userDetails, displayRepo);
  }

// Main Functions
function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: 1, pass: "Ajay" });
  }, 2000);
}

function getRepos(users, callback) {
  setTimeout(() => {
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repos, callback) {
  setTimeout(() => {
    callback("for Repos" + repos + "Commits Done..!!");
  }, 2000);
}

console.log("After");
