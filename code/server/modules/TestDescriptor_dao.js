'use strict';
const sqlite = require('sqlite3');

function TestDescriptor_dao() {
    const tdDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
        console.log("TD: Connected to DB");
    });

    this.getAllTD = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM testDescriptors';
            tdDB.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    this.getTD = (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM testDescriptors WHERE id=?";
            tdDB.get(query, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        })
    }
    // to be tested since there are no skus in the table
    this.addTD = (body) => {
        const name = body.name;
        const procedure = body.procedureDescription;
        const idSKU = body.idSKU;

        return new Promise((resolve, reject) => {
            const query_SKU = 'SELECT * FROM SKUs WHERE id=?';
            tdDB.get(query_SKU, [idSKU], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        }).then(
            (row) => {
                const query_add = 'INSERT into testDescriptors(name, procedureDescription, idSKU) VALUES(?, ?, ?)';
                return new Promise((resolve, reject) => {
                    if (row === undefined) reject(404)
                    tdDB.run(query_add, [name, procedure, idSKU], (err) => {
                        if (err) {
                            reject(503);
                        } else {
                            resolve(201);
                        }
                    })
                })
            }
        )
    }

    this.updateTD = (id, body) => {
        const newName = body.newName;
        const newProcedure = body.newProcedureDescription;
        const newIdSKU = body.newIdSKU;

        return new Promise((resolve, reject) => {
            const query_tdID = "SELECT * FROM testDescriptors WHERE id=?";
            tdDB.get(query_tdID, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        }).then((tdID) => {
            return new Promise((resolve, reject) => {
                const query_SKU = 'SELECT * FROM SKUs WHERE id=?';
                tdDB.get(query_SKU, [newIdSKU], (err, row) => {
                    if (err) {
                        reject(500);
                    } else if (tdID === undefined || row === undefined) {
                        reject(404);
                    }
                    resolve('both exists');
                })
            })

        }).then(() => {
            return new Promise((resolve, reject) => {
                const query_update = 'UPDATE testDescriptors SET name=?, procedureDescription=?, idSKU=? WHERE id=?';
                tdDB.run(query_update, [newName, newProcedure, newIdSKU, id], (err) => {
                    if (err) {
                        reject(500)
                    } else {
                        resolve(200);
                    }
                })
            })
        }).catch((err) => {
            return new Promise((resolve, reject) => { reject(err) });
        })
    }

    this.deleteTD = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM testDescriptors WHERE id=?';
            tdDB.run(query, [id], (err) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(204);
                }
            })
        })
    }
}

module.exports = TestDescriptor_dao;