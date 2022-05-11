"use strict";

const db = require("./userDB");

exports.getUserInfo = () => {
  return new Promise((resolve, reject) => {
    // TODO : check for user with id = userId
    const sql = "SELECT id, username, name, surname, type FROM user";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const userInfo = {
        id: rows[0].id,
        username: rows[0].username,
        name: rows[0].name,
        surname: rows[0].surname,
        type: rows[0].type,
      };
      resolve(userInfo);
    });
  });
};
