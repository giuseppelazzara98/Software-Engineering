'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function InternalOrders_dao() {
    //Internal Orders
    const db = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
    });

    this.getAllIO = () => {
        return new Promise((resolve, reject) => {
            const query_all = 'SELECT * FROM internalOrders';
            db.all(query_all, (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(rows);
                }
            })
        }).then(
            (rows) => {
                return new Promise(async (resolve, reject) => {
                    const list = await Promise.all(rows.map(async (row) => {
                        //each row must retrieve the products
                        var products = [];
                        if (row.products) {
                            const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                            //retrieve the array of products
                            products = await Promise.all(IDs.map(async (id) => {
                                const product = this.getProduct(id, row.state).then(p => {
                                    if (row.state !== 'COMPLETED') {
                                        return {
                                            SKUId: p.id,
                                            description: p.description,
                                            price: p.price,
                                            qty: p.availableQuantity
                                        }
                                    } else {
                                        return {
                                            SKUId: p.id,
                                            description: p.description,
                                            price: p.price,
                                            RFID: p.RFID
                                        }
                                    }
                                }).catch(e => undefined);
                                return product;
                            }));
                            return {
                                "id": row.id,
                                "issueDate": dayjs(row.issueDate).format("YYYY/MM/DD HH:MM").toString(),
                                "state": row.state,
                                "products": products.filter(p => p !== undefined),
                                "customerID": row.customerID
                            }
                        }
                    }));

                    resolve(list);
                })
            }
        );
    }

    this.getProduct = (id, state) => {
        return new Promise((resolve, reject) => {
            const query1 = 'SELECT * FROM SKUs WHERE id=?';
            const query2 = 'SELECT * FROM SKUs INNER JOIN SKUItems on SKUs.id=SKUItems.SKUId WHERE SKUs.id=?'
            db.get(state !== 'COMPLETED' ? query1 : query2, [id], (err, row) => {
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
            db.all(query_issued, (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(rows);
                }
            })
        }).then(
            (rows) => {
                return new Promise(async (resolve, reject) => {
                    const list = await Promise.all(rows.map(async (row) => {
                        //each row must retrieve the products
                        var products = [];
                        if (row.products) {
                            const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                            //retrieve the array of products
                            products = await Promise.all(IDs.map(async (id) => {
                                const product = this.getProduct(id, row.state).then(p => {
                                    return {
                                        SKUId: p.id,
                                        description: p.description,
                                        price: p.price,
                                        qty: p.availableQuantity
                                    }
                                }).catch(e => undefined);
                                return product;
                            }));
                            return {
                                "id": row.id,
                                "issueDate": dayjs(row.issueDate).format("YYYY/MM/DD HH:MM").toString(),
                                "state": row.state,
                                "products": products.filter(p => p !== undefined),
                                "customerID": row.customerID
                            }
                        }
                    }));

                    resolve(list);
                })
            }
        );
    };

    this.getAllIOAccepted = () => {
        return new Promise((resolve, reject) => {
            const query_accepted = 'SELECT * FROM internalOrders WHERE state="ACCEPTED"';
            db.all(query_accepted, (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(rows);
                }
            })
        }).then(
            (rows) => {
                return new Promise(async (resolve, reject) => {
                    const list = await Promise.all(rows.map(async (row) => {
                        //each row must retrieve the products
                        var products = [];
                        if (row.products) {
                            const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                            //retrieve the array of products
                            products = await Promise.all(IDs.map(async (id) => {
                                const product = this.getProduct(id, row.state).then(p => {
                                    return {
                                        SKUId: p.id,
                                        description: p.description,
                                        price: p.price,
                                        qty: p.availableQuantity
                                    }
                                }).catch(e => undefined);
                                return product;
                            }));
                            return {
                                "id": row.id,
                                "issueDate": dayjs(row.issueDate).format("YYYY/MM/DD HH:MM").toString(),
                                "state": row.state,
                                "products": products.filter(p => p !== undefined),
                                "customerID": row.customerID
                            }
                        }
                    }));
                    resolve(list);
                })
            }
        );
    };


    this.getIO = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM internalOrders WHERE id=?';
            db.get(query, [id], async (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            });
        }).then(
            (row) => {
                return new Promise((resolve, reject) => {
                    if (row === undefined) {
                        reject(404);
                    } else {
                        const io = new Promise(async (resolve, reject) => {
                            var products = [];
                            if (row.products) {
                                const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                                //retrieve the array of products
                                // console.log(IDs);
                                products = await Promise.all(IDs.map(async (SKUid) => {
                                    // console.log(row.state);
                                    const product = this.getProduct(SKUid, row.state).then(p => {
                                        if (row.state !== 'COMPLETED') {
                                            return {
                                                SKUId: p.id,
                                                description: p.description,
                                                price: p.price,
                                                qty: p.availableQuantity
                                            }
                                        } else {
                                            return {
                                                SKUId: p.id,
                                                description: p.description,
                                                price: p.price,
                                                RFID: p.RFID
                                            }
                                        }
                                    }).catch(e => undefined);
                                    return product;
                                }));
                                // console.log(products);
                            }
                            resolve({
                                "id": row.id,
                                "issueDate": dayjs(row.issueDate).format("YYYY/MM/DD HH:MM").toString(),
                                "state": row.state,
                                "products": products.filter(p => p !== undefined),
                                "customerID": row.customerID
                            })
                        });

                        resolve(io);
                    }
                })
            }
        );
    };

    this.insertIO = async (date, IDs, customerID) => {
        return new Promise((resolve, reject) => {
            const query_insert = 'INSERT INTO internalOrders(issueDate, state, products, customerID) VALUES(?, "ISSUED", ?, ?)';
            db.run(query_insert, [date, IDs, customerID], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(201);
                }
            })
        })
    };

    this.IOexists = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM internalOrders WHERE id=?';
            db.get(query, [id], (err, row) => {
                if(err){
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.updateStateIO = async (id, newState, IDs) => {
        return new Promise((resolve, reject) => {
            if (newState !== 'COMPLETED') {
                const query = 'UPDATE internalOrders SET state=? WHERE id=?';
                db.run(query, [newState, id], (err) => {
                    if (err) {
                        reject(503);
                    } else {
                        resolve(200);
                    }
                })
            } else {
                const query = 'UPDATE internalOrders SET state=?, products=? WHERE id=?';
                db.run(query, [newState, IDs, id], (err) => {
                    if (err) {
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
            db.run(query, [id], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(204);
                }
            })
        })
    }
}




module.exports = InternalOrders_dao;