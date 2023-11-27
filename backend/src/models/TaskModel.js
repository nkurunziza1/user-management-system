import mongoose from "mongoose";

const taskShema = mongoose.Schema({
  taskName: {
    type: String,
    unique: true,
  },
});
