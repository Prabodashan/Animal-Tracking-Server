// ----------Imports----------
const { RegisterUser, LoginUser, GetUserById } = require("./Customer");
const {
  RegisterOperator,
  LoginOperator,
  GetOperatorById,
} = require("./Operator");
const {
  CreateDevice,
  GetAllDeviceByUserId,
  GetAllDevicesDetails,
  GetDevicesDataById,
  UpdateDevice,
  DeleteDevice,
  GetDeviceDetailsById,
  GetDevicesRecentDataById,
} = require("./Device");

const {
  CreateGroup,
  editGroupDevice,
  GetGroupsByUserId,
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
  RegisterOperator,
  LoginOperator,
  GetOperatorById,
  GenerateAccessToken,
  DeleteRefreshToken,
  GetUserInfoByToken,
  CreateDevice,
  GetAllDeviceByUserId,
  CreateDevice,
  GetAllDeviceByUserId,
  GetAllDevicesDetails,
  GetDevicesDataById,
  UpdateDevice,
  DeleteDevice,
  GetDeviceDetailsById,
  GetDevicesRecentDataById,
  CreateGroup,
  editGroupDevice,
  GetGroupsByUserId,
  UpdateGroup,
  DeleteGroup,
  CreateLocationData,
  UpdateLocationData,
  DeleteLocationData,
};
