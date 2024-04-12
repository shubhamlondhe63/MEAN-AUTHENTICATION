import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

// route for register the user 

router.post('/register', register);

// route for login the user

router.post('/login', login);

export default router ;