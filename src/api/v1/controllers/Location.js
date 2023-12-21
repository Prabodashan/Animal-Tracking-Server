// ----------Custom libraries and modules----------
const { LocationModel, DeviceModel } = require("../models");
const { getDateTime } = require("../helpers");

// ----------Conroller function to added new weighing data----------
const CreateLocationData = async (req, res) => {
  // Request body
  const { deviceId, latitude, longitude, dateCreated, timeCreated } = req.query;

  // const dateTime = getDateTime();

  try {
    // Check if the LocationDevice with the specified ID exists
    const deviceExists = await DeviceModel.exists({
      _id: id,
    });

    if (!deviceExists) {
      return res.status(404).json({
        status: false,
        error: {
          message: "Device not found with the specified ID.",
        },
      });
    }

    // New LocationData
    const newLocationData = new LocationDataModel({
      deviceId,
      latitude,
      longitude,
      dateCreated,
      timeCreated,
    });

    // Save new LocationData to the database
    const savedLocationData = await newLocationData.save();

    return res.status(201).json({
      status: true,
      locationData: savedLocationData,
      success: {
        message: "Successfully added a new Location data!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to add a new Location data!",
      },
    });
  }
};

// ----------Conroller function to update weighing device by id----------
const UpdateLocationData = async (req, res) => {
  // Request parameters
  const { locationDataId } = req.params;

  try {
    const locationData = await LocationDataModel.findOne({
      _id: locationDataId,
    }).exec();
    if (!locationData) {
      return res.status(404).json({
        status: true,
        error: { message: "Location data not found" },
      });
    }
    const updateLocationData = await LocationModel.findOneAndUpdate(
      { _id: locationData._id },
      {
        $set: req.body,
      },
      {
        new: false,
      }
    );

    return res.status(200).json({
      status: true,
      updateLocationData,
      success: {
        message: "Successfully updated the weighing data!",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to update the weighing data!",
      },
    });
  }
};

// ----------Conroller function to delete weighing device by id----------
const DeleteLocationData = async (req, res) => {
  // Request parameters
  const { locationDataId } = req.params;
  try {
    const locationData = await LocationModel.findOne({
      _id: locationDataId,
    }).exec();
    if (!locationData) {
      return res.status(404).json({
        status: true,
        error: { message: "Location data not found" },
      });
    }
    const deleteLocationData = await LocationDataModel.findOneAndDelete({
      _id: locationDataId,
    }).exec();
    return res.status(200).json({
      status: true,
      success: {
        message: "Location data successfully deleted",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to delete the location data!",
      },
    });
  }
};

module.exports = {
  CreateLocationData,
  UpdateLocationData,
  DeleteLocationData,
};
