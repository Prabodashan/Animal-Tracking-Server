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
  "/add-data",
  // AuthenticateUser,
  // AuthorizeUser(["admin", "member"]),
  CreateLocationData
);

// Update weighing data
router.put(
  "/update-data/:locationDataId",
  AuthenticateUser,
  UpdateLocationData
);

// Delete weighing data
router.delete(
  "/delete-data/:locationDataId",
  AuthenticateUser,
  DeleteLocationData
);

module.exports = router;
