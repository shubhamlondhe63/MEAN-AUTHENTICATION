import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/role', roleRoute);
app.use('api/auth', authRoute);

// Connect to MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // Exit the process if connection fails
    process.exit(1);
  }
};

// Start the server after connecting to MongoDB
const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(8800, () => {
      console.log("Server is running on port 8800");
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
