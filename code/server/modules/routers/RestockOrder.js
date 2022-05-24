'use strict';
const express = require('express');
const routerRO = express.Router();
const { body, param, validationResult } = require('express-validator');
const RestockOrders_dao = require('../dao/RestockOrders_dao');
const RestockOrders_service = require('../services/RestockOrder_service');

const ro_service = new RestockOrders_service(new RestockOrders_dao());

// GET
//ok
routerRO.get('/restockOrders', (req, res) => {
  ro_service.getAllRO().then(
    (list) => {
      return res.status(200).json(list);
    }
  ).catch(
    (err) => { return res.status(err).end(); }
  );
});

//ok
routerRO.get('/restockOrdersIssued', (req, res) => {
  ro_service.getAllROIssued().then(
    (list) => { return res.status(200).json(list); }
  ).catch(
    (err) => { return res.status(err).end(); }
  );
});

//ok
routerRO.get('/restockOrders/:id', param('id').isLength({ min: 1 }).isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).end();
  }
  ro_service.getRO(req.params.id).then(
    (ro) => {
      return res.status(200).json(ro);
    }
  ).catch(
    (err) => { return res.status(err).end(); }
  );

})

//ok
routerRO.get('/restockOrders/:id/returnItems', param('id').isLength({ min: 1 }).isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).end();
  }
  ro_service.getROReturnedItems(req.params.id).then(
    (list) => {
      return res.status(200).json(list);
    }
  ).catch(
    (err) => {
      return res.status(err).end();
    }
  );
})


// POST
routerRO.post('/restockOrder',
  body('products').isArray({min:1}),
  body('supplierId').isLength({ min: 1 }).isInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }

    ro_service.addRO(req.body).then(
      (ok) => {
        // TODO: check issueDate
        return res.status(ok).end();
      }
    ).catch(
      (err) => {
        return res.status(err).end();
      }
    )
  });

// PUT
//ok
routerRO.put('/restockOrder/:id', param('id').isInt(),
  body('newState').isIn(['ISSUED', 'DELIVERY', 'DELIVERED', 'TESTED', 'COMPLETEDRETURN', 'COMPLETED']),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }

    ro_service.updateStateRO(req.params.id, req.body).then(
      (ok) => {
        return res.status(ok).end();
      }
    ).catch(
      (err) => {
        return res.status(err).end();
      }
    );
  })

routerRO.put('/restockOrder/:id/skuItems', param('id').isInt(),
  body('skuItems').isArray(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }

    ro_service.addSkuItems(req.params.id, req.body).then(
      () => {
        return res.status(200).end();
      }
    ).catch(
      (err) => {
        return res.status(err).end();
      }
    );
  });

routerRO.put('/restockOrder/:id/transportNote', param('id').isInt(),
  body('transportNote').isObject(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }

    ro_service.addTransportNote(req.params.id, req.body).then(
      (ok) => {
        return res.status(ok).end();
      }
    ).catch(
      (err) => {
        return res.status(err).end();
      }
    );
  }
);

// DELETE
//ok
routerRO.delete('/restockOrder/:id', param('id').isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).end();
  }
  ro_service.deleteRO(req.params.id).then(
    (ok) => {
      return res.status(ok).end();
    }
  ).catch(
    (err) => {
      return res.status(err).end();
    }
  );
})




module.exports = routerRO;