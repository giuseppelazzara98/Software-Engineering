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
        console.log("RO: Connected to DB");

    });

    this.getAllRO = () => {
        const query = 'SELECT * FROM restockOrders';
        return new Promise((resolve, reject) => {
            roDB.all(query, async (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    //rows is an array of restock orders
                    const list = await Promise.all(rows.map(async (row) => {
                        //each row must retrieve the products
                        const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                        //retrieve the array of products
                        const products = await Promise.all(IDs.map(async (id) => {
                            const product = this.getProduct(id).then(p => p).catch(e => undefined);
                            return product;
                        }));

                        const SKUItemsIDs = row.skuItems.split(',').map(e => parseInt(e));
                        const skuItems = await Promise.all(SKUItemsIDs.map(async (id) => {
                            const skuItem = this.getSKUItem(id).then(i => i).catch(e => undefined);
                            return skuItem;
                        }))

                        if (row.state !== "ISSUED") {
                            return {
                                "id": row.id,
                                "issueDate": row.issueDate,
                                "state": row.state,
                                "products": products.filter(p => p !== undefined),
                                "supplierId": row.supplierID,
                                "transportNote": row.transportDate ? { "deliveryDate": row.transportDate } : null,
                                "skuItems": skuItems.filter(i => i !== undefined)
                            }
                        }
                        return {
                            "id": row.id,
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "supplierId": row.supplierID,
                            "skuItems": skuItems.filter(i => i !== undefined)
                        }
                    }));

                    resolve(list);
                }
            })
        });
    };

    this.getProduct = (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT id, description, price, availableQuantity FROM SKUs WHERE id=?";
            roDB.get(query, [id], (err, row) => {
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
    }

    this.getSKUItem = (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT RFID, SKUId FROM SKUItems WHERE id=?";
            roDB.get(query, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else if (row === undefined) {
                    reject(404);
                } else {
                    resolve({
                        "SKUId": row.SKUId,
                        "RFID": row.RFID
                    })
                }
            })
        })
    }

    this.getAllROIssued = () => {
        const query = 'SELECT * FROM restockOrders WHERE state="ISSUED"';
        return new Promise((resolve, reject) => {
            roDB.all(query, async (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    //rows is an array of restock orders
                    const list = await Promise.all(rows.map(async (row) => {
                        //each row must retrieve the products
                        const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                        //retrieve the array of products
                        const products = await Promise.all(IDs.map(async (id) => {
                            const product = this.getProduct(id).then(p => p).catch(e => undefined);
                            return product;
                        }));

                        return {
                            "id": row.id,
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "supplierId": row.supplierID,
                            "skuItems": []
                        }
                    }));

                    resolve(list);
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
                    //to do: retrieve products and skuitems
                    const ro = new Promise(async (resolve, reject) => {
                        const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                        //retrieve the array of products
                        const products = await Promise.all(IDs.map(async (id) => {
                            const product = this.getProduct(id).then(p => p).catch(e => undefined);
                            return product;
                        }));

                        const SKUItemsIDs = row.skuItems.split(',').map(e => parseInt(e));
                        const skuItems = await Promise.all(SKUItemsIDs.map(async (id) => {
                            const skuItem = this.getSKUItem(id).then(i => i).catch(e => undefined);
                            return skuItem;
                        }))
                        resolve({
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "supplierId": row.supplierID,
                            "transportNote": row.transportDate ? { "deliveryDate": row.transportDate } : null,
                            "skuItems": skuItems.filter(i => i !== undefined)
                        })
                    })
                    resolve(ro);
                }
            })
        })
    }

    this.getROReturnedItems = async (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT state, SKUItems FROM restockOrders WHERE id=?";
            roDB.get(query, [id], async (err, row) => {
                if (err) {
                    reject(500);
                } else if (row === undefined) {
                    reject(404);
                } else if (row.state !== "COMPLETEDRETURN") {
                    reject(422);
                } else {
                    const SKUItemsIDs = row.skuItems.split(',').map(e => parseInt(e));
                    const skuItems = await Promise.all(SKUItemsIDs.map(async (id) => {
                        const skuItem = this.getSKUItem(id).then(i => i).catch(e => undefined);
                        return skuItem;
                    }))
                    resolve(skuItems);
                }
            })
        })
    }

    this.addRO = async (body) => {
        const date = dayjs(body.issueDate).format("YYYY-MM-DD HH:MM").toString(); // TODO: check date is correct
        const supplierId = body.supplierId;
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => IDs.push(p.SKUId));
        IDs = IDs.toString();
        const query = 'INSERT INTO restockOrders(issuedDate, state, products, supplierID) VALUES(?, "ISSUED", ?, ?)';

        return new Promise((resolve, reject) => {
            roDB.run(query, [date, IDs, supplierId], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(201);
                }
            })
        })


    }

    this.updateStateRO = (id, newState) => {
        this.getRO(id).then(
            (ro) => {
                if (ro === undefined) {
                    return new Promise((resolve, reject) => {
                        reject(404);
                    })
                }
                return new Promise((resolve, reject) => {
                    const query = 'UPDATE restockOrders SET state=? WHERE id=?';
                    roDB.run(query, [newState, id], (err) => {
                        if (err) {
                            reject(503);
                        } else {
                            resolve(200);
                        }
                    })
                })
            }
        ).catch(() => new Promise((resolve, reject) => reject(503)));
    }

    this.addSkuItems = async (id, skuItems) => {
        this.getRO(id).then(
            (row) => {
                return new Promise((resolve, reject) => {
                    if (row === undefined) {
                        reject(404);
                    } else if (row.state !== "DELIVERED") {
                        reject(422);
                    }
                    var IDs = Array();
                    skuItems.forEach(i => IDs.push(i.SKUId));
                    IDs = IDs.toString();
                    const query = 'UPDATE restockOrders SET skuItems=? WHERE id=?';
                    roDB.run(query, [IDs, id], (err) => {
                        if (err) {
                            reject(503);
                        } else {
                            resolve(200);
                        }
                    })
                })

            }
        ).catch()
    }

    this.addTransportNote = async (id, body) => {
        const date = dayjs(body.deliveryDate).format("YYYY-MM-DD").toString();
        this.getRO(id).then(
            (ro) => {
                return new Promise((resolve, reject) => {
                    if (ro === undefined) {
                        reject(404);
                    } else if (ro !== 'DELIVERED' || dayjs(date).isBefore(ro.issueDate)) {
                        reject(422);
                    }
                    const query = 'UPDATE restockOrders SET transportDate=? WHERE id=?';
                    roDB.run(query, [date, id], (err) => {
                        if (err) {
                            reject(503);
                        } else {
                            resolve(200);
                        }
                    })
                })
            }
        ).catch((err) => new Promise((resolve, reject) => reject(500)));
    }

    this.deleteRO = (id) => {
        const query = 'DELETE FROM restockOrders WHERE id=?';

        return new Promise((resolve, reject) => {
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