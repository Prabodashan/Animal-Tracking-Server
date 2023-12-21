// ----------Third-party libraries & modules----------
const mongoose = require("mongoose");

// ----------User schema----------
const GroupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    deviceList: [
      {
        deviceId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
    userId: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: String,
      required: true,
    },
    timeCreated: {
      type: String,
      required: true,
    },
    dateUpdated: {
      type: String,
      required: true,
    },
    timeUpdated: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
