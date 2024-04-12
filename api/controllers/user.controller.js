import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

export const getAllUsers = async (req, res, next )=>{
    try {
        const users = await User.find();
       return next(createSuccess(200, 'All users', users));
    } catch (error) {
        return next(createError(500, "Internal server Error"));
    }
};


export const getUserById = async (req, res, next)=>{
    try {
        const user = await User.findById(req.params.id); 

        if(!user){
            return next(createError(500, "Internal Server Error"))
        }
        return next(createSuccess(200, "User found" , user));
    } catch (error) {
        return next(createError(500, "Internal server Error"));
    }
};