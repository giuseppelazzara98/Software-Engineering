'use strict';
//Data Access Object
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function RestockOrders_dao() {
    // Restock Order 
    const roDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
    });

    this.getAllRO = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders';
            roDB.all(query, async (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(rows);
                }
            });
        })
    };

    this.getProduct = (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM SKUs WHERE id=?";
            roDB.get(query, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.getSKUItem = (rfid) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM SKUItems WHERE RFID=?";
            roDB.get(query, [rfid], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.getTransportDate = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT deliveryDate FROM transportNote WHERE id=?';
            roDB.get(query, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.getAllROIssued = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders WHERE state="ISSUED"';
            roDB.all(query, (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    this.getRO = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders WHERE id=?';
            roDB.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.insertRO = async (date, IDs, supplierId) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO restockOrders(issueDate, state, products, supplierID) VALUES(?, "ISSUED", ?, ?)';
            roDB.run(query, [date, IDs, supplierId], (err) => {
                if (err) {
                    console.log(err);
                    reject(503);
                } else {
                    resolve(201);
                }
            })
        })
    }

    this.updateStateRO = (id, newState) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE restockOrders SET state=? WHERE id=?';
            roDB.run(query, [newState, id], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(200);
                }
            })
        });
    }

    this.addSkuItems = async (id, skuItems) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE restockOrders SET skuItems=? WHERE id=?';
            roDB.run(query, [skuItems, id], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(200);
                }
            })
        })
    }

    this.insertTransportNote = async (date) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO transportNote (deliveryDate) VALUES(?)';
            roDB.run(query, [date], (err) =>{
                if(err){
                    reject(503);
                } else {
                    resolve(200);
                }
            })
        })
    }

    this.getTransportNoteID = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT MAX(id) AS max FROM transportNote';
            roDB.get(query, (err, row) => {
                if(err){
                    reject(503);
                } else {
                    resolve(row);
                }
            })
        })
    }
    this.updateSKUNote = (id, noteID) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE restockOrders SET transportNoteID=? WHERE id=?';
            roDB.run(query, [noteID, id], (err) => {
                if(err){
                    reject(503);
                } else {
                    resolve(200);
                }
            })
        })
    }

    this.deleteRO = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM restockOrders WHERE id=?';
            roDB.run(query, [id], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(204);
                }
            })
        })
    }

}


module.exports = RestockOrders_dao;