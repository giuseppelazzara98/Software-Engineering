'use strict';
const express = require('express');
const routerTD = express.Router();
const { body, param, validationResult } = require('express-validator');
const TestDescriptor_service = require('../services/TestDescriptor_service');
const TestDescriptor_dao = require('../dao/TestDescriptor_dao');
const td_service = new TestDescriptor_service(new TestDescriptor_dao());

//ok
routerTD.get('/testDescriptors', (req, res) => {
    td_service.getAllTD().then(
        (list) => {
            return res.status(200).json(list);
        }
    ).catch(
        (err) => {
            return res.status(err).end();
        }
    );
})

//ok
routerTD.get('/testDescriptors/:id', param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).end();
    }
    td_service.getTD(req.params.id).then(
        (td) => {
            return res.status(200).json(td);
        }
    ).catch(
        (err) => { return res.status(err).end(); }
    );

})

//ok
routerTD.post('/testDescriptor',
    body('name').isString({min:1}),
    body('procedureDescription').isString({min:1}),
    body('idSKU').isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            return res.status(422).end();
        }

        if(req.body.name == '' || req.body.procedureDescription == ''){
            return res.status(422).end();
        }

        td_service.addTD(req.body).then(
            (ok) => {
                return res.status(ok).end();
            }
        ).catch(
            (err) => {
                return res.status(err).end();
            }
        );
    }
)
//ok
routerTD.put('/testDescriptor/:id',
    param('id').isInt(),
    body('newName').isString({min:1}),
    body('newProcedureDescription').isString(),
    body('newIdSKU').isLength({min: 1}).isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).end();
        }
        
        if(req.body.newName == '' || req.body.newProcedureDescription == ''){
            return res.status(422).end();
        }

        td_service.modifyTD(req.params.id, req.body).then(
            (code) => {
                return res.status(code).end();
            }
        ).catch(
            (err) => {
                return res.status(err).end();
            }
        )
    })

routerTD.delete('/testDescriptor/:id', param('id').isLength({min: 1}).isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).end();
    }

    td_service.deleteTD(req.params.id).then(
        (ok) => {
            return res.status(ok).end();
        }
    ).catch(
        (err) => {
            return res.status(err).end();
        }
    )
})

module.exports = routerTD;