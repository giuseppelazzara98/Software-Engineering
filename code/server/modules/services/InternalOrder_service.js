'use strict';
const dayjs = require('dayjs');

function InternalOrder_service(dao) {
    this.dao = dao;

    this.getAllIO = () => {
        return dao.getAllIO();
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
        return dao.getAllIOIssued();
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
        return dao.getAllIOAccepted();
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
        return dao.getIO(id);
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
        if(!body.issueDate){
            return Promise.reject(422);
        }
        const date = dayjs(body.issueDate).format("YYYY-MM-DD HH:MM").toString(); //date is in ISO8601 format supported by SQLite 
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => IDs.push(p.SKUId));
        IDs = IDs.toString();
        const customerID = body.customerId;
        return dao.insertIO(date, IDs, customerID);
    }

    this.updateStateIO = (id, body) => {
        // TODO: id and body validation
        const newState = body.newState;
        var IDs = "";
        if(body.products){
            
            const products = [...body.products];
            // console.log(products);
            IDs = products.map(e => e.SkuID).toString();
        } else {
            if(newState === "COMPLETED"){
                return Promise.reject(422);
            }
            IDs = "";
        }
        
        // console.log(IDs);
        return new Promise(async (resolve, reject) => {
            const io = await dao.IOexists(id);
            if( io === undefined){
                reject(404);
            } else {
                resolve(io);
            }
        }).then(
            () => {
                return dao.updateStateIO(id, newState, IDs);
            }
        );
        // return db.updateStateIO(id, newState, IDs);
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