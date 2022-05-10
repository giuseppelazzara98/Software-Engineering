'use strict';

const sqlite = require('sqlite3');

function ROManager(){
    // Restock Order 
    const roDB = new sqlite.Database("./modules/database/restockOrders.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to roDB");
            throw err;
        }
        console.log("Connected to roDB");

    });

    this.getAllRO = () => {
        const query = 'SELECT * FROM restockOrders';
        return new Promise((resolve, reject) => {
            roDB.all(query, (err, rows) => {
                if(err){
                    reject(false);
                } else {
                    resolve(rows);
                }
            })
        });
    };
}


module.exports = ROManager;