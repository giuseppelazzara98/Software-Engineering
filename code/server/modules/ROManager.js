'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function ROManager() {
    // Restock Order 
    const roDB = new sqlite.Database("./modules/database/restockOrders.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to roDB");
            throw err;
        }
        console.log("Connected to roDB");

    });

    this.getAllRO = () => {
        const query = 'SELECT * FROM restockOrders';
        return new Promise((resolve, reject) => {
            roDB.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        });
    };

    this.getAllROIssued = () => {
        const query = 'SELECT * FROM restockOrders WHERE state="ISSUED"';
        return new Promise((resolve, reject) => {
            roDB.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    this.getRO = (id) => {
        const query = 'SELECT * FROM restockOrders WHERE id=?';
        return new Promise((resolve, reject) => {
            roDB.get(query, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.getROReturnedItems = async (id) => {
        const IDs = await this.getSKUIDs(id);
        return new Promise((resolve, reject) => {
            if (IDs === undefined) {
                reject(404);
            } else if (IDs === 500 || IDs === 422) {
                reject(IDs);
            } else {
                //TODO: create the array with all the infos
                resolve(IDs);
            }

        })
    }

    this.getSKUIDs = async (id) => {
        const query = 'SELECT state, skuItems FROM restockOrders WHERE id=?';
        return new Promise((resolve, reject) => {
            roDB.get(query, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    if (row.state == 'COMPLETEDRETURN') reject(422);
                    resolve(row.skuItems);
                }
            })
        })
    }

    this.addRO = async (body) => {
        const date = body.issueDate; // TODO: check date is correct
        const supplierId = body.supplierId;
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => IDs.push(p.SKUId));
        IDs = IDs.toString();
        const query = 'INSERT INTO restockOrders(id, issuedDate, state, products, supplierID) VALUES(?, ?, "ISSUED", ?, ?)';
        
        const id = await this.getNextROID();

        return new Promise((resolve, reject) => {
            roDB.run(query, [id, date, IDs, supplierId], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(201);
                }
            })
        })


    }

    this.getNextROID = () => {
        const query_getID = 'SELECT MAX(id) AS max FROM restockOrders';
        return new Promise((resolve, reject) => {
            roDB.get(query_getID, (err, row) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(row.max + 1);
                }
            })
        })
    };

    this.updateStateRO = async (id, newState) => {
        const ro = await this.getRO(id);
        if(ro === undefined){
            return new Promise((resolve, reject) => {
                reject(404);
            })
        }
        return new Promise((resolve, reject) => {
            const query = 'UPDATE restockOrders SET state=? WHERE id=?';
            roDB.run(query, [newState, id], (err) => {
                if(err){
                    reject(503);
                } else {
                    resolve(200);
                }
            })
        })
    }

    this.addSkuItems = async (id, skuItems) =>{
        const ro = await this.getRO(id);
        if(ro === undefined){
            return new Promise((resolve, reject) => {
                reject(404);
            })
        } else if(ro.state !== "DELIVERED"){
            console.log(ro);
            return new Promise((resolve, reject) => {
                reject(422);
            })
        }

        var IDs = Array();
        skuItems.forEach(i => IDs.push(i.SKUId));
        IDs = IDs.toString();

        return new Promise((resolve, reject) => {
            const query = 'UPDATE restockOrders SET skuItems=? WHERE id=?';
            roDB.run(query, [IDs, id], (err) => {
                if(err){
                    reject(503);
                } else{
                    resolve(200);
                }
            })
        })
    }

    this.addTransportNote = async (id, date) => {
        const ro = await this.getRO(id);
        
        if(ro === undefined){
            return new Promise((resolve, reject) => {
                reject(404);
            })
        } else if(ro.state !== "DELIVERED" || dayjs(date).isBefore(ro.issuedDate)){
            return new Promise((resolve, reject) => {
                reject(422);
            })
        }
        
        return new Promise((resolve, reject) => {
            const query = 'UPDATE restockOrders SET transportDate=? WHERE id=?';
            roDB.run(query, [date, id], (err) => {
                if(err){
                    reject(503);
                } else {
                    resolve(200);
                }
            })
        })
    }

    this.deleteRO = (id) => {
        const query = 'DELETE FROM restockOrders WHERE id=?';
        
        return new Promise((resolve, reject) => {
            roDB.run(query, [id], (err) => {
                if(err){
                    reject(503);
                } else {
                    resolve(204);
                }
            })
        })
    }

}


module.exports = ROManager;