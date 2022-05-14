'use strict';
const express = require('express');
const routerTD = express.Router();
const { body, param, validationResult } = require('express-validator');
const TestDescriptor_dao = require('./TestDescriptor_dao');

const testDescriptor_dao = new TestDescriptor_dao();

routerTD.get('/testDescriptors', (req, res) => {
    testDescriptor_dao.getAllTD().then(
        (rows) => {
            return res.status(200).json(rows);
        }
    ).catch(
        (err) => {
            return res.status(500).end();
        }
    );
})

routerTD.get('/testDescriptors/:id', param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send();
    }
    testDescriptor_dao.getTD(req.params.id).then(
        (td) => {
            if (td === undefined) {
                return res.status(404).end();
            }
            return res.status(200).json(td);
        }
    ).catch(
        () => { return res.status(500).end(); }
    );

})

routerTD.post('/testDescriptor',
    body('name').isString(),
    body('procedureDescription').isString(),
    body('idSKU').isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).end();
        }

        testDescriptor_dao.addTD(req.body).then(
            () => {
                return res.status(201).end();
            }
        ).catch(
            (err) => {
                return res.status(err).end();
            }
        );
    }
)

routerTD.put('/testDescriptor/:id',
    param('id').isInt(),
    body('newName').isString(),
    body('newProcedureDescription').isString(),
    body('newIdSKU').isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).end();
        }

        testDescriptor_dao.updateTD(req.params.id, req.body).then(
            (code) => {
                return res.status(code).end();
            }
        ).catch(
            (err) => {
                return res.status(err).end();
            }
        )
    })

routerTD.delete('/testDescriptor/:id', param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).end();
    }

    testDescriptor_dao.deleteTD(req.params.id).then(
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