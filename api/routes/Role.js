import express from "express";
import Role from "../models/Role.js";

const router = express.Router();

// Create new role in DB ;

router.post("/create", async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role();
      await newRole.save();
      res.send("Role Created...");
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error...");
  }
});

export default router; 