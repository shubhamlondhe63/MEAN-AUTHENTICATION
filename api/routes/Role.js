import express from "express";
import Role from "../models/Role.js";
import { createRole, deleteRole, getAllRoles, updateRole } from "../controllers/role.controller.js";

const router = express.Router();

// Create new role in DB ;
router.post("/create", createRole );

// Update role in DB
router.put('/update/:id', updateRole);

// Get all the roles from DB
router.get('/roles', getAllRoles);

// delete role from DB 
router.delete('/delete/:id', deleteRole);

export default router;
