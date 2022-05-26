"use strict";

const sqlite = require("sqlite3");
const bcrypt = require("bcrypt");

function User_dao() {
  const userDB = new sqlite.Database(
    "./modules/database/ezwh.sqlite",
    (err) => {
      if (err) {
        console.log("Error connecting to DB");
        throw err;
      }
      const query7d = 'DROP TABLE IF EXISTS user;';
      userDB.run(query7d, (err) => {
        if (err) {
          console.log('Some Error Occured');
        } else {
          console.log('Table Created');
        }
      });
      const query7 = 'CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, name TEXT, surname TEXT, type TEXT);';
      userDB.run(query7, (err) => {
        if (err) {
          console.log('Some Error Occured');
        } else {
          console.log('Table Created');
        }
      });

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
  this.getAllUsers = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from user";
      userDB.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const users = rows.map((s) =>
            this.convertResultSetToDomainModelUser(s)
          );
          resolve(users);
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
      type: row.type
    };
  };

  this.getUser = (username, password) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM user WHERE username = ?";
      userDB.get(sql, [username], (err, row) => {
        if (err) reject(err);
        // DB error
        else if (row === undefined) resolve(false);
        // user not found
        else {
          bcrypt.compare(password, row.password).then((result) => {
            if (result) {
              // password matches
              resolve({
                id: row.id,
                username: row.username,
                name: row.name,
              });
            } else resolve(false); // password not matching
          });
        }
      });
    });
  };
  this.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM user WHERE id = ?";
      userDB.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else if (row === undefined) resolve({ error: "User not found." });
        else {
          const user = {
            id: row.id,
            username: row.username,
            name: row.name,
            type: row.type,
          };
          resolve(user);
        }
      });
    });
  };
  this.addNewUser = async (newUser) => {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hash = await bcrypt.hash(newUser.password, salt);
    const sql =
      "INSERT INTO user(username, password, name, surname, type) VALUES(?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      // const sql1 = "SELECT username,type,COUNT(*) FROM user GROUP BY username, type HAVING COUNT(*) = 0"
      const sql1 = "SELECT id FROM user WHERE username = ? AND type = ?"
      userDB.get(sql1, [newUser.username, newUser.type], (err, row) => {
        if (err) reject(503);
        else if (!(row === undefined || row.length == 0)) reject(409);
        else {
          userDB.run(
            sql,
            [newUser.username, hash, newUser.name, newUser.surname, newUser.type],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(201);
              }
            }
          );
        }
      })

    });
  };
  this.updateUserByUsername = (username, type) => {

    return new Promise((resolve, reject) => {
      const sql1 = "SELECT id FROM user WHERE type=? AND username=? ";
      userDB.all(sql1, [type.oldType, username], (err, rows) => {
        if (err) reject(503);
        else if (rows === undefined || rows.length == 0) reject(404);
        else {
          const sql =
            "UPDATE user SET type=? where id=? and type=?"
          userDB.run(
            sql,
            [type.newType, rows[0].id, type.oldType],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(200);
              }
            }
          );
        }
      })

    });
  };

  this.deleteUserByUsernameAndType = (username, type) => {
    return new Promise((resolve, reject) => {
      const sql1 = "SELECT * FROM user WHERE type=? AND username=? ";
      userDB.all(sql1, [type, username], (err, rows) => {
        if (err) reject(503);
        else if (rows === undefined || rows.length == 0) reject(404);
        else {
          const sql =
            "DELETE FROM USER where username=? and type=?"
          console.log(rows[0].type)
          userDB.run(
            sql,
            [rows[0].username, rows[0].type],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(200);
              }
            }
          );
        }
      })

    });
  };

  this.deleteAll = () => {
    const sql = "DELETE FROM USER";
    return new Promise((resolve, reject) => {
      userDB.run(sql, [], (err) => {
        if (err) {
          reject(503);
        } else {
          resolve(200);
        }
      });
    });
  };

}

module.exports = User_dao;
