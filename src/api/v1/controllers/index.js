// ----------Imports----------
const { RegisterUser, LoginUser, GetUserById } = require("./User");
const {
  CreateDevice,
  GetAllDeviceByUserId,
  GetDevicesDataById,
  UpdateDevice,
  DeleteDevice,
  GetDevicesRecentDataById,
} = require("./Device");

const {
  CreateGroup,
  editGroupDevice,
  GetGroupsByUserId,
  GetDevicesByGroupId,
  UpdateGroup,
  DeleteGroup,
} = require("./Group");
const {
  CreateLocationData,
  UpdateLocationData,
  DeleteLocationData,
} = require("./Location");

const {
  GenerateAccessToken,
  DeleteRefreshToken,
  GetUserInfoByToken,
} = require("./UserToken");

// ----------Exports----------
module.exports = {
  RegisterUser,
  LoginUser,
  GetUserById,
  GenerateAccessToken,
  DeleteRefreshToken,
  GetUserInfoByToken,
  CreateDevice,
  GetAllDeviceByUserId,
  CreateDevice,
  GetAllDeviceByUserId,
  GetDevicesDataById,
  UpdateDevice,
  DeleteDevice,
  GetDevicesRecentDataById,
  CreateGroup,
  editGroupDevice,
  GetGroupsByUserId,
  GetDevicesByGroupId,
  UpdateGroup,
  DeleteGroup,
  CreateLocationData,
  UpdateLocationData,
  DeleteLocationData,
};
