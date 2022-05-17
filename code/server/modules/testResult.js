'use strict';
const express = require('express');
const routertestResult = express.Router();
const testResultDao = require('./testResult_dao');
const { body, param, validationResult } = require('express-validator');


const testResult_dao = new testResultDao();
routertestResult.get("/skuitems/:rfid/testResults",
  param('rfid').isString(),
  param('rfid').isLength({ min: 32 }),
  param('rfid').isLength({ max: 32 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send("422 Unprocessable Entity(validation of rfid failed)")
    }
    try {
      const rfid = req.params.rfid;
      const testResults = await testResult_dao.getTestResultsByRFID(rfid);
      if (testResults.length === 0) {
        return res.status(404).send("404 NOT FOUND");
      }
      return res.status(200).json(testResults);
    } catch (err) {
      res.status(500).send("500 INTERNAL SERVER ERROR");
    }
  });

routertestResult.get("/skuitems/:rfid/testResults/:id", param('id').isInt(),
  param('rfid').isString(),
  param('rfid').isLength({ min: 32 }),
  param('rfid').isLength({ max: 32 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send("422 Unprocessable Entity(validation of rfid or id failed)")
    }
    try {
      const rfid = req.params.rfid;
      const id = req.params.id;
      const testResults = await testResult_dao.getTestResultsById(rfid, id);
      if (testResults.length === 0) {
        return res.status(404).send("404 NOT FOUND");
      }
      return res.status(200).json(testResults);
    } catch (err) {
      return res.status(500).send("500 INTERNAL SERVER ERROR");
    }
  });

routertestResult.post("/skuitems/testResult",
  body('rfid').isString(),
  body('rfid').isLength({ min: 32 }),
  body('rfid').isLength({ max: 32 }),
  body('idTestDescriptor').isInt(),
  body('Result').isBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send("422 Unprocessable Entity(validation of rfid or id failed)")
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(422).send("422 Unprocessable Entity(validation of request body or of rfid failed)");
    }
    try {
      let testResult = req.body;
      if (testResult.Result) {
        testResult.Result = 1;
      }
      else testResult.Result = 0;
      if (
        testResult === undefined ||
        testResult.rfid === undefined ||
        testResult.idTestDescriptor === undefined ||
        testResult.Date === undefined ||
        testResult.Result === undefined
      ) {
        return res.status(422).send("422 Unprocessable Entity(validation of request body or of rfid failed)");
      }
      const check1 = await testResult_dao.checkrfid(testResult.rfid);
      if (check1.length === 0) {
        return res.status(404).send("404 NOT FOUND");
      }
      const check2 = await testResult_dao.checkTestDescriptor(testResult.idTestDescriptor);
      if (check2.length === 0) {
        return res.status(404).send("404 NOT FOUND");
      }
      testResult_dao.postTestResult(testResult);
      return res.status(201).send("201 CREATED");
    }
    catch (err) {
      return res.status(503).send("503 SERVICE UNAVAILABLE");
    }
  });

routertestResult.put("/skuitems/:rfid/testResult/:id",
  param('rfid').isString(),
  param('rfid').isLength({ min: 32 }),
  param('rfid').isLength({ max: 32 }),
  param('id').isInt(),
  body('newIdTestDescriptor').isInt(),
  body('newResult').isBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send("422 Unprocessable Entity(validation of rfid or id failed)")
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(422).send("422 Unprocessable Entity(validation of request body or of rfid failed)");
    }
    try {
      let testResult = req.body;
      let rfid = req.params.rfid;
      let id = req.params.id;
      if (
        testResult === undefined ||
        testResult.newIdTestDescriptor === undefined ||
        testResult.newDate === undefined ||
        testResult.newResult === undefined
      ) {
        return res.status(422).send("422 Unprocessable Entity(validation of request body or of rfid failed)");
      }
      const check1 = await testResult_dao.checkrfid(testResult.rfid);
      if (check1.length === 0) {
        return res.status(404).send("404 NOT FOUND)");
      }
      const check2 = await testResult_dao.checkTestDescriptor(testResult.idTestDescriptor);
      if (check2.length === 0) {
        return res.status(404).send("404 NOT FOUND)");
      }
      testResult_dao.putTestResult(testResult, rfid, id);
      return res.status(201).send("200 OK");
    }
    catch (err) {
      return res.status(503).send("503 SERVICE UNAVAILABLE");
    }
  });

routertestResult.delete("/skuitems/:rfid/testResult/:id",
  param('rfid').isString(),
  param('rfid').isLength({ min: 32 }),
  param('rfid').isLength({ max: 32 }),
  param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send("422 Unprocessable Entity(validation of rfid or id failed)")
    }
    try {
      const rfid = req.params.rfid;
      const id = req.params.id;
      testResult_dao.deleteTestResult(rfid, id);
      return res.status(204).end();
    } catch (err) {
      return res.status(503).send("Service Unavailable");
    }
  });




module.exports = routertestResult;