"use strict";

const sqlite = require("sqlite3");

function User_dao() {
  const userDB = new sqlite.Database(
    "./modules/database/ezwh.sqlite",
    (err) => {
      if (err) {
        console.log("Error connecting to DB");
        throw err;
      }
      console.log("User: Connected to DB");
    }
  );
}

module.exports = User_dao;
