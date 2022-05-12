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
}

module.exports= SKU_dao;