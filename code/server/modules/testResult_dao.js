'use strict';
//Data Access Object
const sqlite = require('sqlite3');
const dayjs = require('dayjs');
function testResult_dao(){
    const testResultDB = new sqlite.Database("./modules/database/DB.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
        console.log("Connected to DB");

    });

    this.getTestResultsByRFID=(rfid)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM WHERE RFID=?';//WRITE SQL COMMAND
            testResultDB.all(sql, [rfid], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const testResults = rows.map((r) => (
                    {  
                       id:r.id,
                       idTestDescriptor:r.idTestDescriptor,
                       Date:r.Date,
                       Result:r.Result
                    }
                ));
                resolve(testResults);
            });
        });
      }
    
      this.getTestResultsById=(rfid,id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM WHERE RFID=? AND ID=?';//WRITE SQL COMMAND
            testResultDB.all(sql, [rfid,id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const testResults = rows.map((r) => (
                    {  
                       id:r.id,
                       idTestDescriptor:r.idTestDescriptor,
                       Date:r.Date,
                       Result:r.Result
                    }
                ));
                resolve(testResults);
            });
        });
      }
    
    
    
      this.postTestResult=(data)=>{
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO TABLENAME(rfid,idTestDescriptor,Date,Result) VALUES(?, ?, ?, ?)';//WRITE SQL COMMAND
            testResultDB.run(sql, [data.rfid, data.idTestDescriptor, data.Date,data.Result], (err) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(this.lastID);
            });
        });
    }
    
    this.putTestResult=(data,rfid,id)=>{
        return new Promise((resolve, reject) => {
        const sql = 'UPDATE(idTestDescriptor,Date,Result) VALUES(?, ?, ?) WHERE rfid=? AND id=?';//WRITE SQL COMMAND
        testResultDB.run(sql, [data.newIdTestDescriptor, data.newDate, data.newResult,rfid,id], (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.lastID);
        });
    });
    }
    
    deleteTestResult=(rfid,id)=>{
        return new Promise((resolve, reject)  => {
            const sql = 'DELETE FROM TABLE WHERE RFID=? AND id=?';//WRITE SQL COMMAND 
            testResultDB.run(sql,[rfid,id], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        });
    }




}

module.exports= testResult_dao;