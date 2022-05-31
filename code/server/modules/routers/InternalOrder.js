'use strict';
const dayjs = require('dayjs');
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const routerIO = express.Router();
const InternalOrders_dao = require('../dao/InternalOrders_dao');
const InternalOrder_service = require('../services/InternalOrder_service');

const internalOrder_service = new InternalOrder_service(new InternalOrders_dao());

// GET
routerIO.get('/internalOrders', (req, res) => {
    internalOrder_service.getAllIO().then(
        (list) => {
            return res.status(200).json(list);
        }
    ).catch(
        (err) => { return res.status(err).end(); }
    )
});

routerIO.get('/internalOrdersIssued', (req, res) => {
    internalOrder_service.getAllIOIssued().then(
        (list) => {
            return res.status(200).json(list);
        }
    ).catch(
        () => { return res.status(500).end(); }
    )
});

routerIO.get('/internalOrdersAccepted', (req, res) => {
    internalOrder_service.getAllIOAccepted().then(
        (list) => {
            return res.status(200).json(list);
        }
    ).catch(
        () => { return res.status(500).end(); }
    )
});

routerIO.get('/internalOrders/:id', param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).end()
    }

    internalOrder_service.getIO(req.params.id).then(
        (io) => {
            return res.status(200).json(io);
        }
    ).catch(
        (err) => { return res.status(err).end(); }
    );
});

// POST
routerIO.post('/internalOrders',
    body('products').isArray({min:1}),
    body('issueDate').isString(),
    body('customerId').isLength({min:1}).isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() || !dayjs(req.body.issueDate, 'YYYY/MM/DD HH:mm', true).isValid()) {
            return res.status(422).end();
        }
        internalOrder_service.addIO(req.body).then(
            () => {
                // TODO: check issueDate
                return res.status(201).end();
            }
        ).catch(
            (err) => {
                return res.status(err).end();
            }
        )
    }
);

// PUT
routerIO.put('/internalOrders/:id',
    param('id').isInt(),
    body('newState').isIn(['ACCEPTED', 'COMPLETED', 'REFUSED', 'CANCELED', 'ISSUED']),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).end();
        }

        internalOrder_service.updateStateIO(req.params.id, req.body).then(
            () => {
                return res.status(200).end();
            }
        ).catch(
            (err) => {
                if(err === 404) return res.status(404).end();
                return res.status(err).end();
            }
        )
    }
);

// DELETE
routerIO.delete('/internalOrders/:id', param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).end();
    internalOrder_service.deleteIO(req.params.id).then(
        (ok) => {
            return res.status(ok).end();
        }
    ).catch(
        (err) => {
            return res.status(err).end();
        }
    );
})

module.exports = routerIO;