'use strict';
const dayjs = require('dayjs');

function RestockOrders_service(dao) {
    const db = dao;

    this.getAllRO = () => {
        return db.getAllRO();
        // return db.getAllRO().then(
        //     (rows) => {
        //         return new Promise(async (resolve, reject) => {
        //             if (rows === undefined) {
        //                 reject(500);
        //             }
        //             const list = await Promise.all(rows.map(async (row) => {
        //                 var products = [];
        //                 if (row.products) {
        //                     //each row must retrieve the products
        //                     const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
        //                     //retrieve the array of products
        //                     products = await Promise.all(IDs.map(async (id) => {
        //                         const product = db.getProduct(id).then(p => {
        //                             return {
        //                                 SKUId: p.id,
        //                                 description: p.description,
        //                                 price: p.price,
        //                                 qty: p.availableQuantity
        //                             };
        //                         }).catch(e => undefined);
        //                         return product;
        //                     }));
        //                 }

        //                 var skuItems = [];
        //                 if (row.skuItems) {
        //                     const SKUItemsIDs = row.skuItems.split(','); // array of strings with RFIDs 
        //                     skuItems = await Promise.all(SKUItemsIDs.map(async (rfid) => {
        //                         const skuItem = db.getSKUItem(rfid).then(i => {
        //                             return {
        //                                 "SKUId": i.SKUId,
        //                                 "RFID": i.RFID
        //                             };
        //                         }).catch(e => undefined);
        //                         return skuItem;
        //                     }));
        //                 }

        //                 if (row.state !== "ISSUED") {
        //                     const transportNote = await db.getTransportDate(row.transportNoteID).catch(e => undefined);

        //                     return {
        //                         "id": row.id,
        //                         "issueDate": row.issueDate,
        //                         "state": row.state,
        //                         "products": products.filter(p => p !== undefined),
        //                         "supplierId": row.supplierID,
        //                         "transportNote": transportNote !== undefined ? { transportDate: transportNote.deliveryDate } : {},
        //                         "skuItems": row.state === 'DELIVERY' ? [] : skuItems.filter(i => i !== undefined)
        //                     }
        //                 }
        //                 return {
        //                     "id": row.id,
        //                     "issueDate": row.issueDate,
        //                     "state": row.state,
        //                     "products": products.filter(p => p !== undefined),
        //                     "supplierId": row.supplierID,
        //                     "skuItems": []
        //                 }
        //             }));
        //             resolve(list);
        //         })
        //     }
        // ).catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(err));
        //     }
        // );
    }

    this.getAllROIssued = () => {
        return db.getAllROIssued();
        // return db.getAllROIssued().then(
        //     (rows) => {
        //         return new Promise(async (resolve, reject) => {
        //             if (rows === undefined) {
        //                 reject(500);
        //             }
        //             const list = await Promise.all(rows.map(async (row) => {
        //                 var products = [];
        //                 if (row.products) {
        //                     //each row must retrieve the products
        //                     const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
        //                     //retrieve the array of products
        //                     products = await Promise.all(IDs.map(async (id) => {
        //                         const product = db.getProduct(id).then(p => {
        //                             return {
        //                                 SKUId: p.id,
        //                                 description: p.description,
        //                                 price: p.price,
        //                                 qty: p.availableQuantity
        //                             };
        //                         }).catch(e => undefined);
        //                         return product;
        //                     }));
        //                 }

        //                 return {
        //                     "id": row.id,
        //                     "issueDate": row.issueDate,
        //                     "state": row.state,
        //                     "products": products.filter(p => p !== undefined),
        //                     "supplierId": row.supplierID,
        //                     "skuItems": []
        //                 }
        //             }));
        //             resolve(list);
        //         })
        //     }
        // ).catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(err));
        //     }
        // );
    }

    this.getRO = (id) => {
        //TODO: id validation
        return db.getRO(id);
        // return db.getRO(id).then(
        //     (row) => {
        //         return new Promise((resolve, reject) => {
        //             if (row === undefined) {
        //                 reject(404);
        //             } else {
        //                 const ro = new Promise(async (resolve, reject) => {
        //                     var products = [];
        //                     if (row.products) {
        //                         const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
        //                         //retrieve the array of products
        //                         products = await Promise.all(IDs.map(async (id) => {
        //                             const product = db.getProduct(id).then(p => {
        //                                 return {
        //                                     SKUId: p.id,
        //                                     description: p.description,
        //                                     price: p.price,
        //                                     qty: p.availableQuantity
        //                                 };
        //                             }).catch(e => undefined);
        //                             return product;
        //                         }));
        //                     }

        //                     var skuItems = [];
        //                     if (row.skuItems) {
        //                         const SKUItemsIDs = row.skuItems.split(',');
        //                         skuItems = await Promise.all(SKUItemsIDs.map(async (rfid) => {
        //                             const skuItem = db.getSKUItem(rfid).then(i => {
        //                                 return {
        //                                     "SKUId": i.SKUId,
        //                                     "RFID": i.RFID
        //                                 }
        //                             }).catch(e => undefined);
        //                             return skuItem;
        //                         }))
        //                     }
        //                     const transportNote = await db.getTransportDate(row.transportNoteID).catch(e => undefined);
        //                     resolve({
        //                         "issueDate": row.issueDate,
        //                         "state": row.state,
        //                         "products": products.filter(p => p !== undefined),
        //                         "supplierId": row.supplierID,
        //                         "transportNote": transportNote !== undefined ? { transportDate: transportNote.deliveryDate } : {},
        //                         "skuItems": skuItems.filter(i => i !== undefined)
        //                     })
        //                 })
        //                 resolve(ro);
        //             }
        //         })
        //     }
        // ).catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(err));
        //     }
        // );
    }

    this.getROReturnedItems = (id) => {
        //TODO: id validation
        return new Promise(async (resolve, reject) => {
            const ro = await db.ROexists(id);
            if (ro === undefined) {
                reject(404);
            } else {
                resolve(ro);
            }
        }).then(
            () => {
                return db.getROReturnedItems(id);
            }
        )
        // return db.getROReturnedItems(id);
        // return db.getRO(id).then(
        //     (row) => {
        //         return new Promise(async (resolve, reject) => {
        //             if (row === undefined) {
        //                 reject(404);
        //             } else if (row.state !== 'COMPLETEDRETURN') {
        //                 reject(422);
        //             } else {
        //                 var skuItems = [];
        //                 if (row.skuItems) {
        //                     const SKUItemsIDs = row.skuItems.split(','); // array of strings with RFIDs 
        //                     skuItems = await Promise.all(SKUItemsIDs.map(async (rfid) => {
        //                         const skuItem = db.getSKUItem(rfid).then(i => {
        //                             return {
        //                                 "SKUId": i.SKUId,
        //                                 "RFID": i.RFID
        //                             }
        //                         }).catch(e => undefined);
        //                         return skuItem;
        //                     }));
        //                 }

        //                 resolve(skuItems);
        //             }
        //         })
        //     }
        // ).catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(err));
        //     }
        // );
    }

    this.addRO = (body) => {
        // TODO: body validation
        const date = dayjs(body.issueDate).format("YYYY-MM-DD HH:MM").toString();
        const supplierId = body.supplierId;
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => IDs.push(p.SKUId));
        IDs = IDs.toString();

        return db.insertRO(date, IDs, supplierId);
    }

    this.updateStateRO = (id, body) => {
        // TODO: id and body validation
        const newState = body.newState;
        return new Promise(async (resolve, reject) => {
            const ro = await db.ROexists(id);
            if (ro === undefined) {
                reject(404);
            } else {
                resolve(ro);
            }
        }).then(
            () => {
                return db.updateStateRO(id, newState)
            }
        )
        return db.updateStateRO(id, newState);
        // return db.getRO(id).then(
        //     (row) => {
        //         return new Promise((resolve, reject) => {
        //             if (row === undefined) {
        //                 reject(404);
        //             } else {
        //                 resolve(row);
        //             }
        //         })
        //     }
        // ).then(
        //     (row) => {
        //         return db.updateStateRO(id, newState);
        //     }
        // ).catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(err));
        //     }
        // );
    }

    this.addSkuItems = (id, body) => {
        // TODO: id and body validation
        const skuItems = body.skuItems;
        var RFIDs = String();
        for (let SkuItem of skuItems) {
            console.log(SkuItem.rfid);
            RFIDs += SkuItem.rfid + ",";
        }
        RFIDs = RFIDs.slice(0, RFIDs.length - 1);

        return new Promise(async (resolve, reject) => {
            const ro = await db.ROexists(id);
            if (ro === undefined) {
                reject(404);
            } else if(ro.state !== 'DELIVERED'){
                reject(422);
            } else {
                resolve(ro);
            }
        }).then(
            () => {
                return db.updateStateRO(id, newState)
            }
        )
        // return db.getRO(id).then(
        //     (row) => {
        //         return new Promise((resolve, reject) => {
        //             if (row === undefined) {
        //                 reject(404);
        //             } else if (row.state !== 'DELIVERED') {
        //                 reject(422);
        //             } else {
        //                 resolve(row);
        //             }
        //         })
        //     }
        // ).then(
        //     (row) => {
        //         var RFIDs = String();
        //         for (let SkuItem of skuItems) {
        //             console.log(SkuItem.rfid);
        //             RFIDs += SkuItem.rfid + ",";
        //         }
        //         RFIDs = RFIDs.slice(0, RFIDs.length - 1);
        //         return db.addSkuItems(id, RFIDs);
        //     }
        // )
    }

    this.addTransportNote = (id, body) => {
        // TODO: id and body validation
        const date = dayjs(body.transportNote.deliveryDate).format("YYYY-MM-DD").toString();

        return new Promise(async (resolve, reject) => {
            const ro = await db.ROexists(id);
            if (ro === undefined) {
                reject(404);
            } else if(ro.state !== 'DELIVERY' || dayjs(date).isBefore(dayjs(ro.issueDate))){
                reject(422);
            } else {
                resolve(ro);
            }
        }).then(
            () => {
                return db.insertTransportNote(date);
            }
        ).then(
            (row) => {
                return db.updateSKUNote(id, row.max);
            }
        )

        // return db.getRO(id).then(
        //     (row) => {
        //         return new Promise((resolve, reject) => {
        //             if (row === undefined) {
        //                 reject(404);
        //             } else if (row.state !== 'DELIVERED' || dayjs(date).isBefore(row.issueDate)) {
        //                 reject(422);
        //             } else {
        //                 resolve(row);
        //             }
        //         })
        //     }
        // ).then(
        //     () => {
        //         return db.insertTransportNote(date);
        //     }
        // ).then(
        //     () => {
        //         return db.getTransportNoteID();
        //     }
        // ).then(
        //     (row) => {
        //         return db.updateSKUNote(id, row.max);
        //     }
        // )
    }

    this.deleteRO = (id) => {
        // TODO: id validation
        return db.deleteRO(id);
    }

}

module.exports = RestockOrders_service;