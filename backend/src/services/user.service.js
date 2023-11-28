import User from "../models/UserModel.js";

export const findUserById = async (id) => {
    const user = await User.findById({ _id: id });
    if (user) {
      return user;
    } else {
      return false;
    }
  };
  export const findUserByEmail = async (email) => {
    const UserInfo = await User.findOne({ email });
    if (UserInfo == null) {
      return false;
    }
    return UserInfo;
  };