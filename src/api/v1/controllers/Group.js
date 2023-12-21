// ----------Custom libraries and modules----------
const { GroupModel } = require("../models");

// ----------Conroller function to added new group----------
const CreateGroup = async (req, res) => {
  // Request body
  const { title, dateCreated, timeCreated, dateUpdated, timeUpdated } =
    req.body;
  const { userId } = req.user;

  try {
    // Check if key already exist
    const group = await GroupModel.findOne({
      $or: [{ title }],
    }).exec();
    if (group) {
      return res.status(400).json({
        status: false,
        error: {
          message: "group already exist!",
        },
      });
    }

    // New Group
    const newGroup = new GroupModel({
      title,
      dateCreated,
      timeCreated,
      dateUpdated,
      timeUpdated,
      userId,
    });

    // Save new Group to the database
    const savedGroup = await newGroup.save();

    return res.status(201).json({
      status: true,
      Group: savedGroup,
      success: {
        message: "Successfully added a new group!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to add a new group!",
      },
    });
  }
};

// ----------Conroller function to added new device to group----------
const editGroupDevice = async (req, res) => {
  // Request body
  const { devices } = req.body; // Expecting an array of devices
  // Request parameters
  const { groupId } = req.params;

  try {
    // Check if group exist
    const group = await GroupModel.findOne({
      _id: groupId,
    }).exec();
    if (!group) {
      return res.status(404).json({
        status: true,
        error: { message: "group not found" },
      });
    }

    // Validate if devices is an array
    if (!Array.isArray(devices)) {
      return res.status(400).json({
        status: false,
        error: { message: "Invalid devices format. Expecting an array." },
      });
    }

    // Clear previous device IDs and push the new devices
    group.deviceList = [];
    group.deviceList.push(...devices);

    // Save new Group to the database
    const savedGroup = await group.save();

    return res.status(201).json({
      status: true,
      Group: savedGroup,
      success: {
        message: "Successfully added a device to group!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to add a device to group!",
      },
    });
  }
};

// ----------Conroller function to get group by id----------
const GetGroupsByUserId = async (req, res) => {
  // Request parameters
  const { userId } = req.user;

  try {
    const groups = await GroupModel.find({
      userId: userId,
    }).exec();
    return res.status(200).json({
      status: true,
      groups,
      success: {
        message: "Successfully fetched the groups!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to fetch the groups!",
      },
    });
  }
};

// ----------Conroller function to update group by id----------
const UpdateGroup = async (req, res) => {
  // Request parameters
  const { groupId } = req.params;
  // Extract the title from the request body
  const { title, dateUpdated, timeUpdated } = req.body;

  try {
    const group = await GroupModel.findOne({
      _id: groupId,
    }).exec();

    if (!group) {
      return res.status(404).json({
        status: true,
        error: { message: "Group not found" },
      });
    }

    // Check if the title is provided in the request body
    if (!title) {
      return res.status(400).json({
        status: false,
        error: { message: "Title is required for updating the group" },
      });
    }

    // Update only the title field
    group.title = title;
    // Update the group's timestamps
    group.dateUpdated = dateUpdated;
    group.timeUpdated = timeUpdated;

    // Save the updated group to the database
    const updatedGroup = await group.save();

    return res.status(200).json({
      status: true,
      updatedGroup,
      success: {
        message: "Successfully updated the group title!",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to update the group title!",
      },
    });
  }
};

// ----------Conroller function to delete group by id----------
const DeleteGroup = async (req, res) => {
  // Request parameters
  const { groupId } = req.params;
  try {
    const group = await GroupModel.findOne({
      _id: groupId,
    }).exec();
    if (!group) {
      return res.status(404).json({
        status: true,
        error: { message: "group not found" },
      });
    }
    const deleteGroup = await GroupModel.findOneAndDelete({
      _id: groupId,
    }).exec();
    return res.status(200).json({
      status: true,
      success: {
        message: "group successfully deleted",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: {
        message: "Failed to delete the group!",
      },
    });
  }
};

module.exports = {
  CreateGroup,
  editGroupDevice,
  GetGroupsByUserId,
  UpdateGroup,
  DeleteGroup,
};
