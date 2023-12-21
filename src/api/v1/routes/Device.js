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
  "/add-device",
  AuthenticateUser,
  // AuthorizeUser(["admin", "member"]),
  CreateDevice
);

// Update machine
router.put("/update-device/:deviceId", AuthenticateUser, UpdateDevice);

// Delete machine
router.delete("/delete-device/:deviceId", AuthenticateUser, DeleteDevice);

// Get user by id
router.get("/item_details/all", GetAllDevicesDetails);
router.get("/item_details/one/:deviceId", GetDeviceDetailsById);
router.get("/all/", AuthenticateUser, GetAllDeviceByUserId);
router.get("/all/:deviceId", GetDevicesDataById);
router.get("/one/:deviceId", GetDevicesRecentDataById);

module.exports = router;
