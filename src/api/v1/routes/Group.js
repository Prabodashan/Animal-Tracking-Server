// ----------Third-party libraries & modules----------
const express = require("express");

// ----------Custom libraries & modules----------
const {
  CreateGroup,
  editGroupDevice,
  GetGroupsByUserId,
  UpdateGroup,
  DeleteGroup,
} = require("../controllers");

const { AuthenticateUser, AuthorizeUser } = require("../middlewares");

// Initialize the router
const router = express.Router();

// Add machine
router.post(
  "/add-group",
  AuthenticateUser,
  // AuthorizeUser(["admin", "member"]),
  CreateGroup
);

// Update machine
router.put("/edit-group-device/:groupId", AuthenticateUser, editGroupDevice);

// Update machine
router.put("/update-group/:groupId", AuthenticateUser, UpdateGroup);

// Delete machine
router.delete("/delete-group/:groupId", AuthenticateUser, DeleteGroup);

// Get group by userid
router.get("/get-groups-user-id", AuthenticateUser, GetGroupsByUserId);

module.exports = router;
