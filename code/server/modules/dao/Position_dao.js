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
  this.buildPositionID = (aisleID, row, col) => {
    return aisleID.concat(row).concat(col);
  };

  this.updatePositionByPosId = (posid, newPos) => {
    return new Promise((resolve, reject) => {
      const sql1 = "SELECT * from position p where p.positionID = ?";
      poDB.all(sql1, [posid], (err, rows) => {
        if (err) reject(503);
        else if (rows.length == 0) {
          reject(404);
        } else {
          var sql2 = "UPDATE position SET ";
          var parameters = [];
          if (newPos.newAisleID != undefined) {
            sql2 = sql2.concat("aisleID = ?");
            parameters.push(newPos.newAisleID);
          }
          if (newPos.newRow != undefined) {
            sql2 = sql2.concat(", row = ?");
            parameters.push(newPos.newRow);
          }
          if (newPos.newCol != undefined) {
            sql2 = sql2.concat(", col = ?");
            parameters.push(newPos.newCol);
          }
          if (newPos.newMaxWeight != undefined) {
            sql2 = sql2.concat(", maxWeight = ?");
            parameters.push(newPos.newMaxWeight);
          }
          if (newPos.newMaxVolume != undefined) {
            sql2 = sql2.concat(", maxVolume = ?");
            parameters.push(newPos.newMaxVolume);
          }
          if (newPos.newOccupiedWeight != undefined) {
            if (
              (newPos.newMaxWeight != undefined &&
                newPos.newOccupiedWeight <= newPos.newMaxWeight) ||
              (newPos.newMaxWeight == undefined &&
                newPos.newOccupiedWeight <= rows[0].maxWeight)
            ) {
              sql2 = sql2.concat(", occupiedWeight = ?");
              parameters.push(newPos.newOccupiedWeight);
            } else {
              reject(422);
            }
          }
          if (newPos.newOccupiedVolume != undefined) {
            if (
              (newPos.newMaxVolume != undefined &&
                newPos.newOccupiedVolume <= newPos.newMaxVolume) ||
              (newPos.newMaxVolume == undefined &&
                newPos.newOccupiedVolume <= rows[0].maxVolume)
            ) {
              sql2 = sql2.concat(", occupiedVolume = ?");
              parameters.push(newPos.newOccupiedVolume);
            } else reject(422);
          }
          sql2 = sql2.concat(", positionID = ?");
          parameters.push(
            this.buildPositionID(
              newPos.newAisleID ? newPos.newAisleID : rows[0].aisleID,
              newPos.newRow ? newPos.newRow : rows[0].row,
              newPos.newCol ? newPos.newCol : rows[0].col
            )
          );
          sql2 = sql2.concat(" WHERE positionID = ?");
          parameters.push(posid);

          poDB.run(sql2, parameters, function (err) {
            if (err) reject(err);
            else resolve(200);
          });
        }
      });
    });
  };
  this.updatePositionId = (oldPosid, newPosid) => {
    return new Promise((resolve, reject) => {
      const sql1 = "SELECT * from position p where p.positionID = ?";
      poDB.all(sql1, [oldPosid], (err, rows) => {
        if (err) reject(503);
        else if (rows.length == 0) {
          reject(404);
        } else {
          var sql2 =
            "UPDATE position SET aisleID = ?, row = ?, col = ?, positionID = ? WHERE positionID = ?";
          poDB.run(
            sql2,
            [
              newPosid.substr(0, 4),
              newPosid.substr(4, 4),
              newPosid.substr(8, 4),
              newPosid,
              oldPosid,
            ],
            function (err) {
              if (err) reject(err);
              else resolve(200);
            }
          );
        }
      });
    });
  };
  this.deletePositionByPosid = (posId) => {
    const sql = "DELETE FROM position WHERE positionID = ?";
    return new Promise((resolve, reject) => {
      poDB.run(sql, [posId], (err) => {
        if (err) {
          reject(503);
        } else {
          resolve(204);
        }
      });
    });
  };
}

module.exports = Position_dao;
