// ----------Third-party libraries & modules----------
const mongoose = require("mongoose");

// ----------User schema----------
const DeviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define a pre 'remove' hook
DeviceSchema.pre("remove", async function (next) {
  try {
    // Delete associated WeighingData documents
    await mongoose.model("Location").deleteMany({ deviceId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Device", DeviceSchema);
