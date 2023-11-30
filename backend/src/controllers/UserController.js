import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailService } from "../services/email.service.js";
import { sendVerificationEmail } from "../services/email.service.js";
import { findUserByEmail } from "../services/user.service.js";
import {
  checkToken,
  generateToken,
} from "../services/generateToken.service.js";

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    const userData = {
      email,
      fullname,
      
    };
    const token = generateToken(userData, { expiresIn: process.env.EXPIRED });
    await sendVerificationEmail(email, fullname, token);
    return res.status(201).json({
      user,
      message:
        "User register successful. please check your email for verification !",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  console.log("token", token);
  try {
    const decodedToken = checkToken(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decodedToken.data.email });
    if (!decodedToken || !decodedToken.data || !decodedToken.data.email) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      return res.status(419).json({ message: "Token expired" });
    }
    if (user.isEmailVerified == true) {
      return res.status(200).json({ message: "Email already verified" });
    }
    user.isEmailVerified = true;
    await user.save();
    return res.status(200).json({ message: "email verified" });
  } catch (error) {
    if (error.status === 404) {
      res.status(500).json({ message: "token expired" });
    }
    console.log("errror", error);
    return res.status(500).json({ error: "something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ message: "Invalid email or password" });
  }

  const comparePassword = await bcrypt.compare(password, existingUser.password);

  if (!comparePassword) {
    return res.status(404).json({ message: "Invalid password" });
  }

  if (existingUser.isEmailVerified === false) {
    return res.status(409).json({ message: "please Verify your email" });
  }

  const token = jwt.sign(
    { email: existingUser.email, id: existingUser._id, role: existingUser._id },
    process.env.SECRET_KEY,
    { expiresIn: process.env.EXPIRED }
  );

  res.set("Authorization", `Bearer ${token}`);
  res.status(200).json({ message: "User logged in", token,  existingUser});
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const singleUser = await User.findOne({ _id: userId });
    if (!singleUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(singleUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error or ID not found" });
  }
};



const fillEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const userInfo = {
        email: user.email,
        id: user.userID,
      };
      const token = generateToken(userInfo, { expiresIn: process.env.EXPIRED });
      const sendToEmail = req.body.email;
      const link = `${process.env.APP_URL}/auth/reset-password/${token}`;
      const HTMLText = `<html>
      <head>
      <style>
      .controler{
       display: flex;
       justify-content: center;
       align-items: center;
       background-color: gainsboro;
      }
      .container {
        border: 2px;
        color: #fff;
      }
      .button {
        background-color: #8a7a99;
        padding: 10px 20px;
        text-decoration: none;
        font-weight: bold;
        border-radius: 4px;
      }
      .button:hover{
       background-color: #9B51E0;
      }
      .container-full{
        background-color: white;
        border-radius: 4px;
        box-shadow: 8px white;
        position: relative;
        opacity: 70%;
        width: 60%;
        padding: 8px 8px 8px 8px;
        margin: auto;
      }
      .container-small{
       position: absolute;
       border-radius: 4px 4px 0px 0px;
       top: 0;
       left: 0;
       background-color: #9B51E0;
       width: 100%;
       height: 18%;
      }
      img{
        width: 200%;
        height: 100%;
        object-fit: cover;
      }
      .header{
        background-repeat: no-repeat;
        background-size: fit;
        width: 50%;
        height: 30%;
      }
      a{
        text-decoration: none;
        color: black;
      }
      span{
        color: #81C784;
      }
    </style>
     </head>
     <body>
     <div class="controler">
      <div class="container-full">
      <div class="container-small" style="display: flex;">
          <p style="color: aliceblue; font-family: 'Courier New', Courier, monospace; padding: 20px;">Welcome to task management system</p> 
          <span style="padding: 12px; font-size: 30px;text-align: center; margin-left: 10px;">Task management</span></div>
      <div style='font-size: 12px'><strong> <h3>Hi ${user.fullname}<h3/><br> <br>
      <div class = "header">
      <img src='https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg' alt='header'/>
      </div><br> <br>
      <div class="container">
      <h3>Please click  here to reset your password </h3>
      <a href="${link}" class="button"><span>Reset Password</span></a>
      </div>
      </strong><br>Task Management system</div>
      </div>
      </div>
      </body>
      </html>
       `;
      await sendEmailService(sendToEmail, "Reset password", HTMLText);
      res.status(200).json({
        message: "Reset password email has been sent, check your inbox",
      });
    }
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ error: "server error" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const payload = checkToken(token, process.env.JWT_SECRET);
    console.log("payload", payload);

    if (payload) {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        { email: payload.data.email },
        {
          password: hashPassword,
          lastTimePasswordUpdated: new Date(),
          expired: false,
        }
      );
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.status(400).json({ message: "invalid token" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const decodeUser = await findUserByEmail(userEmail);

    if (!decodeUser) return res.status(401).json("user not found");

    const user = await User.findByIdAndUpdate(
      decodeUser._id,
      {
        $set: {
          gender: req.body.gender || decodeUser.gender,
          phoneNumber: req.body.phoneNumber || decodeUser.phoneNumber,
          profilePic: req.file ? req.file.path : decodeUser.profilePic,
        },
      },
      { new: true }
    );
    console.log(user.profilePic);
    // console.log("user:",user)
    return res
      .status(200)
      .json({ user: user, message: "User profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { signup, login, getAllUsers, getSingleUser, updateUser, fillEmail };
