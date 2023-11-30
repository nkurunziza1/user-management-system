import Task from "../models/TaskModel.js";
import User from "../models/UserModel.js";

export const createTask = async (req, res) => {
  try {
    const {
      name,
      startDate,
      endDate,
      assignee,
      project,
      spec,
      priority,
      // attachment,
    } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "superAdmin") {
      return res
        .status(401)
        .json({ message: "only superAdmin can create a task" });
    }

    const existingTask = await Task.findOne({ name });
    if (existingTask) {
      return res.status(400).json({ message: "Task with this name already exists" });
    }

    const newTask = new Task({
      name,
      startDate,
      endDate,
      assignee,
      project,
      spec,
      priority,
      // attachment,
    });


    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "superAdmin") {
      return res
        .status(401)
        .json({ message: "only superAdmin can view all tasks" });
    }
    const tasks = await Task.find();

    console.log("task ==>", tasks);
    res.status(201).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "superAdmin") {
      return res
        .status(401)
        .json({ message: "only superAdmin can update a task" });
    }
    const TaskToUpdate = await Task.findById({ _id: id });
    if (!TaskToUpdate) {
      return res.status(404).json({ message: "No task found!" });
    }
    let attachment = TaskToUpdate.perRoomImages;

    if (req.files) {
      attachment = req.files;
    }
    const TaskUpdate = await Task.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name || TaskToUpdate.name,
          startDate: req.body.startDate || TaskToUpdate.startDate,
          endDate: req.body.endDate || TaskToUpdate.endDate,
          assignee: req.body.assignee || TaskToUpdate.assignee,
          project: req.body.project || TaskToUpdate.project,
          description: req.body.description || TaskToUpdate.description,
          priority: req.body.description || TaskToUpdate.priority,
          attachment: req.body.attachment || TaskToUpdate.attachment,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ TaskDetails: TaskUpdate, message: "Task updated successfully!" });
  } catch (error) {
    console.error("Error in updateSingleRoom controller:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSingleTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "superAdmin") {
      return res
        .status(401)
        .json({ message: "only superAdmin can delete a room" });
    }
    const { id } = req.params;
    const singleTask = await Task.findByIdAndDelete({ _id: id });
    if (!singleTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ singleTask, message: "Task deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error or ID not found" });
  }
};
