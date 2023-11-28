
import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true,
  },
  description: {
    type:String,
    required: true
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true
  },
  status: {
   type: String,
   default: "ongoing"

  },
  attachment: {
    type: String,
    required: true
  }
});

export default mongoose.model('Task', taskSchema);


