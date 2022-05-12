'use strict';
const express = require('express');
const routerRO = express.Router();
const RestockOrders_dao = require('./RestockOrders_dao')
const { body, param, validationResult } = require('express-validator');

const restockOrders_dao = new RestockOrders_dao(); //dao class

// GET
routerRO.get('/restockOrders', (req, res) => {
  restockOrders_dao.getAllRO().then(
    (list) => {
      // TODO: create the product array and skuItems array
      return res.status(200).json(list);
    }
  ).catch(
    () => { return res.status(500).send(); }
  );
});

routerRO.get('/restockOrdersIssued', (req, res) => {
  restockOrders_dao.getAllROIssued().then(
    (list) => { return res.status(200).json(list); }
  ).catch(
    () => { return res.status(500).send(); }
  );
});

routerRO.get('/restockOrders/:id', param('id').isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send();
  }
  restockOrders_dao.getRO(req.params.id).then(
    (ro) => {
      if (ro === undefined) {
        return res.status(404).send();
      }
      // TODO: create the product array
      return res.status(200).json(ro);
    }
  ).catch(
    () => { return res.status(500).send(); }
  );

})

routerRO.get('/restockOrders/:id/returnItems', param('id').isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send();
  }
  restockOrders_dao.getROReturnedItems(req.params.id).then(
    (list) => {
      return res.status(200).json(list);
    }
  ).catch(
    (err) => {
      if (err === 422) return res.status(422).send();
      return res.status(500).send();
    }
  );
})


// POST
routerRO.post('/restockOrder',
  body('products').isArray(),
  body('supplierId').isInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send();
    }

    restockOrders_dao.addRO(req.body).then(
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
routerRO.put('/restockOrder/:id', param('id').isInt(),
  body('newState').isIn(['ISSUED', 'DELIVERY', 'DELIVERED', 'TESTED', 'COMPLETEDRETURN', 'COMPLETED']),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send();
    }

    restockOrders_dao.updateStateRO(req.params.id, req.body.newState).then(
      () => {
        return res.status(200).send();
      }
    ).catch(
      (err) => {
        return res.status(err).send();
      }
    );
  })

routerRO.put('/restockOrder/:id/skuItems', param('id').isInt(),
  body('skuItems').isArray(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send();
    }

    restockOrders_dao.addSkuItems(req.params.id, req.body.skuItems).then(
      () => {
        return res.status(200).send();
      }
    ).catch(
      (err) => {
        if (err === 422) {
          console.log('asd');
          return res.status(422).send();
        } else if (err === 404) {
          return res.status(404).send();
        } else {
          return res.status(503).send();
        }
      }
    );
  }
);

routerRO.put('/restockOrder/:id/transportNote', param('id').isInt(),
  body('transportNote').isObject(),
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors);
      return res.status(422).send();
    }
    
    restockOrders_dao.addTransportNote(req.params.id ,req.body.transportNote.deliveryDate).then(
      () => {
        return res.status(200).send();
      }
    ).catch(
      (err) => {
        if (err === 422) {
          return res.status(422).send();
        } else if (err === 404) {
          return res.status(404).send();
        } else {
          return res.status(503).send();
        }
      }
    );
  }
);

// DELETE
routerRO.delete('/restockOrder/:id', param('id').isInt(), (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).send();
  }
  restockOrders_dao.deleteRO(req.params.id).then(
    (ok) => {
      return res.status(ok).send();
    }
  ).catch(
    (err) => {
      return res.status(err).send();
    }
  );
})




module.exports = routerRO;