// ----------Third-party libraries & modules----------
const express = require("express");

// ----------Custom libraries & modules----------
const {
  CreateLocationData,
  UpdateLocationData,
  DeleteLocationData,
} = require("../controllers");

const { AuthenticateUser, AuthorizeUser } = require("../middlewares");

// Initialize the router
const router = express.Router();

// Add weighing data
router.get(
  "/adddata",
  // AuthenticateUser,
  // AuthorizeUser(["admin", "member"]),
  CreateLocationData
);

// Update weighing data
router.put(
  "/updatedata/:locationDataId",
  AuthenticateUser,
  UpdateLocationData
);

// Delete weighing data
router.delete(
  "/deletedata/:locationDataId",
  AuthenticateUser,
  DeleteLocationData
);

module.exports = router;
