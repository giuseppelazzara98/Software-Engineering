'use strict';
const dayjs = require('dayjs');

function InternalOrder_service(dao) {
    const db = dao;

    this.getAllIO = () => {
        return db.getAllIO();
        // return db.getAllIO().then(
        //     (rows) => {
        //         return new Promise(async (resolve, reject) => {
        //             const list = await Promise.all(rows.map(async (row) => {
        //                 //each row must retrieve the products
        //                 var products = [];
        //                 if (row.products) {
        //                     const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
        //                     //retrieve the array of products
        //                     products = await Promise.all(IDs.map(async (id) => {
        //                         const product = db.getProduct(id, row.state).then(p => {
        //                             if (row.state !== 'COMPLETED') {
        //                                 return {
        //                                     SKUId: p.id,
        //                                     description: p.description,
        //                                     price: p.price,
        //                                     qty: p.availableQuantity
        //                                 }
        //                             } else {
        //                                 return {
        //                                     SKUId: p.id,
        //                                     description: p.description,
        //                                     price: p.price,
        //                                     RFID: p.RFID
        //                                 }
        //                             }
        //                         }).catch(e => undefined);
        //                         return product;
        //                     }));
        //                     return {
        //                         "id": row.id,
        //                         "issueDate": row.issueDate,
        //                         "state": row.state,
        //                         "products": products.filter(p => p !== undefined),
        //                         "customerID": row.customerID
        //                     }
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

    this.getAllIOIssued = () => {
        return db.getAllIOIssued();
        // return db.getAllIOIssued().then(
        //     (rows) => {
        //         return new Promise(async (resolve, reject) => {
        //             const list = await Promise.all(rows.map(async (row) => {
        //                 //each row must retrieve the products
        //                 var products = [];
        //                 if (row.products) {
        //                     const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
        //                     //retrieve the array of products
        //                     products = await Promise.all(IDs.map(async (id) => {
        //                         const product = db.getProduct(id, row.state).then(p => {
        //                             return {
        //                                 SKUId: p.id,
        //                                 description: p.description,
        //                                 price: p.price,
        //                                 qty: p.availableQuantity
        //                             }
        //                         }).catch(e => undefined);
        //                         return product;
        //                     }));
        //                     return {
        //                         "id": row.id,
        //                         "issueDate": row.issueDate,
        //                         "state": row.state,
        //                         "products": products.filter(p => p !== undefined),
        //                         "customerID": row.customerID
        //                     }
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

    this.getAllIOAccepted = () => {
        return db.getAllIOAccepted();
        // return db.getAllIOAccepted().then(
        //     (rows) => {
        //         return new Promise(async (resolve, reject) => {
        //             const list = await Promise.all(rows.map(async (row) => {
        //                 //each row must retrieve the products
        //                 var products = [];
        //                 if (row.products) {
        //                     const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
        //                     //retrieve the array of products
        //                     products = await Promise.all(IDs.map(async (id) => {
        //                         const product = db.getProduct(id, row.state).then(p => {
        //                             return {
        //                                 SKUId: p.id,
        //                                 description: p.description,
        //                                 price: p.price,
        //                                 qty: p.availableQuantity
        //                             }
        //                         }).catch(e => undefined);
        //                         return product;
        //                     }));
        //                     return {
        //                         "id": row.id,
        //                         "issueDate": row.issueDate,
        //                         "state": row.state,
        //                         "products": products.filter(p => p !== undefined),
        //                         "customerID": row.customerID
        //                     }
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

    this.getIO = (id) => {
        // TODO: validation on id
        return db.getIO(id);
        // return db.getIO(id).then(
        //     (row) => {
        //         return new Promise((resolve, reject) => {
        //             if (row === undefined) {
        //                 reject(404);
        //             } else {
        //                 const io = new Promise(async (resolve, reject) => {
        //                     var products = [];
        //                     if (row.products) {
        //                         const IDs = row.products.split(',').map(e => parseInt(e)); //array of INT of product IDs
        //                         //retrieve the array of products
        //                         console.log(IDs);
        //                         products = await Promise.all(IDs.map(async (SKUid) => {
        //                             console.log(SKUid);
        //                             const product = db.getProduct(SKUid, row.state).then(p => {
        //                                 return {
        //                                     SKUId: p.id,
        //                                     description: p.description,
        //                                     price: p.price,
        //                                     qty: p.availableQuantity
        //                                 }
        //                             }).catch(e => undefined);
        //                             return product;
        //                         }));
        //                         console.log(products);
        //                     }
        //                     resolve({
        //                         "id": row.id,
        //                         "issueDate": row.issueDate,
        //                         "state": row.state,
        //                         "products": products.filter(p => p !== undefined),
        //                         "customerID": row.customerID
        //                     })
        //                 });

        //                 resolve(io);
        //             }
        //         })
        //     }
        // ).catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(err));
        //     }
        // );
    }

    this.addIO = (body) => {
        // TODO: body validation
        const date = dayjs(body.issueDate).format("YYYY-MM-DD HH:MM").toString(); //date is in ISO8601 format supported by SQLite 
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => IDs.push(p.SKUId));
        IDs = IDs.toString();
        const customerID = body.customerId;
        return db.insertIO(date, IDs, customerID);
    }

    this.updateStateIO = (id, body) => {
        // TODO: id and body validation
        const newState = body.newState;
        const products = [...body.products];
        // console.log(products);
        const IDs = products.map(e => e.SkuID).toString();
        // console.log(IDs);
        return new Promise(async (resolve, reject) => {
            const io = await db.IOexists(id);
            if( io === undefined){
                reject(404);
            } else {
                resolve(io);
            }
        }).then(
            () => {
                return db.updateStateIO(id, newState, IDs);
            }
        );
        return db.updateStateIO(id, newState, IDs);
        // return db.getIO(id).then(
        //     (row) => {
        //         return new Promise((resolve, reject) => {
        //             if(row === undefined){
        //                 reject(404);
        //             } else {
        //                 resolve(db.updateStateIO(id, newState, IDs));
        //             }
        //         })
        //     }
        // )
        // .catch(
        //     (err) => {
        //         return new Promise((resolve, reject) => reject(err));
        //     }
        // );
    }

    this.deleteIO = (id) => {
        // TODO: id validation 
        return db.deleteIO(id);
    }
}

module.exports = InternalOrder_service;