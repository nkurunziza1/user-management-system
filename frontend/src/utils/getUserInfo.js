
import { jwtDecode } from "jwt-decode";

const getUserInfo = async() => {
  const token = localStorage.getItem('token');
  try {
    return await  jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export default getUserInfo;
