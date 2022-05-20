'use strict';
//Data Access Object
const sqlite = require('sqlite3');
const dayjs = require('dayjs');
function testResult_dao(){
    const testResultDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
        console.log("Connected to DB");

    });

    this.getTestResultsByRFID=(rfid)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id,idTestDescriptor,Date,Result FROM testResults  WHERE RFID=?';
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
                       Result:Boolean(r.Result)
                    }
                ));
                resolve(testResults);
            });
        });
      }
    
      this.getTestResultsById=(rfid,id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, idTestDescriptor, Date, Result FROM testResults WHERE RFID=? AND ID=?';
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
                       Result:Boolean(r.Result)
                    }
                ));
                resolve(testResults);
            });
        });
      }
      this.checkrfid=(rfid)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT RFID FROM SKUItems WHERE RFID=? ';
            testResultDB.all(sql, [rfid], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const testResults = rows.map((r) => (
                    {  
                       rfid:r.rfid
                    }
                ));
                resolve(testResults);
            });
        });
      }
      this.checkTestDescriptor=(idTest)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id FROM testdescriptors WHERE id=? ';
            testResultDB.all(sql, [idTest], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const testResults = rows.map((r) => (
                    {  
                       id:r.id
                    }
                ));
                resolve(testResults);
            });
        });
      }
      this.checkId=(id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id FROM testResults WHERE id=? ';
            testResultDB.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const testResults = rows.map((r) => (
                    {  
                       id:r.id
                    }
                ));
                resolve(testResults);
            });
        });
      }
    
    
    
      this.postTestResult=(data)=>{
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO testResults(rfid,idTestDescriptor,Date,Result) VALUES(?, ?, ?, ?)';
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
        const sql = 'UPDATE testResults SET idTestDescriptor=?,Date=?,Result=?   WHERE rfid=? AND id=?';
        testResultDB.run(sql, [data.newIdTestDescriptor, data.newDate, data.newResult,rfid,id], (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.lastID);
        });
    });
    }
    
    this.deleteTestResult=(rfid,id)=>{
        return new Promise((resolve, reject)  => {
            const sql = 'DELETE FROM testResults WHERE RFID=? AND id=?';
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