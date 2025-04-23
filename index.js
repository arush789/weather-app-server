//server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Replace 'YOUR_MONGODB_URI' with your actual MongoDB connection URI

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

// Create a Mongoose model for weather data
const WeatherData = mongoose.model("WeatherData", {
  city: String,
  country: String,
  temperature: Number,
  description: String,
  icon: String,
});

// Route to get all weather data
app.get("/api/weather", async (req, res) => {
  try {
    const weatherData = await WeatherData.find();
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
