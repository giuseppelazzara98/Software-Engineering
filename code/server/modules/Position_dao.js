"use strict";

const sqlite = require("sqlite3");

function Position_dao() {
  const poDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
    if (err) {
      console.log("Error connecting to DB");
      throw err;
    }
    console.log("PO: Connected to DB");
  });

  this.getAllPositions = () => {
    const sql = "SELECT * FROM position";
    return new Promise((resolve, reject) => {
      poDB.all(sql, async (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log(rows);
          const positions = rows.map((position) =>
            this.convertResultSetToDomainModelposition(position)
          );
          resolve(positions);
        }
      });
    });
  };
  this.convertResultSetToDomainModelposition = (position) => {
    return {
      positionID: position.positionID,
      aisleID: position.aisleID,
      row: position.row,
      col: position.col,
      maxWeight: position.maxWeight,
      maxVolume: position.maxVolume,
      occupiedWeight: position.occupiedWeight,
      occupiedVolume: position.occupiedVolume,
    };
  };
  this.createNewPosition = (position) => {
    const sql =
      "INSERT INTO position(positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      poDB.run(
        sql,
        [
          position.positionID,
          position.aisleID,
          position.row,
          position.col,
          position.maxWeight,
          position.maxVolume,
          0,
          0,
        ],
        (err) => {
          if (err) {
            resolve(503);
          } else {
            reject(201);
          }
        }
      );
    });
  };
  this.validatePositionID = (positionId, aisleID, row, col) => {
    if (aisleID.concat(row).concat(col) != positionId) return false;
    return true;
  };
}

module.exports = Position_dao;
