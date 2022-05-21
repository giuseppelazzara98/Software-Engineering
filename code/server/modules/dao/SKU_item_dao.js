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
        console.log("Connected to DB");

    });

    this.deleteSKUItem=(rfid)=> {
        return new Promise((resolve, reject)  => {
            const sql = 'DELETE FROM SKUItems WHERE RFID=?';
            SKUDB.run(sql,[rfid], (err) => {
                if (err) {
                    reject(err);
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
                  reject(err);
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
                  reject(err);
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
                    reject(err);
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
                    reject(err);
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
            const sql = 'SELECT * FROM SKUItems WHERE RFID=?';//WRITE SQL COMMAND
            SKUDB.all(sql, [rfid], (err, rows) => {
                if (err) {
                    reject(err);
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
                    reject(err);
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

}

module.exports= SKU_item_dao;