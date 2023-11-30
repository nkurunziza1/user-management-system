import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
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
    role: {
      type: String,
      default: "assignee",
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dd92qmql1/image/upload/v1688126539/DEV/user_3_nec6s8.png",
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
