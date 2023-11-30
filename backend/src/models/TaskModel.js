import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  spec: {
    type: String,
    default: null
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  assignee: {
    type: Array ,
    required: true,
  },
  project: {
    type: Array,
    required: true,
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  status: {
    type: String,
    default: "ongoing",
  },
  // attachment: {
  //   type: String,
  //   required: true,
  // },
},{ timestamps: true });

export default mongoose.model("Task", taskSchema);
