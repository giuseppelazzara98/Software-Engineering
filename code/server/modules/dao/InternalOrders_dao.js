'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function internalOrders_dao() {
    //Internal Orders
    const ioDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
    });

    this.getAllIO = () => {
        const query_all = 'SELECT * FROM internalOrders';
        return new Promise((resolve, reject) => {
            ioDB.all(query_all, async (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    //rows is an array of internal orders
                    const list = await Promise.all(rows.map(async (row) => {
                        //each row must retrieve the products
                        const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                        //retrieve the array of products
                        const products = await Promise.all(IDs.map(async (id) => {
                            const product = this.getProduct(id, row.state).then(p => p).catch(e => undefined);
                            return product;
                        }));
                        return {
                            "id": row.id,
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "customerID": row.customerID
                        }
                    }));

                    resolve(list);
                }
            })
        })
    }

    this.getProduct = (id, state) => {
        if (state !== "COMPLETED") {
            return new Promise((resolve, reject) => {
                const query = "SELECT id, description, price, availableQuantity FROM SKUs WHERE id=?";
                ioDB.get(query, [id], (err, row) => {
                    if (err) {
                        reject(500);
                    } else if (row === undefined) {
                        reject(404);
                    } else {
                        resolve({
                            SKUId: row.id,
                            description: row.description,
                            price: row.price,
                            qty: row.availableQuantity
                        })
                    }
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                const query = "SELECT id, description, price, RFID FROM SKUs INNER JOIN SKUItems on SKUs.id=SKUItems.SKUId WHERE SKUs.id=?";
                ioDB.get(query, [id], (err, row) => {
                    if (err) {
                        reject(500);
                    } else if (row === undefined) {
                        reject(404);
                    } else {
                        resolve({
                            SKUId: row.id,
                            description: row.description,
                            price: row.price,
                            RFID: row.RFID
                        })
                    }
                })
            })
        }
    }

    this.getAllIOIssued = () => {
        const query_issued = 'SELECT * FROM internalOrders WHERE state="ISSUED"';
        return new Promise((resolve, reject) => {
            ioDB.all(query_issued, async (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const list = await Promise.all(rows.map(async (row) => {
                        //each row must retrieve the products
                        const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                        //retrieve the array of products
                        const products = await Promise.all(IDs.map(async (id) => {
                            const product = this.getProduct(id, row.state).then(p => p).catch(e => undefined);
                            return product;
                        }));
                        return {
                            "id": row.id,
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "customerID": row.customerID
                        }
                    }));

                    resolve(list);
                }
            })
        });
    };

    this.getAllIOAccepted = () => {
        const query_issued = 'SELECT * FROM internalOrders WHERE state="ACCEPTED"';
        return new Promise((resolve, reject) => {
            ioDB.all(query_issued, async (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const list = await Promise.all(rows.map(async (row) => {
                        //each row must retrieve the products
                        const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                        //retrieve the array of products
                        const products = await Promise.all(IDs.map(async (id) => {
                            const product = this.getProduct(id, row.state).then(p => p).catch(e => undefined);
                            return product;
                        }));
                        return {
                            "id": row.id,
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "customerID": row.customerID
                        }
                    }));

                    resolve(list);
                }
            })
        });
    };

    this.getIO = (id) => {
        const query = 'SELECT * FROM internalOrders WHERE id=?';
        return new Promise((resolve, reject) => {
            ioDB.get(query, [id], async (err, row) => {
                if (err) {
                    reject(500);
                } else if (row === undefined) {
                    reject(404);
                } else {
                    const io = new Promise(async (resolve, reject) => {
                        const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                        //retrieve the array of products
                        const products = await Promise.all(IDs.map(async (id) => {
                            const product = this.getProduct(id, row.state).then(p => p).catch(e => undefined);
                            return product;
                        }));
                        resolve({
                            "id": row.id,
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "customerID": row.customerID
                        })
                    });

                    resolve(io);
                }
            })
        })
    };

    this.addIO = async (body) => {
        const query_insert = 'INSERT INTO internalOrders(issueDate, state, products, customerID) VALUES(?, "ISSUED", ?, ?)';
        const date = dayjs(body.issueDate).format("YYYY-MM-DD HH:MM").toString(); //date is in ISO8601 format supported by SQLite 
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => IDs.push(p.SKUId));
        IDs = IDs.toString();
        const customerID = body.customerId;

        return new Promise((resolve, reject) => {
            ioDB.run(query_insert, [date, IDs, customerID], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(201);
                }
            })
        })
    };

    this.updateStateIO = async (id, body) => {
        const newState = body.newState;
        const result = await this.getIO(id);
        if (result === 500 || result === undefined) {
            return new Promise((resolve, reject) => {
                reject(404);
            })
        }

        if (newState !== 'COMPLETED') {
            const query = 'UPDATE internalOrders SET state=? WHERE id=?';
            return new Promise((resolve, reject) => {
                ioDB.run(query, [newState, id], (err) => {
                    if (err) {
                        reject(500);
                    } else {
                        resolve(200);
                    }
                });
            })
        } else {
            const query = 'UPDATE internalOrders SET state=?, products=? WHERE id=?';
            if (body.products === undefined) {
                return new Promise((resolve, reject) => {
                    reject(422);
                })
            }
            const products = [...body.products];
            var IDs = Array();
            products.forEach(p => { IDs.push(p.SKUId) });
            IDs = IDs.toString();
            return new Promise((resolve, reject) => {
                ioDB.run(query, [newState, IDs, id], (err) => {
                    if (err) {
                        reject(500);
                    } else {
                        resolve(200);
                    }
                });
            })
        }
    };

    this.deleteIO = (id) => {
        const query = 'DELETE FROM internalOrders WHERE id=?';
        return new Promise((resolve, reject) => {
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