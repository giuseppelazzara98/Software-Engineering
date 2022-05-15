'use strict';
//Data Access Object
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function SKU_dao() {
    
    const SKUDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
        console.log("Connected to DB");

    });
    this.getSKUs=()=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUs';
            SKUDB.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const sku = rows.map((r) => (
                    {  
                       id:r.id,
                       description:r.description,
                       weight:r.weight,
                       volume:r.volume,
                       notes:r.notes,
                       position:r.position,
                       availableQuantity:r.availableQuantity,
                       price:r.price,
                       testDescriptors:r.testDescriptors
                    }
                ));
                resolve(sku);
            });
        });


    }
    this.getSKUsID=(id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUs WHERE id=?';
            SKUDB.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const sku = rows.map((r) => (
                    {  
                       id:r.id,
                       description:r.description,
                       weight:r.weight,
                       volume:r.volume,
                       notes:r.notes,
                       position:r.position,
                       availableQuantity:r.availableQuantity,
                       price:r.price,
                       testDescriptors:r.testDescriptors
                    }
                ));
                resolve(sku);
            });
        });

    }
    this.postSku=(data)=>{
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO SKUs(id,description,weight,volume,notes,position,price,availableQuantity,testDescriptors) VALUES(?,?, ?, ?, ?, ?, ?,?,?)';
            SKUDB.run(sql, [data.id,data.description, data.weight, data.volume,data.notes,0,data.price,data.availableQuantity,''], (err) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(true);
            });
        });

    }
    this.checkPosition=(id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT maxWeight,maxVolume,occupiedWeight,occupiedVolume FROM POSITION P,SKU S WHERE P.id=S.position AND S.id=?';
            SKUDB.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const info = rows.map((r) => (
                    {  
                       maxWeight:r.maxWeight,
                       maxVolume:r.maxVolume,
                       occupiedWeight:r.occupiedWeight,
                       occupiedVolume:r.occupiedVolume
                    }
                ));
                resolve(info);
            });
        });
    }

    this.putSku=(data,id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE SKUs SET (description,weight,volume,notes,price,availableQuantity) VALUES(?, ?, ?, ?, ?, ?) WHERE id=?';
            SKUDB.run(sql, [data.newDescription, data.newWeight, data.newVolume,data.newNotes,data.newPrice,data.newAvailableQuantity,id], (err) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(true);
            });
        });
        

    }
    this.putSkuPosition=(id,position)=>{

    }
    this.deleteSKU=(id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM SKUs WHERE ID=?';
            SKUDB.run(sql, [id], (err) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(true);
            });
        });


    }
}

module.exports= SKU_dao;