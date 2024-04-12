import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


// Middlewares 
app.use(express.json());
app.use(cookieParser());
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);


// Error Handler Middleware
app.use((obj, req, res, next)=>{
  const statusCode = obj.status || 500; 
  const message = obj.message || "Something went wrong!";
  return res.status(statusCode).json({
    success : [200, 201, 204].some(a => a === obj.status) ? true : false, 
    status : statusCode,
    message : message,
    data : obj.data
  });
});

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
