import Projects from "../models/ProjectModel.js";
import User from "../models/UserModel.js";

export const createProject = async(req, res) => {
    try{
        const userId=req.user.id;
        const user=await User.findById(userId)
        if(user.role!=="superAdmin"){
          return res.status(401).json({message:"only superAdmin can delete a room"})
        }
     const {name} = req.body;
     const project = await Projects.create({
      name,
     }) 
     return res.status(200).json({message: "Project created successfully", project})
    }catch(error){
     return res.status(500).json({message: "something went wrong!"})
    }
}

export const getAllProject = async(req, res) => {
   try{
    const userId=req.user.id;
    const user=await User.findById(userId)
    if(user.role!=="superAdmin"){
      return res.status(401).json({message:"only superAdmin can delete a room"})
    }
    const projects = await Projects.find()
    return res.status(200).json(projects)
   }catch(error){
    return res.status(500).json({message: "something went wrong!"})
   }
}