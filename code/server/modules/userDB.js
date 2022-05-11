"use strict";

const sqlite = require("sqlite3");

const userDB = new sqlite.Database("./modules/database/userDB.db", (err) => {
  if (err) {
    console.log("Error connecting to userDB");
    throw err;
  }
  console.log("Connected to userDB");
});
module.exports = userDB;
