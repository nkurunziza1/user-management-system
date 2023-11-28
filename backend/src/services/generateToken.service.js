import Jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const generateToken = (data, options) => {
  const token = Jwt.sign({ data }, process.env.JWT_SECRET, options);
  return token;
};
const verifyToken = (token) => {
  const obj = Jwt.verify(token, process.env.SECRET_KEY);
  console.log("object", obj)
  return obj;
  
};

// const verifyToken = (token) => {
//     try {
//       const obj = Jwt.verify(token, process.env.JWT_SECRET, {
//         expiresIn: "1hr"
//       });
//       return obj;
//     } catch (error) {
//       console.error("Error verifying token:", error.message);
//       return null;
//     }
//   };
  

const checkToken = (token, env) => {
    const payload = Jwt.verify(token, env, (error, decodedToken) => {
      if (error) {
        return error;
      }
      return decodedToken;
    });
  
    return payload;
  }; 
export { generateToken, verifyToken, checkToken };
