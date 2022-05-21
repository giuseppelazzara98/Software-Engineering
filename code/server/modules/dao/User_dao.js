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
  this.getAllSuppliers = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from user WHERE type = 'supplier';";
      userDB.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const suppliers = rows.map((s) =>
            this.convertResultSetToDomainModelUser(s)
          );
          resolve(suppliers);
        }
      });
    });
  };
  this.convertResultSetToDomainModelUser = (row) => {
    return {
      id: row.id,
      name: row.name,
      surname: row.surname,
      email: row.username,
    };
  };
}

module.exports = User_dao;
