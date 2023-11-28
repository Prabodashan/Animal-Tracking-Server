const express = require("express");
const cors = require("cors");
const app = express();

// This will store the location data
let locationData = [];

app.use(express.json());
app.use(cors());

// Endpoint to receive and save data
app.post("/data", (req, res) => {
  const { latitude, longitude, deviceId } = req.body; // Assuming data is sent via POST request

  // Get the current date and time
  const dateTime = new Date().toISOString();

  // Store the data
  locationData.push({
    latitude,
    longitude,
    deviceId,
    dateTime,
  });

  res.send(deviceId);
});

// Endpoint to receive and save data
app.get("/data", (req, res) => {
  const { latitude, longitude, deviceId } = req.query; // Assuming data is sent via POST request

  // Get the current date and time
  const dateTime = new Date().toISOString();

  // Store the data
  locationData.push({
    latitude,
    longitude,
    deviceId,
    dateTime,
  });

  res.send("Data received and saved!");
});

// Endpoint to retrieve saved data
app.get("/", (req, res) => {
  res.json(locationData);
});

// Start the server
const PORT = 3000; // You can use any port you prefer
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
