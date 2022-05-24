'use strict';
const testResultDao = require('../dao/testResult_dao');

const testResult_dao = new testResultDao();
class testResult_service{


 getTestResultsByRFID = async(rfid)=> {
  try {
    const testResults = await testResult_dao.getTestResultsByRFID(rfid);
    if (testResults.length === 0) {
      return new Promise( (resolve,reject)=> reject(404));
    }
    else return testResults;
}
  catch(err){
  return err;
}
}

getTestResultsById = async (rfid, id) =>{
  try{
    const testResults = await testResult_dao.getTestResultsById(rfid, id);
      if (testResults.length === 0) {
        return new Promise( (resolve,reject)=> reject(404));
      }
      else return testResults;
  }
  catch(err){
    return err;
  }
}

postTestResult = async (testResult) =>{
  try{
    const check1 = await testResult_dao.checkrfid(testResult.rfid);
      if (check1.length === 0) {
        return new Promise( (resolve,reject)=> reject(404));
      }
      const check2 = await testResult_dao.checkTestDescriptor(testResult.idTestDescriptor);
      if (check2.length === 0) {
        return new Promise( (resolve,reject)=> reject(404));
      }
      console.log(testResult);
      await testResult_dao.postTestResult(testResult);
      return new Promise( (resolve,reject)=> resolve(201));
  }

  catch(err){
    return err;
  }
}

putTestResult= async(testResult, rfid,id)=>{
  try{
    const check1 = await testResult_dao.checkrfid(rfid);
      if (check1.length === 0) {
        return new Promise( (resolve,reject)=> reject(404));
      }
      const check2 = await testResult_dao.checkTestDescriptor(testResult.newIdTestDescriptor);
      if (check2.length === 0) {
        return new Promise( (resolve,reject)=> reject(404));
      }
      const check3 = await testResult_dao.checkId(id);
      if (check3.length === 0) {
        return new Promise( (resolve,reject)=> reject(404));
      }
      await testResult_dao.putTestResult(testResult,rfid,id);
      return new Promise( (resolve,reject)=> resolve(200));


  }
  catch(err){
    return err;
  }
}
deleteTestResult= async(rfid, id) =>{
  try{
    await testResult_dao.deleteTestResult(rfid,id);
    return new Promise( (resolve,reject)=> resolve(200));
  }
  catch(err){
    return err;
  }
}


}


module.exports = testResult_service;