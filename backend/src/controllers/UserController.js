import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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

  const token = jwt.sign(
    { email: existingUser.email, id: existingUser._id },
    process.env.SECRET_KEY,
    { expiresIn: process.env.EXPIRED }
  );

  res.set("Authorization", `Bearer ${token}`);
  res.status(200).json({ message: "User logged in", token });
};

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
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

const updateUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const userId = req.params.id;
  try {
    const existUser = await User.findById({ _id: userId });
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (fullname) existUser.fullname = fullname;
    if (email) existUser.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existUser.password = hashedPassword;
    }
    await existUser.save();
    res.status(200).json({ message: "Information are updated well" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  signup,
  login,
  getAllUsers,
  getSingleUser,
  updateUser,
  changePassword,
};
