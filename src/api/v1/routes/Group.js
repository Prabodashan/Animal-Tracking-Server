// ----------Third-party libraries & modules----------
const express = require("express");

// ----------Custom libraries & modules----------
const {
  CreateGroup,
  editGroupDevice,
  GetGroupsByUserId,
  GetDevicesByGroupId,
  UpdateGroup,
  DeleteGroup,
} = require("../controllers");

const { AuthenticateUser, AuthorizeUser } = require("../middlewares");

// Initialize the router
const router = express.Router();

// Add machine
router.post(
  "/addgroup",
  AuthenticateUser,
  // AuthorizeUser(["admin", "member"]),
  CreateGroup
);

// Update machine
router.put("/editgroupdevice/:groupId", AuthenticateUser, editGroupDevice);

// Update machine
router.put("/updategroup/:groupId", AuthenticateUser, UpdateGroup);

// Delete machine
router.delete("/deletegroup/:groupId", AuthenticateUser, DeleteGroup);

// Get group by userid
router.get("/all", AuthenticateUser, GetGroupsByUserId);
router.get("/one/:groupId", AuthenticateUser, GetDevicesByGroupId);

module.exports = router;
