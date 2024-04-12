import express from "express";
import { login, register, regiterAsAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

// route for register the user 

router.post('/register', register);

// route for login the user

router.post('/login', login);

// route for register as a Admin

router.post('/regiterAsAdmin', regiterAsAdmin);

export default router ;