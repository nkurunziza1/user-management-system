import mongoose from "mongoose";
import adminSeeder from "../seeder/adminSeeder.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      adminSeeder();
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Errror: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
