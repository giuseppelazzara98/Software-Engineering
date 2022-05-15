"use strict";

const sqlite = require("sqlite3");
const dayjs = require("dayjs");

function ReturnOrders_dao() {
  const reDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
    if (err) {
      console.log("Error connecting to DB");
      throw err;
    }
    console.log("RE: Connected to DB");
  });

  this.getAllReturnOrders = () => {
    const sql = "SELECT * FROM returnOrder";
    return new Promise((resolve, reject) => {
      reDB.all(sql, async (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const orders = await Promise.all(
            rows.map(async (row) => {
              //each row must retrieve the sku items
              return convertResultSetToDomainModelSKUItems(row);
            })
          );
          resolve(orders);
        }
      });
    });
  };

  this.getReturnOrderById = (id) => {
    const sql = "SELECT * FROM returnOrder WHERE id=?";
    return new Promise((resolve, reject) => {
      reDB.get(sql, [id], (err, row) => {
        if (err) {
          reject(500);
        } else {
          if (row == undefined) reject(404);
          const order = new Promise(async (resolve, reject) => {
            resolve(convertResultSetToDomainModelSKUItems(row));
          });
          resolve(order);
        }
      });
    });
  };

  this.getSKUItemByRFID = (id) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT RFID, SKUId, description, price FROM SKUItems INNER JOIN SKUs on SKUs.id = SKUItems.SKUId WHERE RFID=?";
      reDB.get(sql, [id], (err, row) => {
        if (err) {
          reject(500);
        } else if (row === undefined) {
          reject(404);
        } else {
          resolve({
            SKUId: row.SKUId,
            description: row.description,
            price: row.price,
            RFID: row.RFID,
          });
        }
      });
    });
  };
  this.createNewReturnOrder = (order) => {
    const restockOrderId = order.restockOrderId;
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM restockOrders WHERE id=?";
      reDB.get(query, [restockOrderId], (err, row) => {
        if (err) {
          reject(500);
        } else {
          if (row == undefined) reject(404);
          else {
            if (row.state != "COMPLETEDRETURN") reject(404);
            resolve(row.state);
          }
        }
      });
    }).then(() => {
      const date = dayjs(order.returnDate)
        .format("YYYY-MM-DD HH:MM")
        .toString();
      const products = [...order.products];
      var RFIDs = Array();
      products.forEach((p) => RFIDs.push(p.RFID));
      RFIDs = RFIDs.toString();
      // todo: check if products of return order were already in restock order
      const sql =
        "INSERT INTO returnOrder(returnDate, products, restockOrderId) VALUES(?, ?, ?)";
      return new Promise((resolve, reject) => {
        reDB.run(sql, [date, RFIDs, restockOrderId], (err) => {
          if (err) {
            resolve(503);
          } else {
            reject(201);
          }
        });
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) => {
          return err;
        });
    });
  };

  this.deleteReturnOrderById = (id) => {
    const sql = "DELETE FROM returnOrder WHERE id=?";
    return new Promise((resolve, reject) => {
      reDB.run(sql, [id], (err) => {
        if (err) {
          reject(503);
        } else {
          resolve(204);
        }
      });
    });
  };

  const convertResultSetToDomainModelSKUItems = async (row) => {
    const IDs = row.products.split(",");
    //retrieve the array of products
    const items = await Promise.all(
      IDs.map(async (id) => {
        const item = this.getSKUItemByRFID(id)
          .then((p) => p)
          .catch((e) => undefined);
        return item;
      })
    );
    return {
      id: row.id,
      returnDate: row.returnDate,
      products: items.filter((p) => p !== undefined),
      restockOrderId: row.restockOrderId,
    };
  };
}

module.exports = ReturnOrders_dao;
