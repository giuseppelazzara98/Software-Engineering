'use strict';
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const routerIO = express.Router();
const InternalOrders_dao = require('./InternalOrders_dao')

const internalOrders_dao = new InternalOrders_dao();

// GET
routerIO.get('/internalOrders', (req, res) => {
    internalOrders_dao.getAllIO().then(
        (list) => {
            // TODO: create the product array
            return res.status(200).json(list);
        }
    ).catch(
        () => { return res.status(500).end(); }
    )
});

routerIO.get('/internalOrdersIssued', (req, res) => {
    internalOrders_dao.getAllIOIssued().then(
        (list) => {
            // TODO: create the product array
            return res.status(200).json(list);
        }
    ).catch(
        () => { return res.status(500).end(); }
    )
});

routerIO.get('/internalOrdersAccepted', (req, res) => {
    internalOrders_dao.getAllIOAccepted().then(
        (list) => {
            // TODO: create the product array
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

    internalOrders_dao.getIO(req.params.id).then(
        (io) => {
            if (io === undefined) {
                return res.status(404).end();
            }
            // TODO: create the product array
            return res.status(200).json(io);
        }
    ).catch(
        () => { return res.status(500).end(); }
    );

});

// POST
routerIO.post('/internalOrders',
    body('products').isArray(),
    body('customerId').isInt(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).end();
        }
        internalOrders_dao.addIO(req.body).then(
            () => {
                // TODO: check issueDate
                return res.status(201).end();
            }
        ).catch(
            (err) => {
                return res.status(err).end();
            }
        )
    });

// PUT
routerIO.put('/internalOrders/:id',
    param('id').isInt(),
    body('newState').isIn(['ACCEPTED', 'COMPLETED', 'REFUSED', 'CANCELED', 'ISSUED']),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).end();
        }

        internalOrders_dao.updateStateIO(req.params.id, req.body).then(
            () => {
                return res.status(200).end();
            }
        ).catch(
            (err) => {
                if(err === 404) return res.status(404).end();
                return res.status(err).end();
            }
        )
        

    });

// DELETE
routerIO.delete('/internalOrders/:id', param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).end();
    internalOrders_dao.deleteIO(req.params.id).then(
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