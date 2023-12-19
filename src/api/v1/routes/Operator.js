// ----------Third-party libraries & modules----------
const express = require("express");

// ----------Custom libraries & modules----------
const {
  RegisterOperator,
  LoginOperator,
  GetOperatorById,
} = require("../controllers");
const { AuthenticateUser, AuthorizeUser } = require("../middlewares");

// Initialize the router
const router = express.Router();

// Register user
router.post("/register", RegisterOperator);

// Login user
router.post("/login", LoginOperator);

// Get user by id
router.get(
  "/:userId",
  AuthenticateUser,
  AuthorizeUser(["admin"]),
  GetOperatorById
);

module.exports = router;
