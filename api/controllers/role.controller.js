import Role from "../models/Role.js";

// Create role in Database

export const createRole = async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role(req.body);
      await newRole.save();
      res.send("Role Created...");
    } else {
      res.status(400).send("Bad Request");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error...");
  }
};

// Update Role in Database

export const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findById({ _id: req.params.id });
    if (role) {
      const newData = await Role.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).send("Role Updated");
    } else {
      res.status(404).send("Role not found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error...");
  }
};

// Get all the Roles

export const getAllRoles = async (req, res, next) => {
  try {
    const allRoles = await Role.find({});
    return res.status(200).send(allRoles);
  } catch (error) {
    res.status(500).send("Internal Server Error...");
  }
};

// Delete role from DB

export const deleteRole = async (req, res, next) => {
    try {
      const roleId = req.params.id;
      const role = await Role.findById(roleId);
  
      if (role) {
        const deletedRole = await Role.findByIdAndDelete(roleId);
        return res.status(200).send({ message: "Role Deleted", deletedRole });
      } else {
        return res.status(404).send("Role not found");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      res.status(500).send("Internal Server Error...");
    }
  };
  
