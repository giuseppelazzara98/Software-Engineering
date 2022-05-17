'use strict';
const sqlite = require('sqlite3');

function TestDescriptor_dao() {
    const tdDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }

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

    this.insertTD = (name, procedure, idSKU) => {
        return new Promise((resolve, reject) => {
            const query_add = 'INSERT into testDescriptors(name, procedureDescription, idSKU) VALUES(?, ?, ?)';
            tdDB.run(query_add, [name, procedure, idSKU], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(201);
                }
            })
        })
    }

    this.getSKU = (idSKU) => {
        return new Promise((resolve, reject) => {
            const query_SKU = 'SELECT * FROM SKUs WHERE id=?';
            tdDB.get(query_SKU, [idSKU], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.updateTD = (id, newName, newProcedure, newIdSKU) => {
        return new Promise((resolve, reject) => {
            const query_update = 'UPDATE testDescriptors SET name=?, procedureDescription=?, idSKU=? WHERE id=?';
            tdDB.run(query_update, [newName, newProcedure, newIdSKU, id], (err) => {
                if (err) {
                    reject(503)
                } else {
                    resolve(200);
                }
            })
        })
    }
    
    this.updateSKUTestDescriptors = (id, tests) => {
        return new Promise((resolve, reject) => {
            const update = 'UPDATE SKUs SET testDescriptors=? WHERE id=?';
            tdDB.run(update, [tests, id], (err) => {
                if (err) {
                    reject(503)
                }
                resolve(204)
            })
        })
    }

    this.deleteTD = (id) => {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM testDescriptors WHERE id=?";
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