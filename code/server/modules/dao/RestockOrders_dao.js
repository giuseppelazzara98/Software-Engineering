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
                    const list = await Promise.all(rows.map(async (row) => {
                        // console.log(row);
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
                                "issueDate": row.issueDate,
                                "state": row.state,
                                "products": products.filter(p => p !== undefined),
                                "supplierId": row.supplierID,
                                "transportNote": transportNote !== undefined ? { 'transportDate': transportNote.deliveryDate } : {},
                                "skuItems": row.state === 'DELIVERY' ? [] : skuItems.filter(i => i !== undefined)
                            }
                        }
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
                    // resolve(rows);
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

    this.getTransportNote = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM transportNote WHERE id=?';
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
            roDB.all(query, async (err, rows) => {
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
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "supplierId": row.supplierID,
                            "skuItems": []
                        }
                    }));
                    resolve(list);
                    // resolve(rows);
                }
            })
        })
    }

    this.ROexists = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders WHERE id=?';
            roDB.get(query, [id], (err, row) => {
                if(err){
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
            roDB.get(query, [id], (err, row) => {
                if (err) {
                    reject(500);
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
                            "issueDate": row.issueDate,
                            "state": row.state,
                            "products": products.filter(p => p !== undefined),
                            "supplierId": row.supplierID,
                            "transportNote": transportNote !== undefined ? { transportDate: transportNote.deliveryDate } : {},
                            "skuItems": skuItems.filter(i => i !== undefined)
                        })
                    })
                    resolve(ro);
                    // resolve(row);
                }
            })
        })
    }

    this.getROReturnedItems = (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM restockOrders WHERE id=?';
            roDB.get(query, [id], async (err, row) => {
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
        // return this.getRO(id).then(
        //     (row) => {
        //         // console.log(row);
                
        //     }
        // )
    }

    this.insertRO = async (date, IDs, supplierId) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO restockOrders(issueDate, state, products, supplierID) VALUES(?, "ISSUED", ?, ?)';
            roDB.run(query, [date, IDs, supplierId], (err) => {
                if (err) {
                    // console.log(err);
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
        // return this.getRO(id).then(
        //     () => {
                
        //     }
        // )
        
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
            roDB.run(query, [date], (err) => {
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
            roDB.get(query, (err, row) => {
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
            roDB.run(query, [noteID, id], (err) => {
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