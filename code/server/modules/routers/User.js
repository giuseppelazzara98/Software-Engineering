"use strict";
const express = require("express");
const routerUser = express.Router();

const User_dao = require("../dao/User_dao");
const passport = require("../passport");

var fs = require("fs");
var {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");
const { oneOf,param, body, validationResult ,check} = require("express-validator");

var userSchema = JSON.parse(
  fs.readFileSync("./JSON-Schemas/user_schema.json").toString()
);
var validator = new Validator({ allErrors: true });
validator.ajv.addSchema([userSchema]);
var validate = validator.validate;

const dao = new User_dao();

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).end();
};

routerUser.get("/userinfo", (req, res) => {});  

routerUser.get("/suppliers", /*isLoggedIn,*/ (req, res) => {
  // todo: check is req.user.type == "manager"
  dao
    .getAllSuppliers()
    .then((suppliers) => {
      res.status(200).json(suppliers);
    })
    .catch((err) => {
      res.status(err).json(err.message);
    });
});

routerUser.get('/users', (req, res) => {
  dao.getAllUsers().then(
    (users) => {
      return res.status(200).json(users);
    }
  ).catch(e => res.status(500).end())
})

routerUser.post(
  "/newUser",
  validate({ body: userSchema }),
  body("username").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    dao
      .addNewUser(req.body)
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);

// login
routerUser.post("/customerSessions", body("username").isEmail() , function (req, res, next) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).end();
    }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).end();
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);
      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});


routerUser.post("/managerSessions", body("username").isEmail() , function (req, res, next) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).end();
    }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).end();
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);
      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});


routerUser.post("/supplierSessions", body("username").isEmail() , function (req, res, next) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).end();
    }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).end();
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);
      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});


routerUser.post("/clerkSessions", body("username").isEmail() , function (req, res, next) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).end();
    }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).end();
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);
      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});


routerUser.post("/qualityEmployeeSessions", body("username").isEmail() , function (req, res, next) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).end();
    }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).end();
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);
      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});



routerUser.post("/deliveryEmployeeSessions", body("username").isEmail() , function (req, res, next) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).end();
    }
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).end();
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err) return next(err);
      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});




// logout
routerUser.post("/logout", /*isLoggedIn,*/ (req, res) => {
  req.logout();
  res.status(200).end();
});

routerUser.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(422).end();
  } else next(err);
});

routerUser.put(
  "/users/:username",
  
  param("username").isEmail().not().isEmpty(),
  check("oldType").not().isIn(["manager"]),
  check("newType").isIn([
    "customer",
    "qualityEmployee",
    "clerk",
    "deliveryEmployee",
    "supplier",
  ]),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    dao
      .updateUserByUsername(req.params.username, req.body)
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);
routerUser.delete(
  "/users/:username/:type",
  oneOf([
    [
      param("username").isEmail(),
      param("type").not().isIn(["manager"]),
      param("type").isIn([
        "customer",
        "qualityEmployee",
        "clerk",
        "deliveryEmployee",
        "supplier",
      ]),
    ],
  ]),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).end();
    }
    dao
      .deleteUserByUsernameAndType(req.params.username,req.params.type)
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);
routerUser.delete(
  "/users",
  
  (req, res) => {
    dao
      .deleteAll()
      .then((code) => {
        return res.status(code).end();
      })
      .catch((err) => {
        return res.status(err).end();
      });
  }
);
module.exports = routerUser;
