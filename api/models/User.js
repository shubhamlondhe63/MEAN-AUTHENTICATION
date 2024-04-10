import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJEn8WCF8ZW4gIj5M4yWYvp-BfOjFtpeT-8ffys9-y1w&s",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    roles: {
        type : [Schema.Types.ObjectId],
        required: true,
        ref: "Role"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
