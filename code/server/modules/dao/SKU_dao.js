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
                    reject(new Promise( (resolve,reject)=> reject(500)));
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
            SKUDB.get(sql, [id], (err, r) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(500)));
                    return;
                }
                if (r===undefined){
                    reject(new Promise( (resolve,reject)=> reject(404)));
                    return;
                } 
                const sku =
                    {  
                       description:r.description,
                       weight:r.weight,
                       volume:r.volume,
                       notes:r.notes,
                       position:r.position,
                       availableQuantity:r.availableQuantity,
                       price:r.price,
                       testDescriptors:r.testDescriptors
                    }
                ;
                resolve(sku);
            });
        });

    }
    this.postSku=(data)=>{
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO SKUs(id,description,weight,volume,notes,position,price,availableQuantity,testDescriptors) VALUES(?,?, ?, ?, ?, ?, ?,?,?)';
            SKUDB.run(sql, [data.id,data.description, data.weight, data.volume,data.notes,0,data.price,data.availableQuantity,''], (err) => {
                if (err) {
                  reject(new Promise( (resolve,reject)=> reject(503)));
                  return;
                }
                resolve(true);
            });
        });

    }
    this.checkPosition=(id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT maxWeight,maxVolume,occupiedWeight,occupiedVolume,positionID FROM POSITION P,SKUs S WHERE P.positionID=S.position AND S.id=?';
            SKUDB.get(sql, [id], (err, rows) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(503)));
                    return;
                }
                const info = 
                    {  
                       maxWeight:rows.maxWeight,
                       maxVolume:rows.maxVolume,
                       occupiedWeight:rows.occupiedWeight,
                       occupiedVolume:rows.occupiedVolume,
                       positionID:rows.positionID
                    }
                ;
                resolve(info);
            });
        });
    }
    this.checkPositionID=(positionID)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM position WHERE positionID=?';
            SKUDB.all(sql, [positionID], (err, rows) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(503)));
                    return;
                }
                const sku = rows.map((r) => (
                    {  
                       positionID:r.positionID,
                    }
                ));
                resolve(sku);
            });
        });

    }

    this.putSku=(data,id)=>{
        
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE SKUs SET description=?,weight=?,volume=?,notes=?,price=?,availableQuantity=? WHERE id=?';
            SKUDB.run(sql, [data.newDescription, data.newWeight, data.newVolume,data.newNotes,data.newPrice,data.newAvailableQuantity,id], (err) => {
                if (err) {
                  reject(new Promise( (resolve,reject)=> reject(503)));
                  return;
                }
                resolve(this.lastID);
            });
        });
    }
    this.updatePosition=(weight,volume,id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE position SET occupiedWeight=?,occupiedVolume=? WHERE positionID=?';
            SKUDB.run(sql, [weight,volume,id], (err) => {
                if (err) {
                  reject(new Promise( (resolve,reject)=> reject(503)));
                  return;
                }
                resolve(this.lastID);
            });
        });

    }
    this.putSkuPosition=(id,position)=>{
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE SKUs SET position=? WHERE id=?';
            SKUDB.run(sql, [position,id], (err) => {
                if (err) {
                  reject(new Promise( (resolve,reject)=> reject(503)));
                  return;
                }
                resolve(this.lastID);
            });
        });
    }


    
    this.deleteSKU=(id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM SKUs WHERE ID=?';
            SKUDB.run(sql, [id], (err) => {
                if (err) {
                  reject(new Promise( (resolve,reject)=> reject(503)));
                  return;
                }
                resolve(true);
            });
        });
    }
    this.deleteAll = () => {
        const sql = "DELETE FROM SKUs";
        return new Promise((resolve, reject) => {
            SKUDB.run(sql,[], (err) => {
            if (err) {
              reject(503);
            } else {
              resolve(204);
            }
          });
        });
      };
    
}

module.exports= SKU_dao;