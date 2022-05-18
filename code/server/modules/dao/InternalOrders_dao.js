'use strict';

const sqlite = require('sqlite3');

function internalOrders_dao() {
    //Internal Orders
    const ioDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
    });

    this.getAllIO = () => {
        return new Promise((resolve, reject) => {
            const query_all = 'SELECT * FROM internalOrders';
            ioDB.all(query_all, (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(rows);
                }
            })
        });
    }

    this.getProduct = (id, state) => {
        return new Promise((resolve, reject) => {
            const query1 = 'SELECT * FROM SKUs WHERE id=?';
            const query2 = 'SELECT * FROM SKUs INNER JOIN SKUItems on SKUs.id=SKUItems.SKUId WHERE SKUs.id=?'
            ioDB.get(state !== 'COMPLETED' ? query1 : query2, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        });
    }

    this.getAllIOIssued = () => {
        return new Promise((resolve, reject) => {
            const query_issued = 'SELECT * FROM internalOrders WHERE state="ISSUED"';
            ioDB.all(query_issued, (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(rows);
                }
            })
        });
    };

    this.getAllIOAccepted = () => {
        return new Promise((resolve, reject) => {
            const query_accepted = 'SELECT * FROM internalOrders WHERE state="ACCEPTED"';
            ioDB.all(query_accepted, (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(rows);
                }
            })
        });
    };


    this.getIO = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM internalOrders WHERE id=?';
            ioDB.get(query, [id], async (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            });
        });
    };

    this.insertIO = async (date, IDs, customerID) => {
        return new Promise((resolve, reject) => {
            const query_insert = 'INSERT INTO internalOrders(issueDate, state, products, customerID) VALUES(?, "ISSUED", ?, ?)';
            ioDB.run(query_insert, [date, IDs, customerID], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(201);
                }
            })
        })
    };

    this.updateStateIO = async (id, newState, IDs) => {
        return new Promise((resolve, reject) => {
            if (newState !== 'COMPLETED') {
                const query = 'UPDATE internalOrders SET state=? WHERE id=?';
                ioDB.run(query, [newState, id], (err) => {
                    if (err) {
                        reject(503);
                    } else {
                        resolve(200);
                    }
                })
            } else {
                const query = 'UPDATE internalOrders SET state=?, products=? WHERE id=?';
                ioDB.run(query, [newState, IDs, id], (err) => {
                    if(err) {
                        reject(503);
                    } else {
                        resolve(200);
                    }
                })
            }
        })
    };

    this.deleteIO = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM internalOrders WHERE id=?';
            ioDB.run(query, [id], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(204);
                }
            })
        })
    }
}




module.exports = internalOrders_dao;