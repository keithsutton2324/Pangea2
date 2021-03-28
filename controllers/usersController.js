const { restart } = require("nodemon");
const passport = require("../config/passport");
const db = require("../models");
var loggedIn = false;

// Defining methods for the usersController
module.exports = {

  findAll: function (req, res) {
    db
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  login: function (req, res) {
    if (req.user) {
      res.json(req.user);
    }
    else {
      res.json(req.user, loggedin);
      res.error(400);
    }
  },

  // Route for logging user out
  logout: function (req, res) {
    req.logout();
    res.redirect("/");
  },

  findOne: function (req, res) {
    db
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    console.log("create", req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log("update", req.body);
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
