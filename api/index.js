import express from "express";
import mongoose from "mongoose";
import { connect } from "mongoose";
import dotenv from 'dotenv';
import roleRoute from "./routes/Role.js";

dotenv.config();

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
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // Exit the process if connection fails
    process.exit(1);
  }
};

app.use('/api/role/create', roleRoute);

app.listen(8800, () => {
  connectMongoDB();
  console.log("Port is running on 8800");
});
