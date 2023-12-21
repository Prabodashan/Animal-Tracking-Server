// ----------Third-party libraries & modules----------
const express = require("express");

// ----------Custom libraries & modules----------
const {
  CreateDevice,
  GetAllDeviceByUserId,
  GetAllDevicesDetails,
  GetDevicesDataById,
  UpdateDevice,
  DeleteDevice,
  GetDeviceDetailsById,
  GetDevicesRecentDataById,
} = require("../controllers");

const { AuthenticateUser, AuthorizeUser } = require("../middlewares");

// Initialize the router
const router = express.Router();

// Add machine
router.post(
  "/adddevice",
  AuthenticateUser,
  // AuthorizeUser(["admin", "member"]),
  CreateDevice
);

// Update machine
router.put("/updatedevice/:deviceId", AuthenticateUser, UpdateDevice);

// Delete machine
router.delete("/deletedevice/:deviceId", AuthenticateUser, DeleteDevice);

// Get user by id
router.get("/all/", AuthenticateUser, GetAllDeviceByUserId);
router.get("/all/:deviceId", GetDevicesDataById);
router.get("/one/:deviceId", GetDevicesRecentDataById);

module.exports = router;
