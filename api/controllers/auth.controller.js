import Role from "../models/Role.js"

export const register = async (req, res, next ) => {
 
    const role = await new Role.find({role : "User"});
}