// ----------Custom libraries and modules----------
const mongoose = require("mongoose");
const { DeviceModel } = require("../models");

// ----------Conroller function to added new Device----------
const CreateDevice = async (req, res) => {
  // Request body
  const {
    title,
    customerId,
    dateCreated,
    timeCreated,
    dateUpdated,
    timeUpdated,
  } = req.body;
  const { userId } = req.user;

  try {
    // Check if key already exist
    const device = await DeviceModel.findOne({
      $or: [{ title }],
    }).exec();
    if (device) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Device name already exist!",
        },
      });
    }

    // New Device
    const newDevice = new DeviceModel({
      title,
      userId: customerId,
      dateCreated,
      timeCreated,
      dateUpdated,
      timeUpdated,
      createdBy: userId,
    });

    // Save new Device to the database
    const savedDevice = await newDevice.save();

    return res.status(201).json({
      status: true,
      Device: savedDevice,
      success: {
        message: "Successfully added a new weighing device!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to add a new weighing device!",
      },
    });
  }
};

const GetAllDeviceByUserId = async (req, res) => {
  const { userId } = req.user;

  try {
    // Fetch all devices from the Devices model
    const devices = await DeviceModel.find({
      userId,
    });

    return res.status(200).json({
      status: true,
      devices,
      success: {
        message: "Successfully fetched all device details!",
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to fetch device details!",
      },
    });
  }
};

// ----------Conroller function to get weighing device by id----------
// const GetDevicesDataById = async (req, res) => {
//   // Request parameters
//   const { deviceId } = req.params;
//   // console.log(mongoose.mongo.BSONPure.ObjectID.fromHexString(deviceId));

//   try {
//     // Check if the Device with the specified ID exists
//     const DeviceExists = await DeviceModel.exists({
//       _id: deviceId,
//     });

//     if (!DeviceExists) {
//       return res.status(404).json({
//         status: false,
//         error: {
//           message: "Device not found with the specified ID.",
//         },
//       });
//     }

//     const DeviceData = await DeviceModel.aggregate([
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(deviceId),
//         },
//       },
//       {
//         $lookup: {
//           from: "weighingdatas", // The name of the collection (Assuming it's named 'weighingdata')
//           localField: "_id",
//           foreignField: "DeviceId",
//           as: "locationData",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           locationData: { $reverseArray: "$locationData" },
//           // Add other fields if needed
//         },
//       },
//     ]);
//     return res.status(200).json({
//       status: true,
//       DeviceData,
//       success: {
//         message: "Successfully fetched the weighing devices!",
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       status: false,
//       error: {
//         message: "Failed to fetch the weighing devices!",
//       },
//     });
//   }
// };

// work for the daily datas
// const GetDevicesDataById = async (req, res) => {
//   // Request parameters
//   const { deviceId } = req.params;
//   const { period } = req.query;

//   try {
//     // Check if the Device with the specified ID exists
//     const DeviceExists = await DeviceModel.exists({
//       _id: deviceId,
//     });

//     if (!DeviceExists) {
//       return res.status(404).json({
//         status: false,
//         error: {
//           message: "Device not found with the specified ID.",
//         },
//       });
//     }

//     let aggregationPipeline = [
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(deviceId),
//         },
//       },
//       {
//         $lookup: {
//           from: "weighingdatas",
//           localField: "_id",
//           foreignField: "DeviceId",
//           as: "locationData",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           title: 1, // Include the title field from Device
//           imageUrl: 1, // Include the imageUrl field from Device
//           userId: 1, // Include the userId field from Device
//           locationData: 1,
//           // Add other fields if needed
//         },
//       },
//     ];

//     if (period === "daily") {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       aggregationPipeline.push(
//         {
//           $unwind: "$locationData",
//         },
//         {
//           $match: {
//             "locationData.createdAt": {
//               $gte: today,
//               $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
//             },
//           },
//         },
//         {
//           $group: {
//             _id: "$_id",
//             title: { $first: "$title" },
//
//             userId: { $first: "$userId" },
//             locationData: { $push: "$locationData" },
//             // Add other fields if needed
//           },
//         }
//       );
//     }

//     const DeviceData = await DeviceModel.aggregate(
//       aggregationPipeline
//     );

//     return res.status(200).json({
//       status: true,
//       DeviceData,
//       success: {
//         message: "Successfully fetched the weighing devices!",
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       status: false,
//       error: {
//         message: "Failed to fetch the weighing devices!",
//       },
//     });
//   }
// };

//give the this week all data
// const GetDevicesDataById = async (req, res) => {
//   // Request parameters
//   const { deviceId } = req.params;
//   const { period } = req.query;

//   try {
//     // Check if the Device with the specified ID exists
//     const DeviceExists = await DeviceModel.exists({
//       _id: deviceId,
//     });

//     if (!DeviceExists) {
//       return res.status(404).json({
//         status: false,
//         error: {
//           message: "Device not found with the specified ID.",
//         },
//       });
//     }

//     let aggregationPipeline = [
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(deviceId),
//         },
//       },
//       {
//         $lookup: {
//           from: "weighingdatas",
//           localField: "_id",
//           foreignField: "DeviceId",
//           as: "locationData",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           title: 1,
//           imageUrl: 1,
//           userId: 1,
//           locationData: 1,
//           // Add other fields if needed
//         },
//       },
//     ];

//     if (period === "daily") {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       aggregationPipeline.push(
//         {
//           $unwind: "$locationData",
//         },
//         {
//           $match: {
//             "locationData.createdAt": {
//               $gte: today,
//               $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
//             },
//           },
//         },
//         {
//           $group: {
//             _id: "$_id",
//             title: { $first: "$title" },
//
//             userId: { $first: "$userId" },
//             locationData: { $push: "$locationData" },
//             // Add other fields if needed
//           },
//         }
//       );
//     } else if (period === "weekly") {
//       const startOfWeek = new Date();
//       startOfWeek.setHours(0, 0, 0, 0);
//       startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the current week

//       aggregationPipeline.push(
//         {
//           $unwind: "$locationData",
//         },
//         {
//           $match: {
//             "locationData.createdAt": {
//               $gte: startOfWeek,
//               $lt: new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000), // End of the current week
//             },
//           },
//         },
//         {
//           $group: {
//             _id: "$_id",
//             title: { $first: "$title" },
//
//             userId: { $first: "$userId" },
//             locationData: { $push: "$locationData" },
//             // Add other fields if needed
//           },
//         }
//       );
//     }

//     const DeviceData = await DeviceModel.aggregate(
//       aggregationPipeline
//     );

//     return res.status(200).json({
//       status: true,
//       DeviceData,
//       success: {
//         message: "Successfully fetched the weighing devices!",
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       status: false,
//       error: {
//         message: "Failed to fetch the weighing devices!",
//       },
//     });
//   }
// };

// const GetDevicesDataById = async (req, res) => {
//   // Request parameters
//   const { deviceId } = req.params;
//   const { period } = req.query;

//   try {
//     // Check if the Device with the specified ID exists
//     const DeviceExists = await DeviceModel.exists({
//       _id: deviceId,
//     });

//     if (!DeviceExists) {
//       return res.status(404).json({
//         status: false,
//         error: {
//           message: "Device not found with the specified ID.",
//         },
//       });
//     }

//     let aggregationPipeline = [
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(deviceId),
//         },
//       },
//       {
//         $lookup: {
//           from: "weighingdatas",
//           localField: "_id",
//           foreignField: "DeviceId",
//           as: "locationData",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           title: 1,
//           imageUrl: 1,
//           userId: 1,
//           locationData: 1,
//           // Add other fields if needed
//         },
//       },
//     ];

//     if (period === "daily") {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       aggregationPipeline.push(
//         {
//           $unwind: "$locationData",
//         },
//         {
//           $match: {
//             "locationData.createdAt": {
//               $gte: today,
//               $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
//             },
//           },
//         },
//         {
//           $group: {
//             _id: "$_id",
//             title: { $first: "$title" },
//
//             userId: { $first: "$userId" },
//             locationData: { $push: "$locationData" },
//             // Add other fields if needed
//           },
//         }
//       );
//     } else if (period === "weekly") {
//       const startOfWeek = new Date();
//       startOfWeek.setHours(0, 0, 0, 0);
//       startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the current week

//       aggregationPipeline.push(
//         {
//           $unwind: "$locationData",
//         },
//         {
//           $match: {
//             "locationData.createdAt": {
//               $gte: startOfWeek,
//               $lt: new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000), // End of the current week
//             },
//           },
//         },
//         {
//           $sort: {
//             "locationData.createdAt": -1,
//           },
//         },
//         {
//           $group: {
//             _id: {
//               _id: "$_id",
//               date: {
//                 $dateToString: {
//                   format: "%Y-%m-%d",
//                   date: "$locationData.createdAt",
//                 },
//               },
//             },
//             title: { $first: "$title" },
//
//             userId: { $first: "$userId" },
//             locationData: { $first: "$locationData" },
//             // Add other fields if needed
//           },
//         }
//       );
//     }

//     const DeviceData = await DeviceModel.aggregate(
//       aggregationPipeline
//     );

//     return res.status(200).json({
//       status: true,
//       DeviceData,
//       success: {
//         message: "Successfully fetched the weighing devices!",
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       status: false,
//       error: {
//         message: "Failed to fetch the weighing devices!",
//       },
//     });
//   }
// };

// work for the week
// const GetDevicesDataById = async (req, res) => {
//   // Request parameters
//   const { deviceId } = req.params;
//   const { period } = req.query;

//   try {
//     // Check if the Device with the specified ID exists
//     const DeviceExists = await DeviceModel.exists({
//       _id: deviceId,
//     });

//     if (!DeviceExists) {
//       return res.status(404).json({
//         status: false,
//         error: {
//           message: "Device not found with the specified ID.",
//         },
//       });
//     }

//     let aggregationPipeline = [
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(deviceId),
//         },
//       },
//       {
//         $lookup: {
//           from: "weighingdatas",
//           localField: "_id",
//           foreignField: "DeviceId",
//           as: "locationData",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           title: 1,
//           imageUrl: 1,
//           userId: 1,
//           locationData: 1,
//         },
//       },
//     ];

//     if (period === "daily") {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       aggregationPipeline.push(
//         {
//           $unwind: "$locationData",
//         },
//         {
//           $match: {
//             "locationData.createdAt": {
//               $gte: today,
//               $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
//             },
//           },
//         },
//         {
//           $group: {
//             _id: "$_id",
//             title: { $first: "$title" },
//
//             userId: { $first: "$userId" },
//             locationData: { $push: "$locationData" },
//             // Add other fields if needed
//           },
//         }
//       );
//     } else if (period === "weekly") {
//       const startOfWeek = new Date();
//       startOfWeek.setHours(0, 0, 0, 0);
//       startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the current week

//       aggregationPipeline.push(
//         {
//           $unwind: "$locationData",
//         },
//         {
//           $match: {
//             "locationData.createdAt": {
//               $gte: startOfWeek,
//               $lt: new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000), // End of the current week
//             },
//           },
//         },
//         {
//           $sort: {
//             "locationData.createdAt": 1,
//           },
//         },
//         {
//           $group: {
//             _id: {
//               _id: "$_id",
//               date: {
//                 $dateToString: {
//                   format: "%Y-%m-%d",
//                   date: "$locationData.createdAt",
//                 },
//               },
//             },
//             title: { $first: "$title" },
//
//             userId: { $first: "$userId" },
//             locationData: { $last: "$locationData" },
//           },
//         },
//         {
//           $group: {
//             _id: "$_id._id",
//             title: { $first: "$title" },
//
//             userId: { $first: "$userId" },
//             locationData: { $push: "$locationData" },
//           },
//         }
//       );
//     }

//     const DeviceData = await DeviceModel.aggregate(
//       aggregationPipeline
//     );

//     return res.status(200).json({
//       status: true,
//       DeviceData,
//       success: {
//         message: "Successfully fetched the weighing devices!",
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       status: false,
//       error: {
//         message: "Failed to fetch the weighing devices!",
//       },
//     });
//   }
// };

const GetDevicesDataById = async (req, res) => {
  // Request parameters
  const { deviceId } = req.params;
  const { period } = req.query;

  try {
    // Check if the Device with the specified ID exists
    const DeviceExists = await DeviceModel.exists({
      _id: deviceId,
    });

    if (!DeviceExists) {
      return res.status(404).json({
        status: false,
        error: {
          message: "Device not found with the specified ID.",
        },
      });
    }

    let aggregationPipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(deviceId),
        },
      },
      {
        $lookup: {
          from: "Locations",
          localField: "_id",
          foreignField: "deviceId",
          as: "locationData",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          imageUrl: 1,
          userId: 1,
          locationData: 1,
        },
      },
    ];

    if (period === "daily") {
      // const today = new Date();
      // today.setHours(0, 0, 0, 0);

      // aggregationPipeline.push(
      //   {
      //     $unwind: "$locationData",
      //   },
      //   {
      //     $match: {
      //       "locationData.createdAt": {
      //         $gte: today,
      //         $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      //       },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$_id",
      //       title: { $first: "$title" },
      //
      //       userId: { $first: "$userId" },
      //       locationData: { $push: "$locationData" },
      //     },
      //   }
      // );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      aggregationPipeline.push(
        {
          $unwind: "$locationData",
        },
        {
          $match: {
            "locationData.createdAt": {
              $gte: today,
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $sort: {
            "locationData.createdAt": 1,
          },
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              hour: {
                $hour: "$locationData.createdAt",
              },
            },
            title: { $first: "$title" },

            userId: { $first: "$userId" },
            locationData: { $last: "$locationData" },
          },
        },
        {
          $group: {
            _id: "$_id._id",
            title: { $first: "$title" },

            userId: { $first: "$userId" },
            locationData: { $push: "$locationData" },
          },
        }
      );
    } else if (period === "weekly") {
      const startOfWeek = new Date();
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the current week

      aggregationPipeline.push(
        {
          $unwind: "$locationData",
        },
        {
          $match: {
            "locationData.createdAt": {
              $gte: startOfWeek,
              $lt: new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000), // End of the current week
            },
          },
        },
        {
          $sort: {
            "locationData.createdAt": 1,
          },
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$locationData.createdAt",
                },
              },
            },
            title: { $first: "$title" },

            userId: { $first: "$userId" },
            locationData: { $last: "$locationData" },
          },
        },
        {
          $group: {
            _id: "$_id._id",
            title: { $first: "$title" },

            userId: { $first: "$userId" },
            locationData: { $push: "$locationData" },
          },
        }
      );
    } else if (period === "monthly") {
      const startOfMonth = new Date();
      startOfMonth.setHours(0, 0, 0, 0);
      startOfMonth.setDate(1); // Start of the current month

      aggregationPipeline.push(
        {
          $unwind: "$locationData",
        },
        {
          $match: {
            "locationData.createdAt": {
              $gte: startOfMonth,
              $lt: new Date(
                startOfMonth.getFullYear(),
                startOfMonth.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
              ), // End of the current month
            },
          },
        },
        {
          $sort: {
            "locationData.createdAt": 1,
          },
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              date: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$locationData.createdAt",
                },
              },
            },
            title: { $first: "$title" },

            userId: { $first: "$userId" },
            locationData: { $last: "$locationData" },
          },
        },
        {
          $group: {
            _id: "$_id._id",
            title: { $first: "$title" },

            userId: { $first: "$userId" },
            locationData: { $push: "$locationData" },
          },
        }
      );
    }

    // Add a $sort stage to sort by createdAt in ascending order
    aggregationPipeline.push(
      {
        $unwind: "$locationData",
      },
      {
        $sort: {
          "locationData.createdAt": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },

          userId: { $first: "$userId" },
          locationData: { $push: "$locationData" },
        },
      }
    );

    const DeviceData = await DeviceModel.aggregate(aggregationPipeline);

    return res.status(200).json({
      status: true,
      DeviceData,
      success: {
        message: "Successfully fetched the weighing devices!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to fetch the weighing devices!",
      },
    });
  }
};

//----------Conroller function to get weighing device by id----------
const GetDevicesRecentDataById = async (req, res) => {
  // Request parameters
  const { deviceId } = req.params;
  // console.log(mongoose.mongo.BSONPure.ObjectID.fromHexString(deviceId));

  try {
    // Check if the Device with the specified ID exists
    const DeviceExists = await DeviceModel.exists({
      _id: deviceId,
    });

    if (!DeviceExists) {
      return res.status(404).json({
        status: false,
        error: {
          message: "Device not found with the specified ID.",
        },
      });
    }

    const DeviceData = await DeviceModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(deviceId),
        },
      },
      {
        $lookup: {
          from: "locations", // The name of the collection (Assuming it's named 'weighingdata')
          localField: "_id",
          foreignField: "deviceId",
          as: "locationData",
        },
      },
      {
        $unwind: "$locationData", // Unwind to separate documents for each entry in locationData array
      },
      {
        $sort: {
          "locationData.createdAt": -1, // Sort by createdAt in descending order
        },
      },
      {
        $limit: 1, // Limit to the most recent document
      },
    ]);
    return res.status(200).json({
      status: true,
      DeviceData,
      success: {
        message: "Successfully fetched the weighing devices!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to fetch the weighing devices!",
      },
    });
  }
};

const GetGroupDevicesRecentDataById = async (req, res) => {
  // Request parameters

  const deviceIds = req.query.deviceIds.split(",");

  try {
    // Check if all Devices with the specified IDs exist
    const devicesExist = await DeviceModel.exists({
      _id: { $in: deviceIds },
    });

    if (!devicesExist) {
      return res.status(404).json({
        status: false,
        error: {
          message: "One or more devices not found with the specified IDs.",
        },
      });
    }

    const devicesData = await Promise.all(
      deviceIds.map(async (deviceId) => {
        const deviceData = await DeviceModel.aggregate([
          {
            $match: {
              _id: new mongoose.Types.ObjectId(deviceId),
            },
          },
          {
            $lookup: {
              from: "locations", // The name of the collection (Assuming it's named 'locations')
              localField: "_id",
              foreignField: "deviceId",
              as: "locationData",
            },
          },
          {
            $unwind:"$locationData",
             
          },
          {
            $sort: {
              "locationData.createdAt": -1, // Sort by createdAt in descending order
            },
          },
          {
            $limit: 1, // Limit to the most recent document
          },
          {
            $project: {
              _id: 1, // device ID
              title: 1, // device title
              latitude: "$locationData.latitude",
              longitude: "$locationData.longitude",
              createdAt: "$locationData.createdAt",
            },
          },
        ]);

        return {
          ...deviceData[0], // Return null if no data found for the device
        };
      })
    );

    return res.status(200).json({
      status: true,
      devicesData,
      success: {
        message: "Successfully fetched the devices data!",
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to fetch the devices data!",
      },
    });
  }
};

// ----------Conroller function to update weighing device by id----------
const UpdateDevice = async (req, res) => {
  // Request parameters
  const { deviceId } = req.params;

  try {
    const Device = await DeviceModel.findOne({
      _id: deviceId,
    }).exec();
    if (!Device) {
      return res.status(404).json({
        status: true,
        error: { message: "Weighing device not found" },
      });
    }
    const updateDevice = await DeviceModel.findOneAndUpdate(
      { _id: Device._id },
      {
        $set: req.body,
      },
      {
        new: false,
      }
    );

    return res.status(200).json({
      status: true,
      updateDevice,
      success: {
        message: "Successfully updated the weighing device!",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to update the weighing device!",
      },
    });
  }
};

// ----------Conroller function to delete weighing device by id----------
const DeleteDevice = async (req, res) => {
  // Request parameters
  const { deviceId } = req.params;
  try {
    const Device = await DeviceModel.findOne({
      _id: deviceId,
    }).exec();
    if (!Device) {
      return res.status(404).json({
        status: true,
        error: { message: "Weighing device not found" },
      });
    }
    const deleteDevice = await DeviceModel.findOneAndDelete({
      _id: deviceId,
    }).exec();
    return res.status(200).json({
      status: true,
      success: {
        message: "Weighing device successfully deleted",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to delete the weighing device!",
      },
    });
  }
};

module.exports = {
  CreateDevice,
  GetAllDeviceByUserId,
  GetDevicesDataById,
  UpdateDevice,
  DeleteDevice,
  GetDevicesRecentDataById,
  GetGroupDevicesRecentDataById,
};
