'use strict';

const sqlite = require('sqlite3');

function IOManager() {
    //Internal Orders
    const ioDB = new sqlite.Database("./modules/database/internalOrders.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to ioDB");
            throw err;
        }
        console.log("Connected to ioDB");

    });
    
    this.getAllIO = () => {
        /* 
            TO DO: missing list of products
        */
        const query_all = 'SELECT * FROM internalOrders';
        return new Promise((resolve, reject) =>{
            ioDB.all(query_all, (err, rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        });
    }

    this.getAllIOIssued = () => {
        /* 
            TO DO: missing list of products
        */
        const query_issued = 'SELECT * FROM internalOrders WHERE state="ISSUED"';
        return new Promise((resolve, reject) =>{
            ioDB.all(query_issued, (err, rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        });
    }

    this.getAllIOAccepted = () => {
        /* 
            TO DO: missing list of products
        */
        const query_issued = 'SELECT * FROM internalOrders WHERE state="ACCEPTED"';
        return new Promise((resolve, reject) =>{
            ioDB.all(query_issued, (err, rows)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        });
    }

    this.getIO = (id) => {
        const query = 'SELECT * FROM internalOrders WHERE id=?';
        return new Promise((resolve, reject) =>{
            ioDB.get(query, [id], (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    this.addIO = async (body) => {
        const query_insert = 'INSERT INTO internalOrders(id, issueDate, state, products, customerID) VALUES(?, ?, "ISSUED", ?, ?)';
        const date = body.issueDate;
        const products = [...body.products];
        var IDs = Array();
        products.forEach(p => IDs.push(p.SKUId));
        IDs = IDs.toString();
        const customerID = body.customerId;

        const id = await this.getNextIOID();

        return new Promise((resolve, reject) => {
            ioDB.run(query_insert, [id, date, IDs, customerID], (err) => {
                if(err){
                    reject(false);
                } else {
                    resolve(true);
                }
            })
        })
    }

    this.getNextIOID = () =>{
        const query_getID = 'SELECT MAX(id) AS max FROM internalOrders';
        return new Promise((resolve, reject) =>{
            ioDB.get(query_getID, (err, row)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(row.max + 1);
                }
            })
        })
    }
}




module.exports = IOManager;