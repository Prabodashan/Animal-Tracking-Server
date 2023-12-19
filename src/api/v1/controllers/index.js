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
  GetAllWeighingDevicesDetails,
  GetWeighingDevicesDataById,
  UpdateWeighingDevice,
  DeleteWeighingDevice,
  GetWeighingDeviceDetailsById,
  GetWeighingDevicesRecentDataById,
} = require("./Device");
const {
  CreateWeighingData,
  UpdateWeighingData,
  DeleteWeighingData,
} = require("./WeighingData");

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
  GetAllWeighingDevicesDetails,
  GetWeighingDevicesDataById,
  GetWeighingDeviceDetailsById,
  GetWeighingDevicesRecentDataById,
  UpdateWeighingDevice,
  DeleteWeighingDevice,
  CreateWeighingData,
  UpdateWeighingData,
  DeleteWeighingData,
};
