import express from "express";
import mongoose from "mongoose";
import { connect } from "mongoose";

const app = express();

app.use("/api/login", (req, res) => {
  return res.send("Login is Success..");
});

app.use("/api/register", (req, res) => {
  return res.send("Registration is Success..");
});

app.use("/", (req, res) => {
  return res.send("Hello , Welcome to Home");
});

// connect To Database

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shubhamlondhe63:shubhamlondhe63@angularauth.dsv8mii.mongodb.net/?retryWrites=true&w=majority&appName=AngularAuth");
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // Exit the process if connection fails
    process.exit(1);
  }
};

app.listen(8800, () => {
  connectMongoDB();
  console.log("Port is running on 8800");
});
