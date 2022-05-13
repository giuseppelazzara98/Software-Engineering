'use strict';
//Data Access Object
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function SKU_dao() {
    
    const SKUDB = new sqlite.Database("./modules/database/DB.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
        console.log("Connected to DB");

    });
    this.getSKUs=()=>{
        return new Promise((resolve, reject) => {
            const sql = '';//WRITE SQL COMMAND
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

    }
    this.postSku=(sku)=>{

    }
    this.putSku=(sku,id)=>{

    }
    this.putSkuPosition=(id,position)=>{

    }
    this.deleteSKU=(id)=>{

    }
}

module.exports= SKU_dao;