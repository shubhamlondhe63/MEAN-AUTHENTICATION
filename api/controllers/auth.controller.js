import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

// Register user in DB

export const register = async (req, res, next) => {
  try {
    const role = await Role.find({ role: "User" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      profileImage: req.body.profileImage,
      isAdmin: req.body.isAdmin,
      roles: role,
    });
    await newUser.save();
    return next(createSuccess(200, "User Registered Successfully!"));
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};

// Login user

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    .populate("roles", "role");
    const { roles } = user;

    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Password is incorrect");
    }
    const token = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
      roles: roles,
    }, process.env.JWT_SECRET);
    res.cookie('access_token', token, { httpOnly: true}).status(200).json({
      status: 200, 
      message : "Login successfully",
      data : user
    })
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};

// register as an Admin

export const regiterAsAdmin = async (req, res, next) => {
  try {
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      // profileImage: req.body.profileImage,
      isAdmin: true,
      roles: role,
    });
    await newUser.save();
    return next(createSuccess(200, "Admin Registered Successfully!"));
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};