'use strict';
//Data Access Object
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function SKU_item_dao() {
    
    const SKUDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }

    });
    const query3d = 'DROP TABLE IF EXISTS SKUItems;';
    SKUDB.run(query3d, (err) => {
      if (err) {
        console.log('Some Error Occured');
      } else {
        console.log('Table Created');
      }
    });
    const query3 = 'CREATE TABLE SKUItems (rowID INTEGER PRIMARY KEY , RFID TEXT, SKUId INTEGER, Available INTEGER, DateOfStock TEXT);';
    SKUDB.run(query3, (err) => {
      if (err) {
        console.log('Some Error Occured');
      } else {
        console.log('Table Created');
      }
    });

    this.deleteSKUItem=(rfid)=> {
        return new Promise((resolve, reject)  => {
            const sql = 'DELETE FROM SKUItems WHERE RFID=?';
            SKUDB.run(sql,[rfid], (err) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(503)));
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

    this.postSkuItem=(data)=>{
        return new Promise((resolve, reject) => {
            console.log(data.DateOfStock);
            const sql = 'INSERT INTO SKUItems(RFID,SKUId,DateOfStock) VALUES(?,?,?)';
            SKUDB.run(sql, [data.RFID, data.SKUId, data.DateOfStock], (err) => {
                if (err) {
                  reject(new Promise( (resolve,reject)=> reject(503)));
                  return;
                }
                resolve(this.lastID);
            });
        });
    }

    this.putSkuItem=(data,rfid)=> {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE SKUItems SET RFID=?,SKUId=?,DateOfStock=? WHERE RFID=?';
            SKUDB.run(sql, [data.newRFID, data.newAvailable, data.newDateOfStock, rfid], (err) => {
                if (err) {
                  reject(new Promise( (resolve,reject)=> reject(503)));
                  return;
                }
                resolve(this.lastID);
            });
        });
    }

    this.getSKUItems=()=>  {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUItems';
            SKUDB.all(sql, [], (err, rows) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(500)));
                    return;
                }
                const skuitems = rows.map((r) => (
                    {  
                       RFID:r.RFID,
                       SKUId:r.SKUId,
                       Available:r.Available,
                       DateOfStock:r.DateOfStock
                    }
                ));
                resolve(skuitems);
            });
        });
    }

    this.getSKUItemsID=(id) =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUItems WHERE SKUid=? AND Available=1';
            SKUDB.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(500)));
                    return;
                }
                const skuitemsID = rows.map((r) => (
                    {  
                       RFID:r.RFID,
                       SKUId:r.SKUId,
                       DateOfStock:r.DateOfStock
                    }
                ));
                resolve(skuitemsID);
            });
        });
      }

      this.getSKUItemsRFID=(rfid) =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUItems WHERE RFID=?';
            SKUDB.get(sql, [rfid], (err, r) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(500)));
                    return;
                }
                if (r===undefined){
                    reject(new Promise( (resolve,reject)=> reject(404)));
                    return;
                }
                const skuitemsRFID = 
                    {  
                       RFID:r.RFID,
                       SKUId:r.SKUId,
                       Available:r.Available,
                       DateOfStock:r.DateOfStock
                    }
                ;
                resolve(skuitemsRFID);
            });
        });
      }
      this.checkSKUItemsRFID=(rfid) =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUItems WHERE RFID=?';
            SKUDB.all(sql, [rfid], (err, rows) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(503)));
                    return;
                }
                const skuitemsRFID = rows.map((r) => (
                    {  
                       RFID:r.RFID,
                       SKUId:r.SKUId,
                       Available:r.Available,
                       DateOfStock:r.DateOfStock
                    }
                ));
                resolve(skuitemsRFID);
            });
        });
      }
      this.checkSKU=(id) =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM SKUs WHERE id=? ';
            SKUDB.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(new Promise( (resolve,reject)=> reject(503)));
                    return;
                }
                const skuitemsID = rows.map((r) => (
                    {  
                       id:r.id
                    }
                ));
                resolve(skuitemsID);
            });
        });
      }
      this.deleteAll = () => {
        const sql = "DELETE FROM SKUItems";
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

module.exports= SKU_item_dao;
