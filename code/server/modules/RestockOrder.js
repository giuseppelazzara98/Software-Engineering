'use strict';
const express = require('express');
const routerRO = express.Router();
const ROManager = require('./ROManager')
const { body, param, validationResult } = require('express-validator');

const roManager = new ROManager();

// GET
routerRO.get('/restockOrders', (req, res) => {
  roManager.getAllRO().then(
    (list) => {
      // TODO: create the product array and skuItems array
      return res.status(200).json(list);
    }
  ).catch(
    () => { return res.status(500).json('Internal Server Error'); }
  );
});

routerRO.get('/restockOrdersIssued', (req, res) => {
  roManager.getAllROIssued().then(
    (list) => { return res.status(200).json(list); }
  ).catch(
    () => { return res.status(500).json('Internal Server Error'); }
  );
});

routerRO.get('/restockOrders/:id', param('id').isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json('Unprocessable Entity')
  }
  roManager.getRO(req.params.id).then(
    (ro) => {
      if (ro === undefined) {
        return res.status(404).json('Not found');
      }
      // TODO: create the product array
      return res.status(200).json(ro);
    }
  ).catch(
    () => { return res.status(500).json('Internal Server Error'); }
  );

})

routerRO.get('/restockOrders/:id/returnItems', param('id').isInt(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json('Unprocessable Entity');
  }
  roManager.getROReturnedItems(req.params.id).then(
    (list) => {
      return res.status(200).json(list);
    }
  ).catch(
    (err) => {
      if (err === 422) return res.status(422).json('Unprocessable Entity');
      return res.status(500).json('Internal Server Error');
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
      return res.status(422).json('Unprocessable Entity');
    }

    roManager.addRO(req.body).then(
      () => {
        // TODO: check issueDate
        return res.status(201).json('Success');
      }
    ).catch(
      (err) => {
        return res.status(err).json('Service Unavailable');
      }
    )
  });

// PUT
routerRO.put('/restockOrder/:id', param('id').isInt(),
  body('newState').isIn(['ISSUED', 'DELIVERY', 'DELIVERED', 'TESTED', 'COMPLETEDRETURN', 'COMPLETED']),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json('Unprocessable Entity');
    }

    roManager.updateStateRO(req.params.id, req.body.newState).then(
      () => {
        return res.status(200).json('Success');
      }
    ).catch(
      (err) => {
        return res.status(err).json(err === 503 ? 'Service Unavailable' : 'Not Found')
      }
    );
  })

routerRO.put('/restockOrder/:id/skuItems', param('id').isInt(),
  body('skuItems').isArray(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json('Unprocessable Entity');
    }

    roManager.addSkuItems(req.params.id, req.body.skuItems).then(
      () => {
        return res.status(200).json('Success');
      }
    ).catch(
      (err) => {
        if (err === 422) {
          console.log('asd');
          return res.status(422).json('Unprocessable Entity');
        } else if (err === 404) {
          return res.status(404).json('Not found');
        } else {
          return res.status(503).json('Service Unavailable');
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
      return res.status(422).json('Unprocessable Entity');
    }
    
    roManager.addTransportNote(req.params.id ,req.body.transportNote.deliveryDate).then(
      () => {
        return res.status(200).json('Success');
      }
    ).catch(
      (err) => {
        if (err === 422) {
          return res.status(422).json('Unprocessable Entity');
        } else if (err === 404) {
          return res.status(404).json('Not found');
        } else {
          return res.status(503).json('Service Unavailable');
        }
      }
    );
  }
);

// DELETE
routerRO.delete('/restockOrder/:id', param('id').isInt(), (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).status('Unprocessable Entity');
  }
  roManager.deleteRO(req.params.id).then(
    (ok) => {
      return res.status(ok).json('Success');
    }
  ).catch(
    (err) => {
      return res.status(err).json('Service Unavailable');
    }
  );
})




module.exports = routerRO;