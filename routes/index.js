const express = require("express");
var passport = require("passport");
var LdapStrategy = require("passport-ldapauth").Strategy;

const router = express.Router();

const MyMongoLib = require("../MyMongoLib.js");

const myMongoLib = MyMongoLib();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", (req, res) => {
  myMongoLib
    .getDocs()
    .then(doc => res.send(doc))
    .catch(err => res.send({ err: true, msg: err }));
});
router.get("/message", (req, res) => {
  console.log("Entro al Message");
  myMongoLib
    .getMessages("5dbe1c169602c70c29dbf384")
    .then(docs => res.send(docs))
    .catch(err => res.send({ err: true, msg: err }));
});

router.get("/auth", (req, res) => {
  var OPTS = {
    server: {
      url: "ldap://adua.uniandes.edu.co:389"
    },
    usernameField: "af.varon@uniandes.edu.co",
    passwordField: ""
  };

  console.log("OK?");
});

module.exports = router;
