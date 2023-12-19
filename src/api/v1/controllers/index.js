// ----------Imports----------
const { RegisterUser, LoginUser, GetUserById } = require("./Customer");
const {
  RegisterOperator,
  LoginOperator,
  GetOperatorById,
} = require("./Operator");
const {
  CreateWeighingDevice,
  GetAllDeviceDetails,
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
  Createitem,
  GetAllitems,
  GetitemsByUserId,
  Updateitem,
  Deleteitem,
} = require("./item");
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
  CreateWeighingDevice,
  GetAllDeviceDetails,
  GetAllWeighingDevicesDetails,
  GetWeighingDevicesDataById,
  GetWeighingDeviceDetailsById,
  GetWeighingDevicesRecentDataById,
  UpdateWeighingDevice,
  DeleteWeighingDevice,
  CreateWeighingData,
  UpdateWeighingData,
  DeleteWeighingData,
  Createitem,
  GetAllitems,
  GetitemsByUserId,
  Updateitem,
  Deleteitem,
};
