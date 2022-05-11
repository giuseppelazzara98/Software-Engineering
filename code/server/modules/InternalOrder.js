'use strict';
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const routerIO = express.Router();
const IOManager = require('./IOManager')

const ioManager = new IOManager();

// GET
routerIO.get('/internalOrders', (req, res) => {
    ioManager.getAllIO().then(
        (list) => {
            // TODO: create the product array
            return res.status(200).json(list);
        }
    ).catch(
        () => { return res.status(500).send(); }
    )
});

routerIO.get('/internalOrdersIssued', (req, res) => {
    ioManager.getAllIOIssued().then(
        (list) => {
            // TODO: create the product array
            return res.status(200).json(list);
        }
    ).catch(
        () => { return res.status(500).send(); }
    )
});

routerIO.get('/internalOrdersAccepted', (req, res) => {
    ioManager.getAllIOAccepted().then(
        (list) => {
            // TODO: create the product array
            return res.status(200).json(list);
        }
    ).catch(
        () => { return res.status(500).send(); }
    )
});

routerIO.get('/internalOrders/:id', param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send()
    }

    ioManager.getIO(req.params.id).then(
        (io) => {
            if (io === undefined) {
                return res.status(404).send();
            }
            // TODO: create the product array
            return res.status(200).json(io);
        }
    ).catch(
        () => { return res.status(500).send(); }
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
            return res.status(422).send();
        }
        ioManager.addIO(req.body).then(
            () => {
                // TODO: check issueDate
                return res.status(201).send();
            }
        ).catch(
            (err) => {
                return res.status(err).send();
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
            return res.status(422).send();
        }

        ioManager.updateStateIO(req.params.id, req.body).then(
            () => {
                return res.status(200).send();
            }
        ).catch(
            (err) => {
                if(err === 404) return res.status(404).send();
                return res.status(err).send();
            }
        )
        

    });

// DELETE
routerIO.delete('/internalOrders/:id', param('id').isInt(), (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).send();
    ioManager.deleteIO(req.params.id).then(
        (ok) => {
            return res.status(ok).send();
        }
    ).catch(
        (err) => {
            return res.status(err).send();
        }
    );
})

module.exports = routerIO;