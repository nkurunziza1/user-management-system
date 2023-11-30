import bcrypt from "bcryptjs";
import { generateToken } from "../services/generateToken.service.js";
import User from "../models/UserModel.js";

const adminSeeder = async () => {
  try {
    const adminUser = await User.findOne({ fullname: "super admin" });
    if (adminUser) {
      console.log(
        "An admin user is registered; now, you can perform all operations with the account.!"
      );
      return;
    }

    const adminUserData = {
      fullname: "super admin",
      email: "super@task.rw",
      role: "superAdmin",
      isEmailVerified: true,
    };

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PWD, 10);

    adminUserData.password = hashedPassword;

    const createdAdminUser = await User.create(adminUserData);

    const token = generateToken(createdAdminUser);

    console.log("Admin user seeded successfully");
    console.log("Admin user token:", token);
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
export default adminSeeder;
