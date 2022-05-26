'use strict';
//Data Access Object
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function RestockOrders_dao() {
    // Restock Order 
    const db = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
    }
);


    this.getAllRO = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders';
            db.all(query, async (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    const list = await Promise.all(rows.map(async (row) => {
                        var products = [];
                        if (row.products) {
                            //each row must retrieve the products
                            const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                            //retrieve the array of products
                            products = await Promise.all(IDs.map(async (id) => {
                                const product = this.getProduct(id).then(p => {
                                    return {
                                        SKUId: p.id,
                                        description: p.description,
                                        price: p.price,
                                        qty: p.availableQuantity
                                    };
                                }).catch(e => undefined);
                                return product;
                            }));
                        }

                        var skuItems = [];
                        if (row.skuItems) {
                            const SKUItemsIDs = row.skuItems.split(','); // array of strings with RFIDs 
                            skuItems = await Promise.all(SKUItemsIDs.map(async (rfid) => {
                                const skuItem = this.getSKUItem(rfid).then(i => {
                                    return {
                                        "SKUId": i.SKUId,
                                        "RFID": i.RFID
                                    };
                                }).catch(e => undefined);
                                return skuItem;
                            }));
                        }

                        if (row.state !== "ISSUED") {
                            const transportNote = await this.getTransportNote(row.transportNoteID).catch(e => undefined);
                            return {
                                "id": row.id,
                                "issueDate": dayjs(row.issueDate).format('YYYY/MM/DD HH:MM').toString(),
                                "state": row.state,
                                "products": products.filter(p => p !== undefined),
                                "supplierId": row.supplierID,
                                "transportNote": transportNote !== undefined ? { 'transportDate': dayjs(transportNote.deliveryDate).format('YYYY/MM/DD').toString() } : {},
                                "skuItems": row.state === 'DELIVERY' ? [] : skuItems.filter(i => i !== undefined)
                            }
                        }
                        return {
                            "id": row.id,
                            "issueDate": dayjs(row.issueDate).format('YYYY/MM/DD HH:MM').toString(),
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "supplierId": row.supplierID,
                            "skuItems": []
                        }
                    }));
                    resolve(list);
                }
            });
        })
    };

    this.getProduct = (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM SKUs WHERE id=?";
            db.get(query, [id], (err, row) => {
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
            db.get(query, [rfid], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.getTransportNote = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM transportNote WHERE id=?';
            db.get(query, [id], (err, row) => {
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
            db.all(query, async (err, rows) => {
                if (err) {
                    reject(500);
                } else {
                    const list = await Promise.all(rows.map(async (row) => {
                        var products = [];
                        if (row.products) {
                            //each row must retrieve the products
                            const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                            //retrieve the array of products
                            products = await Promise.all(IDs.map(async (id) => {
                                const product = this.getProduct(id).then(p => {
                                    return {
                                        SKUId: p.id,
                                        description: p.description,
                                        price: p.price,
                                        qty: p.availableQuantity
                                    };
                                }).catch(e => undefined);
                                return product;
                            }));
                        }

                        return {
                            "id": row.id,
                            "issueDate": dayjs(row.issueDate).format('YYYY/MM/DD HH:MM').toString(),
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

    this.ROexists = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders WHERE id=?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else {
                    resolve(row);
                }
            })
        })
    }

    this.getRO = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders WHERE id=?';
            db.get(query, [id], (err, row) => {
                if (err) {
                    reject(500);
                } else if (row === undefined) {
                    reject(404);
                } else {
                    const ro = new Promise(async (resolve, reject) => {
                        var products = [];
                        if (row.products) {
                            const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
                            //retrieve the array of products
                            products = await Promise.all(IDs.map(async (id) => {
                                const product = this.getProduct(id).then(p => {
                                    return {
                                        SKUId: p.id,
                                        description: p.description,
                                        price: p.price,
                                        qty: p.availableQuantity
                                    };
                                }).catch(e => undefined);
                                return product;
                            }));
                        }

                        var skuItems = [];
                        if (row.skuItems) {
                            const SKUItemsIDs = row.skuItems.split(',');
                            skuItems = await Promise.all(SKUItemsIDs.map(async (rfid) => {
                                const skuItem = this.getSKUItem(rfid).then(i => {
                                    return {
                                        "SKUId": i.SKUId,
                                        "RFID": i.RFID
                                    }
                                }).catch(e => undefined);
                                return skuItem;
                            }))
                        }
                        const transportNote = await this.getTransportNote(row.transportNoteID).catch(e => undefined);
                        resolve({
                            "issueDate": dayjs(row.issueDate).format('YYYY/MM/DD HH:MM').toString(),
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "supplierId": row.supplierID,
                            "transportNote": transportNote !== undefined ? { transportDate: dayjs(transportNote.deliveryDate).format("YYYY/MM/DD").toString() } : {},
                            "skuItems": skuItems.filter(i => i !== undefined)
                        })
                    })
                    resolve(ro);
                }
            })
        })
    }

    this.getROReturnedItems = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders WHERE id=?';
            db.get(query, [id], async (err, row) => {
                if (err) {
                    reject(503);
                } else if (row.state !== 'COMPLETEDRETURN') {
                    reject(422);
                } else {
                    var skuItems = [];
                    if (row.skuItems) {
                        const SKUItemsIDs = row.skuItems.split(','); // array of strings with RFIDs 
                        skuItems = await Promise.all(SKUItemsIDs.map(async (rfid) => {
                            const skuItem = this.getSKUItem(rfid).then(i => {
                                return {
                                    "SKUId": i.SKUId,
                                    "RFID": i.RFID
                                }
                            }).catch(e => undefined);
                            return skuItem;
                        }));
                    }
                    resolve(skuItems);
                }
            })

        })
    }

    this.insertRO = async (date, IDs, supplierId) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO restockOrders(issueDate, state, products, supplierID) VALUES(?, "ISSUED", ?, ?)';
            db.run(query, [date, IDs, supplierId], (err) => {
                if (err) {
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
            db.run(query, [newState, id], (err) => {
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
            db.run(query, [skuItems, id], (err) => {
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
            db.run(query, [date], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(200);
                }
            })
        }).then(
            () => {
                return this.getTransportNoteID();
            }
        )
    }

    this.getTransportNoteID = () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT MAX(id) AS max FROM transportNote';
            db.get(query, (err, row) => {
                if (err) {
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
            db.run(query, [noteID, id], (err) => {
                if (err) {
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
            db.run(query, [id], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(204);
                }
            })
        })
    }
    this.addNewROForTest = async (id, date, IDs, supplierId) => {
        return new Promise((resolve, reject) => {
            const query =
                'INSERT INTO restockOrders(id, issueDate, state, products, supplierID) VALUES(?,?, "COMPLETEDRETURN", ?, ?)';
            db.run(query, [id, date, IDs, supplierId], (err) => {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    };

    this.deleteAll = () => {
        const sql = "DELETE FROM restockOrders";
        return new Promise((resolve, reject) => {
            db.run(sql, [], (err) => {
                if (err) {
                    reject(503);
                } else {
                    resolve(204);
                }
            });
        });
    };
}


module.exports = RestockOrders_dao;
